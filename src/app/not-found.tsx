import Link from 'next/link';import {BookOpen} from 'lucide-react';
export default function NotFound(){return <section className="not-found"><BookOpen size={48}/><p className="eyebrow">PAGE NOT FOUND</p><h1>Looks like this page wandered off<span>.</span></h1><p>The page you are looking for isn't on our shelves.</p><Link href="/" className="btn">Back to Home</Link></section>}
