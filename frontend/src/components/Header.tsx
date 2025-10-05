import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">StayMate</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-foreground hover:text-primary transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => navigate("/about")} 
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => navigate("/faq")} 
            className="text-foreground hover:text-primary transition-colors"
          >
            FAQ
          </button>
          <button 
            onClick={() => navigate("/contact")} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
          <button 
            onClick={() => navigate("/nearby-places")} 
            className="text-foreground hover:text-primary transition-colors"
          >
            Explore Nearby
          </button>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/settings")} className="hidden lg:flex">
            Settings
          </Button>
          <Button variant="outline" onClick={() => navigate("/login")}>Log In</Button>
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;