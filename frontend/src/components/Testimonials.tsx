import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      text: "StayMate helped me find the perfect roommate for my apartment in NYC. We've been living together for 6 months now and it's been amazing!",
      initials: "SJ"
    },
    {
      name: "Mike Chen",
      location: "San Francisco, CA", 
      text: "I found an incredible travel companion through StayMate. We explored Europe together and created memories that will last a lifetime.",
      initials: "MC"
    },
    {
      name: "Emma Rodriguez",
      location: "Los Angeles, CA",
      text: "The verification process made me feel so much safer. I found a trustworthy companion for my temporary stay in LA for work.",
      initials: "ER"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy users who have found their perfect companions through StayMate.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;