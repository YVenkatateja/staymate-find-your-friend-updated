import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Lock, Eye, UserCheck } from "lucide-react";
import Header from "@/components/Header";

const Safety = () => {
  const navigate = useNavigate();

  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "All users must verify their identity with government-issued ID before accessing the platform."
    },
    {
      icon: Shield,
      title: "Background Screening",
      description: "Comprehensive background checks including criminal history and social media verification."
    },
    {
      icon: Lock,
      title: "Secure Communication",
      description: "End-to-end encrypted messaging system to protect your private conversations."
    },
    {
      icon: Eye,
      title: "Profile Monitoring",
      description: "AI-powered monitoring system detects suspicious behavior and fake profiles automatically."
    }
  ];

  const safetyTips = [
    {
      title: "Meet in Public First",
      description: "Always arrange your first meeting in a public place with plenty of people around."
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels off, don't ignore it. Trust your gut feelings about people and situations."
    },
    {
      title: "Share Your Plans",
      description: "Let friends or family know where you're going and who you're meeting."
    },
    {
      title: "Video Chat First",
      description: "Have a video call before meeting in person to verify the person matches their profile."
    },
    {
      title: "Keep Personal Info Private",
      description: "Don't share your home address, financial information, or other sensitive details too early."
    },
    {
      title: "Report Suspicious Behavior",
      description: "Use our reporting system if you encounter any inappropriate or concerning behavior."
    }
  ];

  const verificationSteps = [
    "Upload government-issued photo ID",
    "Take a live selfie for comparison",
    "Verify phone number with SMS code",
    "Complete social media verification",
    "Pass background screening check"
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
            <Badge variant="secondary" className="mb-4">Safety & Security</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Safety is Our Top Priority
            </h1>
            <p className="text-xl text-muted-foreground">
              We've built comprehensive safety measures and verification processes to ensure you can connect with confidence. 
              Our multi-layered approach to security helps create a trusted community where genuine connections can flourish.
            </p>
          </div>
        </div>

        {/* Safety Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Safety Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
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

        {/* Verification Process */}
        <section className="mb-16 py-16 bg-muted/30 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Verification Process</h2>
            <div className="max-w-2xl mx-auto">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center mb-6 last:mb-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-lg">{step}</span>
                      <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Badge variant="outline" className="text-sm">
                ✓ All verification steps are required for platform access
              </Badge>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Safety Tips for Users</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {tip.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="text-center py-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
          <div className="max-w-2xl mx-auto">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Need Help or Feel Unsafe?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our safety team is available 24/7 to assist you with any concerns or emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="destructive">
                Report Emergency
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Response time: Under 15 minutes for emergencies
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Safety;