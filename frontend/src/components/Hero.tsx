import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find Your Perfect
          <span className="block text-primary">StayMate</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Connect with compatible companions for shared living, travel, and unforgettable experiences
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate("/find-companions")}
          >
            Start Finding Companions
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-foreground"
            onClick={() => navigate("/learn-more")}
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-300 mb-4">Trusted by 10,000+ users worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <div className="text-2xl font-bold">10K+</div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-2xl font-bold">50+</div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-2xl font-bold">25+</div>
          </div>
          <div className="flex justify-center space-x-8 text-xs text-gray-400 mt-2">
            <span>Active Users</span>
            <span>Cities</span>
            <span>Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;