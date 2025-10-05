import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Users, Shield, CreditCard, Settings, MessageSquare } from "lucide-react";

const FAQ = () => {
  const navigate = useNavigate();

  const faqCategories = [
    {
      icon: Users,
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' on our homepage, fill in your basic information, verify your email, and complete your profile with preferences and photos."
        },
        {
          question: "Is StayMate free to use?",
          answer: "Basic features like browsing profiles and basic messaging are free. Premium features include unlimited messaging, priority matching, and advanced filters."
        },
        {
          question: "How does the matching system work?",
          answer: "Our algorithm considers your lifestyle preferences, budget, location, and compatibility factors to suggest the best potential roommates and housing options."
        },
        {
          question: "Can I use StayMate in any city?",
          answer: "We currently operate in over 100 cities across the US, Canada, and UK. Check our coverage area on the homepage to see if your city is included."
        }
      ]
    },
    {
      icon: Shield,
      title: "Safety & Verification",
      faqs: [
        {
          question: "How do you verify users?",
          answer: "We use multiple verification methods including ID verification, phone number confirmation, social media linking, and optional background checks for premium users."
        },
        {
          question: "What safety measures are in place?",
          answer: "We have 24/7 moderation, user reporting systems, secure messaging, profile verification badges, and safety tips throughout the platform."
        },
        {
          question: "How do I report suspicious behavior?",
          answer: "Click the 'Report' button on any profile or message, select the reason, and our safety team will investigate within 24 hours."
        },
        {
          question: "Are background checks required?",
          answer: "Background checks are optional but recommended for premium users. We partner with trusted verification services to ensure accuracy."
        }
      ]
    },
    {
      icon: MessageSquare,
      title: "Communication & Matching",
      faqs: [
        {
          question: "How do I message other users?",
          answer: "Click 'Message' on a profile you're interested in. Free users can send 5 messages per day, while premium users have unlimited messaging."
        },
        {
          question: "Why can't I see some profiles?",
          answer: "Users can set privacy preferences, age ranges, and other filters. You might not meet their criteria, or they might have limited their visibility."
        },
        {
          question: "How do I improve my match quality?",
          answer: "Complete your profile fully, add recent photos, be specific about preferences, and stay active on the platform to improve algorithm learning."
        },
        {
          question: "Can I hide my profile temporarily?",
          answer: "Yes, go to Settings > Privacy and toggle 'Profile Visibility' off. Your profile will be hidden but your account remains active."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payments & Subscriptions",
      faqs: [
        {
          question: "What premium features are available?",
          answer: "Premium includes unlimited messaging, advanced filters, priority customer support, read receipts, and enhanced profile visibility."
        },
        {
          question: "How much does premium cost?",
          answer: "Premium plans start at $19.99/month, $49.99/quarter, or $149.99/year. Prices may vary by location and current promotions."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel anytime from your account settings. Your premium features will remain active until the end of your billing period."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer full refunds within 30 days of purchase if you haven't used premium features. Partial refunds may be available in special circumstances."
        }
      ]
    },
    {
      icon: Settings,
      title: "Account Management",
      faqs: [
        {
          question: "How do I update my profile?",
          answer: "Go to Settings > Profile Information to update your details, photos, preferences, and lifestyle information at any time."
        },
        {
          question: "Can I change my location?",
          answer: "Yes, update your current city in profile settings. Note that this will affect your matches and may reset some preferences."
        },
        {
          question: "How do I delete my account?",
          answer: "Go to Settings > Danger Zone > Delete Account. This action is permanent and cannot be undone. You can download your data first."
        },
        {
          question: "What happens to my data when I delete my account?",
          answer: "Most data is permanently deleted within 30 days. Some information may be retained for legal compliance as outlined in our Privacy Policy."
        }
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
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about using StayMate to find your perfect roommate and housing solution.
          </p>
        </div>

        {/* Search Suggestion */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6 text-center">
            <HelpCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Use Ctrl+F (or Cmd+F on Mac) to search this page, or contact our support team directly.
            </p>
            <Button onClick={() => navigate("/contact")}>
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <Card className="mt-12 border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you with any questions not covered in our FAQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/contact")}>
                Contact Support
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/learn-more")}>
                Learn More About StayMate
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FAQ;