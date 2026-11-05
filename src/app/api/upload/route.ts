import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ message: 'Please sign in before uploading a cover.' }, { status: 401 });

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return Response.json({ message: 'Image upload is not configured on the server.' }, { status: 500 });
  }

  try {
    const incoming = await request.formData();
    const image = incoming.get('image');
    if (!(image instanceof File)) {
      return Response.json({ message: 'Choose an image file to upload.' }, { status: 400 });
    }
    if (!image.type.startsWith('image/')) {
      return Response.json({ message: 'Only image files are allowed.' }, { status: 400 });
    }
    if (image.size > 5 * 1024 * 1024) {
      return Response.json({ message: 'Image size must be 5 MB or less.' }, { status: 400 });
    }

    const payload = new FormData();
    payload.append('image', image);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      body: payload,
      cache: 'no-store',
    });
    const result = await response.json();
    if (!response.ok || !result?.success || typeof result?.data?.url !== 'string') {
      return Response.json({ message: 'Image host could not accept this upload.' }, { status: 502 });
    }
    return Response.json({ url: result.data.url });
  } catch {
    return Response.json({ message: 'Image upload failed. Please try again.' }, { status: 500 });
  }
}
