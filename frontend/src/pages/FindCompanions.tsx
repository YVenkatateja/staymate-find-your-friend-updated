import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Users, Coffee, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const FindCompanions = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "need-roommate",
      title: "Need Roommate",
      description: "For Sharing Space",
      subtitle: "Looking for someone to share your place",
      icon: Home,
      color: "from-orange-400 to-orange-500",
      features: ["Share rent & utilities", "Choose your roommate", "Keep your lease"]
    },
    {
      id: "be-roommate",
      title: "Wants To Be Roommate", 
      description: "Join a Shared Space",
      subtitle: "Ready to move into someone's place",
      icon: Users,
      color: "from-green-400 to-green-500",
      features: ["Move in quickly", "No lease required", "Flexible terms"]
    },
    {
      id: "rentals",
      title: "Rentals",
      description: "Find Your Next Home",
      subtitle: "Discover available rental properties",
      icon: Coffee,
      color: "from-purple-400 to-purple-500",
      features: ["Browse listings", "Direct landlord contact", "Virtual tours"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              Smart Compatibility Matching
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Choose Your Perfect 
              <span className="block text-primary">Companion Type</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Select the type of companion you're looking for and we'll help you find the perfect match 
              based on your lifestyle, preferences, and compatibility.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 group relative overflow-hidden ${
                  selectedCategory === category.id
                    ? "border-primary shadow-2xl scale-105"
                    : "border-border hover:border-primary/50 hover:scale-105"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  // Navigate to dedicated page
                  if (category.id === "need-roommate") {
                    navigate("/need-roommate");
                  } else if (category.id === "be-roommate") {
                    navigate("/wants-to-be-roommate");
                  } else if (category.id === "rentals") {
                    navigate("/rentals");
                  }
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <CardHeader className="text-center relative z-10 pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {category.description}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {category.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-3 mb-6">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {selectedCategory === category.id ? "Selected" : "Select"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="w-full text-primary hover:bg-primary/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.id === "need-roommate") {
                          navigate("/view-need-roommate");
                        } else if (category.id === "be-roommate") {
                          navigate("/view-wants-roommate");
                        } else if (category.id === "rentals") {
                          navigate("/view-rentals");
                        }
                      }}
                    >
                      View All Profiles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Verified Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindCompanions;