import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Eye, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const WantsToBeRoommate = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      id: "register",
      title: "Register as Someone Who Wants to be a Roommate",
      description: "Create Your Profile",
      subtitle: "Show you're ready to move into someone's place",
      icon: UserPlus,
      color: "from-green-400 to-green-500",
      features: ["Create detailed profile", "Showcase personality", "Set move-in preferences", "Upload photos", "Verify identity"]
    },
    {
      id: "view",
      title: "View People Who Want Roommates",
      description: "Browse Potential Roommates",
      subtitle: "Find someone who wants to share your space",
      icon: Eye,
      color: "from-emerald-400 to-emerald-500",
      features: ["Browse profiles", "Filter by lifestyle", "Check compatibility", "View references", "Message directly"]
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
              Wants To Be Roommate
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Join a Shared 
              <span className="block text-primary">Living Space</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Whether you're looking to register as someone who wants to be a roommate or browse people who want roommates, 
              find your perfect shared living situation with flexible terms and compatible housemates.
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
                Excellent choice! You've selected{" "}
                <span className="text-primary">
                  {options.find(opt => opt.id === selectedOption)?.title}
                </span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's get you started with the {selectedOption === "register" ? "registration" : "browsing"} process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg"
                  onClick={() => navigate(selectedOption === "register" ? "/wants-to-be-roommate/register" : "/wants-to-be-roommate/browse")}
                >
                  {selectedOption === "register" ? "Start Registration" : "Browse Profiles"}
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
              <div className="text-3xl font-bold text-primary mb-2">3,800+</div>
              <p className="text-muted-foreground">Want to be Roommates</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">92%</div>
              <p className="text-muted-foreground">Move-in Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Flexible</div>
              <p className="text-muted-foreground">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WantsToBeRoommate;