import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Search, Calendar, Users, Book, ExternalLink } from "lucide-react";
import { MangaCard } from "@/types/anime";
import { jikanService } from "@/services/jikanApi";
import { toast } from "sonner";

const MangaBrowser = () => {
  const [mangaList, setMangaList] = useState<MangaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activeTab, setActiveTab] = useState<"top" | "search">("top");

  useEffect(() => {
    loadManga();
  }, [activeTab, currentPage]);

  const loadManga = async () => {
    setLoading(true);
    try {
      let result;
      
      switch (activeTab) {
        case "top":
          result = await jikanService.getTopManga(currentPage);
          break;
        case "search":
          if (searchQuery) {
            result = await jikanService.searchManga(searchQuery, currentPage);
          } else {
            result = { data: [], hasNextPage: false };
          }
          break;
        default:
          result = await jikanService.getTopManga(currentPage);
      }
      
      if (currentPage === 1) {
        setMangaList(result.data);
      } else {
        setMangaList(prev => [...prev, ...result.data]);
      }
      
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      toast.error("Failed to load manga data");
      console.error("Error loading manga:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setActiveTab("search");
    setCurrentPage(1);
    setMangaList([]);
    await loadManga();
  };

  const handleTabChange = (tab: "top" | "search") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setMangaList([]);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <section id="manga" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-neon rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-electric rounded-full blur-2xl opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-glow-pink">Manga</span> <span className="gradient-text">Library</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing manga series from the world's largest database
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={activeTab === "top" ? "default" : "outline"}
              className={activeTab === "top" ? "btn-secondary-neon" : "border-secondary/30"}
              onClick={() => handleTabChange("top")}
            >
              Top Rated
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              className={activeTab === "search" ? "btn-secondary-neon" : "border-secondary/30"}
              onClick={() => handleTabChange("search")}
            >
              Search
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search manga titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-background/50 border-secondary/30 focus:border-secondary"
              />
              <Button onClick={handleSearch} className="btn-secondary-neon">
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

        {/* Manga Grid */}
        {!loading || currentPage > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mangaList.map((manga) => (
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
                    
                    {/* Action Buttons */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="btn-secondary-neon w-full">
                        <Book className="mr-2 h-4 w-4" />
                        Read Now
                      </Button>
                      <Button size="sm" variant="outline" className="btn-neon w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>

                    {/* Score Badge */}
                    {manga.score && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold">{manga.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                        {manga.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        {manga.chapters && (
                          <div className="flex items-center space-x-1">
                            <Book className="h-3 w-3" />
                            <span>{manga.chapters} ch</span>
                          </div>
                        )}
                        {manga.volumes && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{manga.volumes} vol</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Authors */}
                    {manga.authors.length > 0 && (
                      <div>
                        <p className="text-sm text-secondary font-medium">
                          by {manga.authors.slice(0, 2).join(", ")}
                          {manga.authors.length > 2 && ` +${manga.authors.length - 2}`}
                        </p>
                      </div>
                    )}

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1">
                      {manga.genres.slice(0, 3).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {manga.genres.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{manga.genres.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Synopsis */}
                    {manga.synopsis && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {manga.synopsis}
                      </p>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant={manga.status === "Publishing" ? "default" : "outline"}>
                        {manga.status}
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
            <Button size="lg" variant="outline" className="btn-secondary-neon" onClick={loadMore}>
              Load More Manga
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && mangaList.length === 0 && activeTab === "search" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No manga found for your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MangaBrowser;