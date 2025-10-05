import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import compatibilityIcon from "@/assets/compatibility-icon.png";
import housingIcon from "@/assets/housing-icon.png";
import safetyIcon from "@/assets/safety-icon.png";

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: compatibilityIcon,
      title: "Smart Compatibility Matching",
      description: "Our advanced algorithm matches you with companions based on lifestyle, interests, and preferences for perfect harmony.",
      onClick: () => navigate("/find-companions")
    },
    {
      icon: housingIcon,
      title: "Housing & Travel Solutions",
      description: "Find roommates for apartments, travel buddies for adventures, or companions for temporary stays in new cities.",
      onClick: () => navigate("/housing-solutions")
    },
    {
      icon: safetyIcon,
      title: "Verified & Safe Community",
      description: "All members go through verification processes including ID checks and background screening for your safety.",
      onClick: null
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose StayMate?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make finding your perfect companion easier, safer, and more enjoyable than ever.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`text-center p-8 hover:shadow-lg transition-shadow ${
                feature.onClick ? 'cursor-pointer hover:scale-105' : ''
              }`}
              onClick={feature.onClick || undefined}
            >
              <CardContent className="pt-6">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;