import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Tell us about yourself, your lifestyle, interests, and what you're looking for in a companion."
    },
    {
      step: "02", 
      title: "Get Matched",
      description: "Our smart algorithm finds compatible companions based on your preferences and compatibility factors."
    },
    {
      step: "03",
      title: "Connect & Chat",
      description: "Browse profiles, send messages, and video chat with potential companions to find the perfect match."
    },
    {
      step: "04",
      title: "Meet & Stay Together",
      description: "Arrange to meet in person and start your journey together as compatible companions."
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with StayMate is simple. Follow these easy steps to find your perfect companion.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 transform -translate-y-1/2"></div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;