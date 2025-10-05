import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, Home, User, Phone, Mail, Heart, Star, Sparkles, Shield, ImageIcon, Bed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ViewNeedRoommate = () => {
  const navigate = useNavigate();
  
  // Mock data - In production, this would come from your Supabase database
  const mockProfiles = [
    {
      id: 1,
      fullName: "Sarah Johnson",
      age: 25,
      gender: "Female",
      location: "Downtown Area",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@email.com",
      profileImage: "/placeholder.svg",
      rentBudget: "$800-1000",
      propertyType: "Apartment",
      roomDescription: "Spacious room in a modern 2-bedroom apartment with great natural light and city views. The room comes fully furnished with a queen-size bed, study desk, and built-in wardrobe.",
      roommatePreference: "Female",
      availableFrom: "2024-02-01",
      furnishingStatus: "Fully Furnished",
      depositAmount: "$1,500",
      propertyImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      preferences: ["clean-freak", "non-smoker", "early-bird", "homebody"],
      amenities: ["WiFi", "Parking", "Kitchen Access", "Laundry", "Security"],
      isOwn: true,
      isPinned: true
    },
    {
      id: 2,
      fullName: "Mike Chen",
      age: 28,
      gender: "Male",
      location: "University District",
      phone: "+1 (555) 987-6543",
      email: "mike.chen@email.com",
      profileImage: "/placeholder.svg",
      rentBudget: "$600-800",
      propertyType: "House",
      roomDescription: "Cozy room in a shared house with garden access and parking available. Close to university campus and public transport.",
      roommatePreference: "Any",
      availableFrom: "2024-01-15",
      furnishingStatus: "Semi Furnished",
      depositAmount: "$1,200",
      propertyImages: ["/placeholder.svg", "/placeholder.svg"],
      preferences: ["gym-freak", "music-lover", "pet-lover"],
      amenities: ["Garden", "Parking", "Gym Access", "Pet Friendly"],
      isOwn: false,
      isPinned: false
    },
    {
      id: 3,
      fullName: "Emily Rodriguez",
      age: 23,
      gender: "Female",
      location: "Midtown",
      phone: "+1 (555) 456-7890",
      email: "emily.r@email.com",
      profileImage: "/placeholder.svg",
      rentBudget: "$700-900",
      propertyType: "Studio",
      roomDescription: "Modern studio apartment perfect for a responsible roommate. Close to public transport and shopping centers. Includes all utilities.",
      roommatePreference: "Female",
      availableFrom: "2024-02-15",
      furnishingStatus: "Fully Furnished",
      depositAmount: "$900",
      propertyImages: ["/placeholder.svg"],
      preferences: ["foodie", "tech-savvy", "night-owl"],
      amenities: ["All Utilities", "Internet", "Shopping Nearby", "Transport"],
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
              People Who 
              <span className="block text-primary">Need Roommates</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Browse profiles of people looking for roommates to share their space
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
                          Rent Budget
                        </div>
                        <p className="text-muted-foreground">{profile.rentBudget}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Home className="h-4 w-4 text-primary" />
                          Property Type
                        </div>
                        <p className="text-muted-foreground">{profile.propertyType}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4 text-primary" />
                          Prefers
                        </div>
                        <p className="text-muted-foreground">{profile.roommatePreference} roommate</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-primary" />
                          Available From
                        </div>
                        <p className="text-muted-foreground">{profile.availableFrom}</p>
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
                      <h4 className="font-medium">Room Description</h4>
                      <p className="text-muted-foreground">{profile.roomDescription}</p>
                    </div>

                    {/* Property Images Gallery */}
                    {profile.propertyImages && profile.propertyImages.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-primary" />
                          Property Photos
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {profile.propertyImages.map((image, idx) => (
                            <div key={idx} className="relative group overflow-hidden rounded-lg">
                              <img
                                src={image}
                                alt={`Property ${idx + 1}`}
                                className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

                    {/* Amenities */}
                    {profile.amenities && profile.amenities.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.furnishingStatus && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Bed className="h-4 w-4 text-primary" />
                            Furnishing
                          </div>
                          <p className="text-muted-foreground">{profile.furnishingStatus}</p>
                        </div>
                      )}

                      {profile.depositAmount && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <DollarSign className="h-4 w-4 text-primary" />
                            Security Deposit
                          </div>
                          <p className="text-muted-foreground">{profile.depositAmount}</p>
                        </div>
                      )}
                    </div>

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

export default ViewNeedRoommate;