import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, Users, Shield, AlertTriangle, Scale, CreditCard } from "lucide-react";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Provide accurate and truthful information in your profile",
        "Respect other users and maintain appropriate communication",
        "Do not use the platform for illegal or harmful activities",
        "Report suspicious behavior or policy violations",
        "Keep your account credentials secure and confidential",
        "Comply with all applicable laws and regulations"
      ]
    },
    {
      icon: Shield,
      title: "Platform Rules",
      content: [
        "No harassment, discrimination, or abusive behavior",
        "No sharing of inappropriate or explicit content",
        "No spam, scams, or fraudulent activities",
        "No impersonation or fake profiles",
        "Respect intellectual property rights",
        "Follow community guidelines at all times"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Premium features require valid payment method",
        "Subscriptions renew automatically unless cancelled",
        "Refunds available within 30 days for unused services",
        "Prices may change with 30 days notice",
        "Failed payments may result in service suspension",
        "All transactions are processed securely"
      ]
    },
    {
      icon: Scale,
      title: "Liability & Disclaimers",
      content: [
        "StayMate is a platform connecting users; we don't guarantee outcomes",
        "Users are responsible for their own safety and decisions",
        "We are not liable for disputes between users",
        "Platform availability is not guaranteed 100% of the time",
        "Use the service at your own risk and discretion",
        "Seek professional advice for legal or financial matters"
      ]
    },
    {
      icon: FileText,
      title: "Account Management",
      content: [
        "You may terminate your account at any time",
        "We reserve the right to suspend accounts for policy violations",
        "Inactive accounts may be deleted after extended periods",
        "Account data can be exported before deletion",
        "Some information may be retained for legal compliance",
        "Deleted accounts cannot be recovered"
      ]
    }
  ];

  const prohibitedActivities = [
    "Creating fake profiles or impersonating others",
    "Harassment, threats, or abusive language",
    "Posting inappropriate or illegal content",
    "Attempting to scam or defraud other users",
    "Violating others' privacy or safety",
    "Using automated tools or bots",
    "Commercial solicitation without permission"
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
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These terms govern your use of StayMate. Please read them carefully before using our platform.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Agreement Notice */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using StayMate, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
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

        {/* Prohibited Activities */}
        <Card className="mt-8 border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="w-6 h-6" />
              Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The following activities are strictly prohibited and may result in immediate account suspension:
            </p>
            <ul className="space-y-2">
              {prohibitedActivities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{activity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Changes to These Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to update these Terms of Service at any time. Users will be notified 
              of significant changes via email or platform notifications. Continued use of the platform 
              after changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Questions About These Terms?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            <Button onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            These terms are governed by the laws of California, United States. 
            Any disputes will be resolved through binding arbitration.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;