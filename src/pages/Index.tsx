import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import AnimeBrowser from "@/components/AnimeBrowser";
import MangaBrowser from "@/components/MangaBrowser";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import QuizSystem from "@/components/QuizSystem";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Featured />
      <AnimeBrowser />
      <MangaBrowser />
      <section id="quiz" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Anime Quiz Arena
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your anime knowledge with AI-generated quizzes. Compete with others and climb the leaderboard!
            </p>
          </div>
          <QuizSystem />
        </div>
      </section>
      <Gallery />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
