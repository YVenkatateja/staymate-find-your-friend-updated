import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Users, MapPin, Clock, Star, Award } from "lucide-react";
import Header from "@/components/Header";

const LearnMore = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All users undergo thorough background checks and ID verification for your safety and peace of mind."
    },
    {
      icon: Users,
      title: "Smart Matching",
      description: "Our AI-powered algorithm considers lifestyle, interests, and preferences to find your perfect companion."
    },
    {
      icon: MapPin,
      title: "Global Community",
      description: "Connect with like-minded individuals in over 25 countries and 50+ cities worldwide."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions or concerns."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", icon: Users },
    { number: "50+", label: "Cities", icon: MapPin },
    { number: "25+", label: "Countries", icon: Award },
    { number: "4.8/5", label: "User Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">About StayMate</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building Meaningful Connections for Modern Living
            </h1>
            <p className="text-xl text-muted-foreground">
              StayMate is revolutionizing how people find compatible companions for shared living, travel, and life experiences. 
              Our platform combines advanced matching technology with rigorous safety measures to create authentic connections.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30 rounded-lg mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Thousands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StayMate?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Tell us about yourself, your interests, and what you're looking for in a companion.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Matched</h3>
              <p className="text-muted-foreground">
                Our smart algorithm finds compatible companions based on your preferences and lifestyle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect & Meet</h3>
              <p className="text-muted-foreground">
                Start conversations, meet in safe environments, and build lasting relationships.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect StayMate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already found their ideal companions for living, traveling, and exploring life together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/find-companions")} className="border border-input bg-background text-black hover:bg-gray-100 hover:text-black">
              Browse Companions
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnMore;