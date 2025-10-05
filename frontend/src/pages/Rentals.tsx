import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Eye, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Rentals = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      id: "register",
      title: "Register Your Rental Property",
      description: "List Your Property",
      subtitle: "Post your rental property to attract quality tenants",
      icon: UserPlus,
      color: "from-purple-400 to-purple-500",
      features: ["Create property listing", "Upload photos & videos", "Set rental terms", "Screen potential tenants", "Manage applications"]
    },
    {
      id: "view",
      title: "View Available Rental Properties",
      description: "Find Your Next Home",
      subtitle: "Browse available rental properties in your area",
      icon: Eye,
      color: "from-violet-400 to-violet-500",
      features: ["Browse listings", "Virtual tours", "Filter by preferences", "Direct landlord contact", "Schedule viewings"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/find-companions")}
            className="mb-8 hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Find Companions
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              Rentals
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Find Your Next 
              <span className="block text-primary">Dream Home</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Whether you're looking to register your rental property or browse available homes for rent, 
              discover the perfect rental solution with direct landlord contact and transparent pricing.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl border-2 group relative overflow-hidden ${
                  selectedOption === option.id
                    ? "border-primary shadow-2xl scale-105"
                    : "border-border hover:border-primary/50 hover:scale-105"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <CardHeader className="text-center relative z-10 pb-4">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{option.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {option.description}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {option.subtitle}
                  </p>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-3 mb-6">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={selectedOption === option.id ? "default" : "outline"}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {selectedOption === option.id ? "Selected" : "Select"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedOption && (
          <div className="text-center animate-fade-in">
            <div className="bg-card border rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Great choice! You've selected{" "}
                <span className="text-primary">
                  {options.find(opt => opt.id === selectedOption)?.title}
                </span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's get you started with the {selectedOption === "register" ? "listing" : "browsing"} process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg"
                  onClick={() => navigate(selectedOption === "register" ? "/rentals/register" : "/rentals/browse")}
                >
                  {selectedOption === "register" ? "List Property" : "Browse Rentals"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => setSelectedOption(null)}>
                  Change Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Available Properties</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">97%</div>
              <p className="text-muted-foreground">Landlord Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Verified</div>
              <p className="text-muted-foreground">Property Listings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rentals;