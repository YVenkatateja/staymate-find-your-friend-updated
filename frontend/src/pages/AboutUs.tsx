import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Heart, Shield, Target, Award, Zap } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in creating genuine connections and fostering a supportive community for everyone."
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Your safety is our priority. We implement robust verification and security measures."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "We welcome people from all backgrounds, creating a diverse and inclusive platform."
    },
    {
      icon: Target,
      title: "Perfect Matches",
      description: "Our smart matching system helps you find the ideal roommates and housing solutions."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "25K+", label: "Successful Matches", icon: Heart },
    { number: "100+", label: "Cities Covered", icon: Target },
    { number: "4.8★", label: "User Rating", icon: Award }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      description: "Former product manager at major tech companies, passionate about solving housing challenges."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      description: "Software engineer with 10+ years experience in building scalable platforms."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      description: "Community specialist focused on creating safe and inclusive environments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-primary/5"
        >
          ← Back
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            About StayMate
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize how people find roommates and housing solutions. 
            Founded in 2023, StayMate connects compatible individuals for shared living experiences 
            that go beyond just splitting rent.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-16 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                To create a world where finding the perfect roommate and housing solution is simple, 
                safe, and enjoyable. We believe everyone deserves a home where they feel comfortable, 
                respected, and connected to their community.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Match?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of happy users who have found their ideal living situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/signup")} className="hover:scale-105 transition-transform">
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/learn-more")}>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutUs;