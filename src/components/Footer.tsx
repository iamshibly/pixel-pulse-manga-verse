import { Button } from "@/components/ui/button";
import { Heart, Github, Twitter, MessageCircle, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    anime: [
      { name: "Popular Series", href: "#" },
      { name: "New Releases", href: "#" },
      { name: "Top Rated", href: "#" },
      { name: "Genres", href: "#" },
    ],
    manga: [
      { name: "Latest Chapters", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Web Comics", href: "#" },
      { name: "Light Novels", href: "#" },
    ],
    community: [
      { name: "Forums", href: "#" },
      { name: "Discord Server", href: "#" },
      { name: "Events", href: "#" },
      { name: "Contests", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-background/50 backdrop-blur-md border-t border-primary/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-cyber"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-neon rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-electric rounded-full blur-2xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold gradient-text">AnimeVerse</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your ultimate destination for anime and manga. Discover, watch, read, 
                  and connect with millions of fans worldwide in our vibrant community.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={social.label}
                        variant="outline"
                        size="icon"
                        className="border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                        asChild
                      >
                        <a 
                          href={social.href} 
                          aria-label={social.label}
                          className="flex items-center justify-center"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Link Sections */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-primary">Anime</h4>
              <ul className="space-y-3">
                {footerLinks.anime.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-secondary">Manga</h4>
              <ul className="space-y-3">
                {footerLinks.manga.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-accent">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© 2024 AnimeVerse. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for the anime community</span>
            </div>
            
            {/* Back to Top Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="btn-neon group"
            >
              <ArrowUp className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;