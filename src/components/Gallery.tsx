import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Download, Eye } from "lucide-react";
import characterSilhouettes from "@/assets/character-silhouettes.jpg";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "characters", label: "Characters" },
    { id: "landscapes", label: "Landscapes" },
    { id: "action", label: "Action Scenes" },
    { id: "cute", label: "Cute" },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Cyberpunk Samurai",
      category: "characters",
      likes: 1240,
      views: 5600,
      artist: "NeonArtist",
    },
    {
      id: 2,
      title: "Floating City",
      category: "landscapes",
      likes: 890,
      views: 3200,
      artist: "SkyPainter",
    },
    {
      id: 3,
      title: "Epic Battle",
      category: "action",
      likes: 2100,
      views: 8900,
      artist: "ActionMaster",
    },
    {
      id: 4,
      title: "Chibi Friends",
      category: "cute",
      likes: 1560,
      views: 4300,
      artist: "CuteCreator",
    },
    {
      id: 5,
      title: "Mecha Pilot",
      category: "characters",
      likes: 1890,
      views: 6700,
      artist: "MechaFan",
    },
    {
      id: 6,
      title: "Neon Streets",
      category: "landscapes",
      likes: 780,
      views: 2800,
      artist: "CityLights",
    },
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-neon rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-electric rounded-full blur-2xl opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-glow">Art</span> <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore stunning artwork from talented artists in the anime community
          </p>
        </div>

        {/* Featured Artwork */}
        <div className="mb-12">
          <Card className="card-neon overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative group">
                  <img 
                    src={characterSilhouettes} 
                    alt="Featured Artwork" 
                    className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1 text-sm bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                        <Eye className="h-4 w-4" />
                        <span>2.1K</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold gradient-text">Featured Artwork</h3>
                      <p className="text-secondary">by ElectricDreamer</p>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      "Neon Silhouettes" - A stunning collection of anime character silhouettes 
                      illuminated by electric blue and pink neon lights, representing the 
                      cyberpunk aesthetic of modern anime culture.
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-red-500 fill-current" />
                        <span>3.2K likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-primary" />
                        <span>12.5K views</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="btn-neon">
                        <Heart className="mr-2 h-4 w-4" />
                        Like
                      </Button>
                      <Button variant="outline" className="btn-secondary-neon">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={
                activeFilter === filter.id 
                  ? "btn-neon" 
                  : "border-primary/30 hover:border-primary/60"
              }
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="card-neon group cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-cyber rounded-t-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-primary font-medium">{item.title}</p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">by {item.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="btn-neon">
            Load More Artwork
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;