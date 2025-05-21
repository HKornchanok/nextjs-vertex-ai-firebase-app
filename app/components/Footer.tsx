import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-4">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <p>
          Built by{' '}
          <Link
            href="https://www.kornchanok.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Kornchanok Iednusorn
          </Link>
          {' • '}
          <Link
            href="https://github.com/HKornchanok/nextjs-vertex-ai-firebase-app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            View source code on GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
} 