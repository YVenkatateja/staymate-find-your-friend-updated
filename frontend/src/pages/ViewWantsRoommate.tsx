import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase, User, Phone, Mail, Heart, Star, Clock, Sparkles, Shield, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ViewWantsRoommate = () => {
  const navigate = useNavigate();
  
  // Mock data - In production, this would come from your Supabase database
  const mockProfiles = [
    {
      id: 1,
      fullName: "Alex Thompson",
      age: 26,
      gender: "Male",
      location: "City Center",
      phone: "+1 (555) 111-2222",
      email: "alex.t@email.com",
      profileImage: "/placeholder.svg",
      budget: "$600-800",
      preferredArea: "Downtown",
      moveInDate: "2024-02-01",
      occupation: "Software Engineer",
      aboutMe: "I'm a clean, responsible professional who enjoys cooking and weekend hiking. Looking for a peaceful place to call home with like-minded people.",
      roommateGenderPreference: "Any",
      workSchedule: "9-5 Weekdays",
      smokingPreference: "Non-smoker",
      preferences: ["tech-savvy", "clean-freak", "early-bird", "gym-freak", "foodie"],
      verificationStatus: "Verified",
      responseRate: "95%",
      isOwn: true,
      isPinned: true
    },
    {
      id: 2,
      fullName: "Jessica Williams",
      age: 24,
      gender: "Female",
      location: "Suburbs",
      phone: "+1 (555) 333-4444",
      email: "jessica.w@email.com",
      profileImage: "/placeholder.svg",
      budget: "$500-700",
      preferredArea: "University Area",
      moveInDate: "2024-01-20",
      occupation: "Graduate Student",
      aboutMe: "Quiet graduate student studying psychology. I love reading, yoga, and keeping a tidy living space. Looking for a peaceful environment to focus on studies.",
      roommateGenderPreference: "Female",
      workSchedule: "Flexible",
      smokingPreference: "Non-smoker",
      preferences: ["homebody", "clean-freak", "non-smoker", "night-owl"],
      verificationStatus: "Verified",
      responseRate: "88%",
      isOwn: false,
      isPinned: false
    },
    {
      id: 3,
      fullName: "David Park",
      age: 29,
      gender: "Male",
      location: "Tech District",
      phone: "+1 (555) 555-6666",
      email: "david.p@email.com",
      profileImage: "/placeholder.svg",
      budget: "$800-1000",
      preferredArea: "Tech District",
      moveInDate: "2024-02-10",
      occupation: "Product Manager",
      aboutMe: "Tech professional who values work-life balance. I enjoy gaming, cooking, and have a small home gym setup. Looking for like-minded roommates.",
      roommateGenderPreference: "Male",
      workSchedule: "9-6 Weekdays",
      smokingPreference: "Social smoker",
      isOwn: false,
      isPinned: false
    }
  ];

  // Sort profiles - own profile first (pinned), then others
  const sortedProfiles = [...mockProfiles].sort((a, b) => {
    if (a.isOwn && !b.isOwn) return -1;
    if (!a.isOwn && b.isOwn) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/find-companions")}
            className="mb-6 hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Find Companions
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              People Who Want To
              <span className="block text-primary">Be Roommates</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Browse profiles of people looking for a place to share
            </p>
          </div>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {sortedProfiles.map((profile, index) => (
            <Card 
              key={profile.id}
              className={`transition-all duration-500 hover:shadow-2xl border-2 group relative overflow-hidden animate-fade-in ${
                profile.isOwn 
                  ? "border-primary shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {profile.isOwn && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Your Profile
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg">
                      <img 
                        src={profile.profileImage} 
                        alt={profile.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{profile.fullName}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{profile.age} years old</Badge>
                        <Badge variant="secondary">{profile.gender}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {profile.location}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <DollarSign className="h-4 w-4 text-primary" />
                          Budget
                        </div>
                        <p className="text-muted-foreground">{profile.budget}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4 text-primary" />
                          Preferred Area
                        </div>
                        <p className="text-muted-foreground">{profile.preferredArea}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-primary" />
                          Move-in Date
                        </div>
                        <p className="text-muted-foreground">{profile.moveInDate}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Briefcase className="h-4 w-4 text-primary" />
                          Occupation
                        </div>
                        <p className="text-muted-foreground">{profile.occupation}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4 text-primary" />
                          Work Schedule
                        </div>
                        <p className="text-muted-foreground">{profile.workSchedule}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4 text-primary" />
                          Roommate Preference
                        </div>
                        <p className="text-muted-foreground">{profile.roommateGenderPreference}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Phone className="h-4 w-4 text-primary" />
                          Phone
                        </div>
                        <p className="text-muted-foreground">{profile.phone}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Mail className="h-4 w-4 text-primary" />
                          Email
                        </div>
                        <p className="text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">About Me</h4>
                      <p className="text-muted-foreground">{profile.aboutMe}</p>
                    </div>

                    {/* Verification and Response Rate */}
                    <div className="flex gap-4 flex-wrap">
                      {profile.verificationStatus && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{profile.verificationStatus}</span>
                        </div>
                      )}
                      {profile.responseRate && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">{profile.responseRate} Response Rate</span>
                        </div>
                      )}
                    </div>

                    {/* Lifestyle Preferences */}
                    {profile.preferences && profile.preferences.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Lifestyle Preferences
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.preferences.map((pref, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {pref.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {!profile.isOwn && (
                      <div className="flex gap-4 pt-4">
                        <Button className="flex-1">
                          Contact {profile.fullName.split(' ')[0]}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note about data */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Connect to Supabase to store and display real user data
          </p>
        </div>
      </main>
    </div>
  );
};

export default ViewWantsRoommate;