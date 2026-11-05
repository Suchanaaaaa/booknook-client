
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { BookOpen, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Home',
      '/books': 'All Books',
      '/add-book': 'Add Book',
      '/my-books': 'My Books',
      '/my-borrows': 'My Borrows',
      '/login': 'Login',
      '/register': 'Register',
      '/profile': 'My Profile'
    };

    document.title = `BookNook | ${
      titles[path] ||
      (path.startsWith('/books/') ? 'Book Details' : 'Not Found')
    }`;
  }, [path]);

  const links = [
    ['Home', '/'],
    ['All Books', '/books']
  ];

  const privateLinks = [
    ['Add Book', '/add-book'],
    ['My Books', '/my-books'],
    ['My Borrows', '/my-borrows']
  ];

  async function logout() {
    await authClient.signOut();
    setMenu(false);
    router.push('/');
    router.refresh();
  }

  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <BookOpen size={21} />
          </span>
          <span>
            BookNook
            <small>YOUR LITTLE READING CORNER</small>
          </span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${open ? 'show' : ''}`}>
          {links.map(([label, url]) => (
            <Link
              key={url}
              className={path === url ? 'active' : ''}
              href={url}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          {session &&
            privateLinks.map(([label, url]) => (
              <Link
                key={url}
                className={path === url ? 'active' : ''}
                href={url}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
        </div>

        <div className={`nav-actions ${open ? 'show' : ''}`}>
          <button
            className="icon-btn"
            disabled={!mounted}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            aria-label="Toggle theme"
          >
            {mounted &&
              (resolvedTheme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              ))}
          </button>

          {!isPending && !session && (
            <>
              <Link className="login-link" href="/login">
                Login
              </Link>
              <Link className="btn btn-small" href="/register">
                Join the Library
              </Link>
            </>
          )}

          {session && (
            <div className="profile-wrap">
              <button
                className="avatar-btn"
                onClick={() => setMenu(!menu)}
              >
                <img
                  src={
                    session.user.image ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'
                  }
                  alt="Profile"
                />
                <span>{session.user.name}</span>
              </button>

              {menu && (
                <div className="profile-menu">
                  <strong>{session.user.name}</strong>
                  <Link href="/profile">My Profile</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
