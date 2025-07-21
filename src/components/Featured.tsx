import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play, BookOpen, TrendingUp, ExternalLink, Calendar, Clock } from "lucide-react";
import { AnimeCard, MangaCard } from "@/types/anime";
import { jikanService } from "@/services/jikanApi";
import { toast } from "sonner";
import mangaCollection from "@/assets/manga-collection.jpg";

const Featured = () => {
  const [featuredAnime, setFeaturedAnime] = useState<AnimeCard[]>([]);
  const [featuredManga, setFeaturedManga] = useState<MangaCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      setLoading(true);
      
      // Load top anime and manga
      const [animeResult, mangaResult] = await Promise.all([
        jikanService.getTopAnime(1),
        jikanService.getTopManga(1)
      ]);
      
      setFeaturedAnime(animeResult.data.slice(0, 6));
      setFeaturedManga(mangaResult.data.slice(0, 6));
    } catch (error) {
      toast.error("Failed to load featured content");
      console.error("Error loading featured content:", error);
    } finally {
      setLoading(false);
    }
  };

  const openTrailer = (trailer: string) => {
    window.open(trailer, '_blank');
  };

  if (loading) {
    return (
      <section id="featured" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured</span> <span className="text-glow">Content</span>
            </h2>
            <p className="text-xl text-muted-foreground">Loading latest content...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="card-neon animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-16 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            Discover the hottest anime and manga from MyAnimeList's top-rated series
          </p>
        </div>

        {/* Featured Anime Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-glow flex items-center">
              <Play className="mr-3 h-8 w-8 text-primary" />
              Top Rated Anime
            </h3>
            <Button variant="outline" className="btn-neon">
              <TrendingUp className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAnime.map((anime) => (
              <Card key={anime.id} className="card-neon group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    {/* Action Buttons */}
                    {anime.trailer && (
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          size="sm" 
                          className="btn-neon w-full"
                          onClick={() => openTrailer(anime.trailer!)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Trailer
                        </Button>
                      </div>
                    )}

                    {/* Score Badge */}
                    {anime.score && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold">{anime.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {anime.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          {anime.year && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{anime.year}</span>
                            </div>
                          )}
                          {anime.episodes && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{anime.episodes} episodes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {anime.genres.slice(0, 3).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    {/* Synopsis */}
                    {anime.synopsis && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {anime.synopsis}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Badge variant={anime.status === "Currently Airing" ? "default" : "outline"}>
                        {anime.status}
                      </Badge>
                      <Button size="sm" className="btn-neon opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Details
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
              Top Rated Manga
            </h3>
            <Button variant="outline" className="btn-secondary-neon">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Library
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredManga.map((manga) => (
              <Card key={manga.id} className="card-neon group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={manga.image}
                      alt={manga.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    {/* Score Badge */}
                    {manga.score && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold">{manga.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                          {manga.title}
                        </h4>
                        {manga.authors.length > 0 && (
                          <p className="text-sm text-secondary mt-1">
                            by {manga.authors[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {manga.genres.slice(0, 3).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>

                    {/* Synopsis */}
                    {manga.synopsis && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {manga.synopsis}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        {manga.chapters && <span>{manga.chapters} chapters</span>}
                        {manga.volumes && <span>{manga.volumes} volumes</span>}
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
                    Real-Time Anime Database
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Access live data from MyAnimeList with thousands of anime and manga series, 
                    updated in real-time with ratings, reviews, and episode information.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button size="lg" className="btn-neon">
                      Explore Database
                    </Button>
                    <Button size="lg" variant="outline" className="btn-secondary-neon">
                      Browse Manga
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