import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const HousingSolutions = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "house-for-sale",
      title: "Houses for Sale",
      description: "Find Your Dream Home",
      subtitle: "Browse available properties for purchase",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      id: "vacation-rentals",
      title: "Vacation Rentals & Getaways",
      description: "Perfect Holiday Stays",
      subtitle: "Discover amazing vacation rentals with local experiences",
      icon: MapPin,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-center mb-4">
            Housing & Travel Solutions
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Choose the type of accommodation solution you're looking for
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedCategory === category.id
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="mt-8 text-center space-y-4">
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg"
                onClick={() => {
                  if (selectedCategory === "house-for-sale") {
                    navigate("/house-sale/register");
                  } else if (selectedCategory === "vacation-rentals") {
                    navigate("/vacation-rental/register");
                  }
                }}
              >
                Register {categories.find(c => c.id === selectedCategory)?.title}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-3 text-lg"
                onClick={() => {
                  if (selectedCategory === "house-for-sale") {
                    navigate("/house-sales");
                  } else if (selectedCategory === "vacation-rentals") {
                    navigate("/vacation-rentals");
                  }
                }}
              >
                View All {categories.find(c => c.id === selectedCategory)?.title}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HousingSolutions;