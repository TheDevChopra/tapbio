import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-16">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl mb-6 text-balance">
            Turn clicks into <span className="text-accent">actions.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl text-balance">
            Your link in bio, built for conversions. Stop losing followers to clunky menus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full font-semibold">
                Create Your TapBio
              </Button>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full font-semibold">
                View Live Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-16 tracking-tight">Everything you need to monetize</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">WhatsApp</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect instantly with your audience. Route leads directly to your WhatsApp inbox.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accept payments, sell digital products, or collect tips with zero friction.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-foreground/5 text-foreground rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Booking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Let clients book calls and appointments directly from your profile.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
