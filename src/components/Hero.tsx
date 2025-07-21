import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";
import heroImage from "@/assets/hero-anime.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cyberpunk Anime Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating">
        <div className="w-4 h-4 bg-primary rounded-full pulse-neon"></div>
      </div>
      <div className="absolute top-32 right-20 floating" style={{ animationDelay: '2s' }}>
        <div className="w-6 h-6 bg-secondary rounded-full pulse-neon"></div>
      </div>
      <div className="absolute bottom-40 left-20 floating" style={{ animationDelay: '4s' }}>
        <div className="w-3 h-3 bg-accent rounded-full pulse-neon"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Discover</span>
                <br />
                <span className="text-glow">Anime</span>
                <br />
                <span className="text-glow-pink">Universe</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Dive into the ultimate anime and manga experience. Explore thousands of series, 
                connect with fellow otaku, and discover your next obsession.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-neon text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Start Watching
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary-neon text-lg px-8 py-6">
                <Star className="mr-2 h-5 w-5" />
                Top Rated
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div>Anime Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">25K+</div>
                <div>Manga Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100K+</div>
                <div>Active Users</div>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Glow effect behind the image area */}
              <div className="absolute inset-0 bg-gradient-cyber rounded-full blur-3xl opacity-20 scale-150"></div>
              <div className="relative z-10 space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-glow mb-4">Featured Today</h3>
                  <div className="card-neon p-6 rounded-xl backdrop-blur-md">
                    <div className="space-y-2">
                      <div className="text-sm text-primary">Now Trending</div>
                      <div className="text-lg font-semibold">Attack on Titan: Final Season</div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>9.8/10</span>
                        <span>•</span>
                        <span>Action, Drama</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;