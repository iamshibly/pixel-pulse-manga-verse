import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed to newsletter!");
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-cyber rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="card-neon overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-cyber rounded-full flex items-center justify-center pulse-neon">
                  <Mail className="h-10 w-10 text-background" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="gradient-text">Stay Updated</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get the latest anime releases, manga updates, and exclusive content 
                  delivered straight to your inbox every week.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-primary">Weekly Releases</h4>
                  <p className="text-sm text-muted-foreground">Latest anime episodes and manga chapters</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-secondary">Exclusive Content</h4>
                  <p className="text-sm text-muted-foreground">Behind-the-scenes and artist interviews</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-accent">Community News</h4>
                  <p className="text-sm text-muted-foreground">Events, contests, and community highlights</p>
                </div>
              </div>

              {/* Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                    <Button type="submit" className="btn-neon whitespace-nowrap">
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-lg font-semibold">Successfully Subscribed!</span>
                  </div>
                  <p className="text-muted-foreground">
                    Welcome to the AnimeVerse community! Check your email for confirmation.
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="pt-8 border-t border-primary/20">
                <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div>Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">500+</div>
                    <div>Weekly Updates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">99%</div>
                    <div>Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;