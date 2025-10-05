import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, IndianRupee, Phone, Mail, Filter, Search, Users, Star, Navigation, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface VacationRental {
  id: string;
  title: string;
  pricePerNight: string;
  location: string;
  propertyType: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  contactName: string;
  contactPhone: string;
  description: string;
  checkIn: string;
  checkOut: string;
  availability: string;
}

const ViewVacationRentals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Mock data - in real app, this would come from your backend
  const properties: VacationRental[] = [
    {
      id: "1",
      title: "Beachfront Villa with Private Pool",
      pricePerNight: "₹8,500",
      location: "Calangute, Goa",
      propertyType: "Villa",
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      amenities: ["Pool", "Beach Access", "WiFi", "Kitchen", "AC", "Parking"],
      contactName: "Carlos D'Souza",
      contactPhone: "+91 9876543210",
      description: "Stunning beachfront villa perfect for family vacations with direct beach access.",
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      availability: "Available"
    },
    {
      id: "2",
      title: "Mountain Retreat Cottage",
      pricePerNight: "₹4,200",
      location: "Munnar, Kerala",
      propertyType: "Cottage",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Mountain View", "Garden", "WiFi", "Kitchen", "Fireplace", "Pet Friendly"],
      contactName: "Ravi Nair",
      contactPhone: "+91 9765432109",
      description: "Peaceful mountain cottage surrounded by tea plantations and scenic beauty.",
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      availability: "Available"
    },
    {
      id: "3",
      title: "Luxury Lake House",
      pricePerNight: "₹6,800",
      location: "Udaipur, Rajasthan",
      propertyType: "Lake House",
      maxGuests: 10,
      bedrooms: 5,
      bathrooms: 4,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      amenities: ["Lake View", "Boat Access", "WiFi", "Kitchen", "AC", "Butler Service"],
      contactName: "Maharaja Resorts",
      contactPhone: "+91 9654321098",
      description: "Royal experience with stunning lake views and traditional Rajasthani architecture.",
      checkIn: "4:00 PM",
      checkOut: "11:00 AM",
      availability: "Booked until Jan 15"
    },
    {
      id: "4",
      title: "Cozy Hill Station Apartment",
      pricePerNight: "₹3,500",
      location: "Shimla, Himachal Pradesh",
      propertyType: "Apartment",
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.4,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop",
      amenities: ["Mountain View", "WiFi", "Kitchen", "Heating", "Parking", "Balcony"],
      contactName: "Priya Thakur",
      contactPhone: "+91 9543210987",
      description: "Comfortable apartment with breathtaking mountain views in the heart of Shimla.",
      checkIn: "3:00 PM",
      checkOut: "10:00 AM",
      availability: "Available"
    },
    {
      id: "5",
      title: "Heritage Haveli Experience",
      pricePerNight: "₹12,000",
      location: "Jaisalmer, Rajasthan",
      propertyType: "Heritage Hotel",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      rating: 4.7,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      amenities: ["Heritage Architecture", "Rooftop Dining", "WiFi", "AC", "Cultural Shows", "Desert Safari"],
      contactName: "Rajesh Singh",
      contactPhone: "+91 9432109876",
      description: "Experience royal lifestyle in this beautifully restored 18th-century haveli.",
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      availability: "Available"
    },
    {
      id: "6",
      title: "Modern Beach Resort Suite",
      pricePerNight: "₹7,500",
      location: "Kovalam, Kerala",
      propertyType: "Resort Suite",
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      rating: 4.5,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Pool", "WiFi", "Room Service", "Spa", "Restaurant"],
      contactName: "Coconut Resort",
      contactPhone: "+91 9321098765",
      description: "Luxurious resort suite with direct beach access and world-class amenities.",
      checkIn: "4:00 PM",
      checkOut: "11:00 AM",
      availability: "Available"
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || property.propertyType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/housing-solutions")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Housing Solutions
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Vacation Rentals & Getaways</h1>
          <p className="text-muted-foreground mb-6">
            Discover amazing vacation rentals and create unforgettable memories
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by destination or property name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Cottage">Cottage</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Resort Suite">Resort Suite</SelectItem>
                <SelectItem value="Heritage Hotel">Heritage Hotel</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={() => navigate("/nearby-places")}
              variant="outline"
              className="w-full md:w-auto"
            >
              <Navigation className="mr-2 h-4 w-4" />
              Explore Nearby
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-teal-500 text-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.propertyType}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-black font-semibold">
                    {property.pricePerNight}/night
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      property.availability === "Available" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}
                  >
                    {property.availability}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {property.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{property.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({property.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{property.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <span>{property.bathrooms} bath</span>
                  </div>
                </div>

                <CardDescription className="text-sm line-clamp-2">
                  {property.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Check-in: {property.checkIn}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Check-out: {property.checkOut}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{property.contactName}</p>
                      <p className="text-xs text-muted-foreground">{property.contactPhone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" disabled={property.availability !== "Available"}>
                    {property.availability === "Available" ? "Book Now" : "Not Available"}
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/nearby-places")}>
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No vacation rentals found matching your criteria. Try adjusting your search.
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ViewVacationRentals;