import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, Home, User, Phone, Mail, Heart, Star, Bath, Bed, Car, ImageIcon, Sparkles, Shield, Wifi, CheckCircle, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ViewRentals = () => {
  const navigate = useNavigate();
  
  // Mock data - In production, this would come from your Supabase database
  const mockProfiles = [
    {
      id: 1,
      fullName: "Maria Garcia",
      age: 35,
      gender: "Female",
      location: "Oak Street, Downtown",
      phone: "+1 (555) 777-8888",
      email: "maria.g@email.com",
      profileImage: "/placeholder.svg",
      propertyType: "Apartment",
      bedrooms: "2",
      bathrooms: "2",
      rentAmount: "$1,200",
      propertyAddress: "123 Oak Street, Downtown District",
      propertyDescription: "Beautiful 2-bedroom apartment with modern amenities, hardwood floors, and stunning city views. Recently renovated with stainless steel appliances and granite countertops. Perfect for young professionals or small families.",
      amenities: ["Parking", "Gym", "Pool", "Laundry", "WiFi", "Security", "Elevator", "Balcony"],
      availableFrom: "2024-02-01",
      leaseTerm: "12 months",
      petPolicy: "Cats allowed",
      propertyImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      furnishingStatus: "Fully Furnished",
      securityDeposit: "$2,400",
      utilitiesIncluded: ["Water", "Heating"],
      nearbyFacilities: ["Metro Station", "Shopping Mall", "Hospital", "School"],
      landlordRating: 4.8,
      isOwn: true,
      isPinned: true
    },
    {
      id: 2,
      fullName: "Robert Johnson",
      age: 42,
      gender: "Male",
      location: "Pine Avenue, Suburbs",
      phone: "+1 (555) 999-0000",
      email: "robert.j@email.com",
      profileImage: "/placeholder.svg",
      propertyType: "House",
      bedrooms: "3",
      bathrooms: "2",
      rentAmount: "$1,800",
      propertyAddress: "456 Pine Avenue, Suburban Heights",
      propertyDescription: "Spacious 3-bedroom house with a large backyard, perfect for families. Features include garage, modern kitchen, and quiet neighborhood.",
      amenities: ["Garage", "Garden", "Fireplace", "Storage"],
      availableFrom: "2024-01-25",
      leaseTerm: "12-24 months",
      petPolicy: "Dogs and cats welcome",
      isOwn: false,
      isPinned: false
    },
    {
      id: 3,
      fullName: "Linda Chen",
      age: 38,
      gender: "Female",
      location: "Main Street, University Area",
      phone: "+1 (555) 123-9999",
      email: "linda.c@email.com",
      profileImage: "/placeholder.svg",
      propertyType: "Condo",
      bedrooms: "1",
      bathrooms: "1",
      rentAmount: "$950",
      propertyAddress: "789 Main Street, University District",
      propertyDescription: "Modern 1-bedroom condo close to university campus. Perfect for students or young professionals. Includes all utilities and high-speed internet.",
      amenities: ["Internet", "Utilities", "Study Room", "24/7 Security"],
      availableFrom: "2024-02-15",
      leaseTerm: "6-12 months",
      petPolicy: "No pets",
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
              Available 
              <span className="block text-primary">Rental Properties</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Browse rental properties from verified landlords
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
                    Your Property
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Property Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg">
                      <img 
                        src={profile.profileImage} 
                        alt={`Property by ${profile.fullName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{profile.propertyAddress}</h3>
                      <p className="text-lg text-muted-foreground mb-2">Listed by {profile.fullName}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {profile.rentAmount}/month
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {profile.bedrooms} bed
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {profile.bathrooms} bath
                        </Badge>
                        <Badge variant="outline">{profile.propertyType}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4 text-primary" />
                          Location
                        </div>
                        <p className="text-muted-foreground">{profile.location}</p>
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
                          <Home className="h-4 w-4 text-primary" />
                          Lease Term
                        </div>
                        <p className="text-muted-foreground">{profile.leaseTerm}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4 text-primary" />
                          Pet Policy
                        </div>
                        <p className="text-muted-foreground">{profile.petPolicy}</p>
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

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Property Description</h4>
                        <p className="text-muted-foreground">{profile.propertyDescription}</p>
                      </div>

                      {/* Property Images Gallery */}
                      {profile.propertyImages && profile.propertyImages.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            Property Photos
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {profile.propertyImages.map((image, idx) => (
                              <div key={idx} className="relative group overflow-hidden rounded-lg border">
                                <img
                                  src={image}
                                  alt={`Property ${idx + 1}`}
                                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                  <ImageIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Landlord Rating */}
                      {profile.landlordRating && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-700">Verified Landlord</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{profile.landlordRating}/5</span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
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

                        {/* Utilities & Additional Info */}
                        <div className="space-y-4">
                          {profile.utilitiesIncluded && profile.utilitiesIncluded.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Utilities Included
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.utilitiesIncluded.map((utility, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {utility}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {profile.nearbyFacilities && profile.nearbyFacilities.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <Building className="h-4 w-4 text-primary" />
                                Nearby Facilities
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.nearbyFacilities.map((facility, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {facility}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Property Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        {profile.furnishingStatus && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Bed className="h-4 w-4 text-primary" />
                              Furnishing
                            </div>
                            <p className="text-muted-foreground text-sm">{profile.furnishingStatus}</p>
                          </div>
                        )}

                        {profile.securityDeposit && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Shield className="h-4 w-4 text-primary" />
                              Security Deposit
                            </div>
                            <p className="text-muted-foreground text-sm">{profile.securityDeposit}</p>
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4 text-primary" />
                            Pet Policy
                          </div>
                          <p className="text-muted-foreground text-sm">{profile.petPolicy}</p>
                        </div>
                      </div>
                    </div>

                    {!profile.isOwn && (
                      <div className="flex gap-4 pt-4">
                        <Button className="flex-1">
                          Contact Landlord
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

export default ViewRentals;