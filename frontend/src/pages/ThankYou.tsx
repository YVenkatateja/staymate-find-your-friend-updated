import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Home, Users, Building } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "general";

  const getTypeInfo = () => {
    switch (type) {
      case "need-roommate":
        return {
          icon: <Home className="h-16 w-16 text-primary" />,
          title: "Property Listed Successfully!",
          message: "Your property is now live and potential roommates can view it.",
          nextStep: "You'll receive notifications when someone shows interest in your property."
        };
      case "wants-roommate":
        return {
          icon: <Users className="h-16 w-16 text-primary" />,
          title: "Profile Created Successfully!",
          message: "You're all set to find your perfect roommate match.",
          nextStep: "Browse available properties or wait for property owners to contact you."
        };
      case "rentals":
        return {
          icon: <Building className="h-16 w-16 text-primary" />,
          title: "Rental Property Added!",
          message: "Your rental property is now available for potential tenants.",
          nextStep: "Interested tenants will be able to view and contact you about your property."
        };
      default:
        return {
          icon: <Check className="h-16 w-16 text-primary" />,
          title: "Registration Complete!",
          message: "Thank you for joining our platform.",
          nextStep: "You can now explore all available features."
        };
    }
  };

  const typeInfo = getTypeInfo();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-12 text-center space-y-8">
          {/* Success Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 rounded-full p-8 animate-scale-in">
                {typeInfo.icon}
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
              {typeInfo.title}
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {typeInfo.message}
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-lg font-semibold mb-2 text-primary">What's Next?</h3>
            <p className="text-muted-foreground">{typeInfo.nextStep}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              Go to Homepage
            </Button>
            <Button
              onClick={() => {
                if (type === "need-roommate" || type === "rentals") {
                  navigate("/find-companions");
                } else {
                  navigate("/housing-solutions");
                }
              }}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              {type === "wants-roommate" ? "Browse Properties" : "View Listings"}
            </Button>
          </div>

          {/* Auto Redirect Notice */}
          <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.8s" }}>
            You'll be automatically redirected to the homepage in 10 seconds
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;