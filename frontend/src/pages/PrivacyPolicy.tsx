import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, Lock, Users, FileText, AlertTriangle } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        "Personal information you provide during registration (name, email, phone number)",
        "Profile information including photos, preferences, and lifestyle details",
        "Communication data between users on our platform",
        "Device information and usage analytics to improve our services",
        "Location data (with your permission) to show relevant listings"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To create and maintain your user account",
        "To match you with compatible roommates and housing options",
        "To facilitate communication between users",
        "To improve our services and user experience", 
        "To send important updates and notifications",
        "To ensure platform safety and prevent fraud"
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Profile information is visible to other users based on your privacy settings",
        "We may share data with service providers who help operate our platform",
        "Legal authorities may access information when required by law",
        "Aggregated, non-personal data may be used for research and analytics"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and updates to our systems",
        "Secure data centers with restricted access",
        "Two-factor authentication available for account protection",
        "Immediate notification of any security breaches"
      ]
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: [
        "Access and download your personal data",
        "Correct inaccurate information in your profile",
        "Delete your account and associated data",
        "Control privacy settings and data sharing preferences",
        "Opt out of marketing communications",
        "Request data portability to another service"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Important Information</h2>
                <p className="text-muted-foreground">
                  By using StayMate, you agree to the collection and use of information in accordance with this policy. 
                  We recommend reading this document carefully to understand how your data is handled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Questions About This Policy?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/contact")}>
                Contact Us
              </Button>
              <Button variant="outline" onClick={() => navigate("/settings")}>
                Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This privacy policy is subject to change. We will notify users of any significant updates 
            via email or platform notifications.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;