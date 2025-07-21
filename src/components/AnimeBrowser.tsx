import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Play, Search, Calendar, Users, Clock, ExternalLink } from "lucide-react";
import { AnimeCard } from "@/types/anime";
import { jikanService } from "@/services/jikanApi";
import { toast } from "sonner";

const AnimeBrowser = () => {
  const [animeList, setAnimeList] = useState<AnimeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activeTab, setActiveTab] = useState<"top" | "seasonal" | "search">("top");

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", 
    "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Thriller"
  ];

  useEffect(() => {
    loadAnime();
  }, [activeTab, currentPage]);

  const loadAnime = async () => {
    setLoading(true);
    try {
      let result;
      
      switch (activeTab) {
        case "top":
          result = await jikanService.getTopAnime(currentPage);
          break;
        case "seasonal":
          const seasonal = await jikanService.getSeasonalAnime();
          result = { data: seasonal, hasNextPage: false };
          break;
        case "search":
          if (searchQuery) {
            result = await jikanService.searchAnime(searchQuery, currentPage, selectedGenre);
          } else {
            result = { data: [], hasNextPage: false };
          }
          break;
        default:
          result = await jikanService.getTopAnime(currentPage);
      }
      
      if (currentPage === 1) {
        setAnimeList(result.data);
      } else {
        setAnimeList(prev => [...prev, ...result.data]);
      }
      
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      toast.error("Failed to load anime data");
      console.error("Error loading anime:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setActiveTab("search");
    setCurrentPage(1);
    setAnimeList([]);
    await loadAnime();
  };

  const handleTabChange = (tab: "top" | "seasonal" | "search") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setAnimeList([]);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const openTrailer = (trailer: string) => {
    window.open(trailer, '_blank');
  };

  return (
    <section id="anime" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-cyber rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-neon rounded-full blur-2xl opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Anime</span> <span className="text-glow">Database</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore thousands of anime with real-time data from MyAnimeList
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={activeTab === "top" ? "default" : "outline"}
              className={activeTab === "top" ? "btn-neon" : "border-primary/30"}
              onClick={() => handleTabChange("top")}
            >
              Top Rated
            </Button>
            <Button
              variant={activeTab === "seasonal" ? "default" : "outline"}
              className={activeTab === "seasonal" ? "btn-neon" : "border-primary/30"}
              onClick={() => handleTabChange("seasonal")}
            >
              This Season
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              className={activeTab === "search" ? "btn-neon" : "border-primary/30"}
              onClick={() => handleTabChange("search")}
            >
              Search
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search anime titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
              <Button onClick={handleSearch} className="btn-neon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && currentPage === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="card-neon animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-muted rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Anime Grid */}
        {!loading || currentPage > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animeList.map((anime) => (
              <Card key={anime.id} className="card-neon group cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {anime.trailer && (
                        <Button 
                          size="sm" 
                          className="btn-neon w-full"
                          onClick={() => openTrailer(anime.trailer!)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Trailer
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="btn-secondary-neon w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>

                    {/* Score Badge */}
                    {anime.score && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold">{anime.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {anime.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        {anime.year && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{anime.year}</span>
                          </div>
                        )}
                        {anime.episodes && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{anime.episodes} eps</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {anime.genres.slice(0, 3).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {anime.genres.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{anime.genres.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Synopsis */}
                    {anime.synopsis && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {anime.synopsis}
                      </p>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant={anime.status === "Currently Airing" ? "default" : "outline"}>
                        {anime.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {/* Load More Button */}
        {hasNextPage && !loading && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="btn-neon" onClick={loadMore}>
              Load More Anime
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && animeList.length === 0 && activeTab === "search" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No anime found for your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimeBrowser;