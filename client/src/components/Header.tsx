import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, Zap } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 hover-elevate p-2 rounded-md" data-testid="link-home">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="text-xl font-futuristic font-bold text-primary">
                NeuroCoder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#capabilities">
              <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-capabilities">
                AI Capabilities
              </a>
            </Link>
            <Link href="#about">
              <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-about">
                About Developer
              </a>
            </Link>
            <Link href="#contact">
              <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact">
                Contact
              </a>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25" data-testid="button-start-coding">
              <Zap className="h-4 w-4 mr-2" />
              Start Coding
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-primary/20">
            <nav className="flex flex-col gap-4">
              <Link href="#capabilities">
                <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-mobile-capabilities">
                  AI Capabilities
                </a>
              </Link>
              <Link href="#about">
                <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-mobile-about">
                  About Developer
                </a>
              </Link>
              <Link href="#contact">
                <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-mobile-contact">
                  Contact
                </a>
              </Link>
              <Button className="bg-gradient-to-r from-primary to-accent w-full" data-testid="button-mobile-start-coding">
                <Zap className="h-4 w-4 mr-2" />
                Start Coding
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}