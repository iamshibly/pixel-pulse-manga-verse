import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, BookOpen, TrendingUp } from "lucide-react";
import mangaCollection from "@/assets/manga-collection.jpg";

const Featured = () => {
  const featuredAnime = [
    {
      title: "Demon Slayer",
      genre: "Action, Supernatural",
      rating: 9.2,
      episodes: 44,
      status: "Ongoing",
      description: "A young boy becomes a demon slayer to save his sister.",
    },
    {
      title: "Jujutsu Kaisen",
      genre: "Action, School",
      rating: 9.0,
      episodes: 24,
      status: "Season 2",
      description: "Students fight cursed spirits in modern Japan.",
    },
    {
      title: "One Piece",
      genre: "Adventure, Comedy",
      rating: 9.5,
      episodes: 1000,
      status: "Ongoing",
      description: "Pirates search for the legendary treasure One Piece.",
    },
  ];

  const featuredManga = [
    {
      title: "Chainsaw Man",
      genre: "Action, Horror",
      rating: 9.1,
      chapters: 97,
      status: "Part 2",
      description: "A devil hunter with chainsaw powers fights demons.",
    },
    {
      title: "Spy x Family",
      genre: "Comedy, Family",
      rating: 8.9,
      chapters: 75,
      status: "Ongoing",
      description: "A spy creates a fake family for his mission.",
    },
    {
      title: "My Hero Academia",
      genre: "Superhero, School",
      rating: 8.7,
      chapters: 380,
      status: "Ongoing",
      description: "A boy without powers dreams of becoming a hero.",
    },
  ];

  return (
    <section id="featured" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-cyber rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-neon rounded-full blur-2xl opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured</span> <span className="text-glow">Content</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the hottest anime and manga that everyone's talking about
          </p>
        </div>

        {/* Featured Anime Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-glow flex items-center">
              <Play className="mr-3 h-8 w-8 text-primary" />
              Trending Anime
            </h3>
            <Button variant="outline" className="btn-neon">
              <TrendingUp className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAnime.map((anime, index) => (
              <Card key={index} className="card-neon group cursor-pointer overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {anime.title}
                        </h4>
                        <p className="text-sm text-secondary">{anime.genre}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{anime.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {anime.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-primary">{anime.episodes} episodes</span>
                        <span className="text-secondary">{anime.status}</span>
                      </div>
                      <Button size="sm" className="btn-neon opacity-0 group-hover:opacity-100 transition-opacity">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Manga Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-glow-pink flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-secondary" />
              Popular Manga
            </h3>
            <Button variant="outline" className="btn-secondary-neon">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Library
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredManga.map((manga, index) => (
              <Card key={index} className="card-neon group cursor-pointer overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
                          {manga.title}
                        </h4>
                        <p className="text-sm text-primary">{manga.genre}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{manga.rating}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {manga.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-secondary">{manga.chapters} chapters</span>
                        <span className="text-primary">{manga.status}</span>
                      </div>
                      <Button size="sm" className="btn-secondary-neon opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-cyber rounded-3xl blur-3xl opacity-20"></div>
          <Card className="card-neon relative overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold gradient-text">
                    Join the Ultimate Anime Community
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Get access to exclusive content, early releases, and connect with millions of anime fans worldwide.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button size="lg" className="btn-neon">
                      Start Free Trial
                    </Button>
                    <Button size="lg" variant="outline" className="btn-secondary-neon">
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={mangaCollection} 
                    alt="Manga Collection" 
                    className="rounded-xl shadow-glow max-w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Featured;