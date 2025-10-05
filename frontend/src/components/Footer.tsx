import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">StayMate</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Find your perfect companion for shared living, travel, and life experiences. 
              Building connections that matter.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" onClick={() => navigate("/signup")}>Get Started Today</Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => navigate("/about")} className="hover:text-primary transition-colors">About Us</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => navigate("/faq")} className="hover:text-primary transition-colors">FAQ</button></li>
              <li><button onClick={() => navigate("/safety")} className="hover:text-primary transition-colors">Safety</button></li>
              <li><button onClick={() => navigate("/contact")} className="hover:text-primary transition-colors">Contact Us</button></li>
              <li><button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigate("/terms")} className="hover:text-primary transition-colors">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 StayMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;