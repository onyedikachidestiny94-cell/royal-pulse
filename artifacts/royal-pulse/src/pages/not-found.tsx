import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-black mb-4">404</h1>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-primary mb-6">Page Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-primary transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </Layout>
  );
}