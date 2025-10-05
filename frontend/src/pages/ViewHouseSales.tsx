import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Home, MapPin, IndianRupee, Phone, Mail, Filter, Search, Bed, Bath, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  propertyType: string;
  image: string;
  amenities: string[];
  contactName: string;
  contactPhone: string;
  description: string;
  posted: string;
}

const ViewHouseSales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Mock data - in real app, this would come from your backend
  const properties: Property[] = [
    {
      id: "1",
      title: "Luxurious 4BHK Villa in Prime Location",
      price: "₹1.2 Crore",
      location: "Bandra West, Mumbai",
      bedrooms: 4,
      bathrooms: 3,
      area: "2400 sq ft",
      propertyType: "Villa",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      amenities: ["Parking", "Garden", "Security", "Power Backup"],
      contactName: "Rajesh Kumar",
      contactPhone: "+91 9876543210",
      description: "Beautiful villa with modern amenities and great connectivity.",
      posted: "2 days ago"
    },
    {
      id: "2",
      title: "Modern 3BHK Apartment",
      price: "₹85 Lakh",
      location: "Koramangala, Bangalore",
      bedrooms: 3,
      bathrooms: 2,
      area: "1800 sq ft",
      propertyType: "Apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      amenities: ["Lift", "Gym", "Club House", "Swimming Pool"],
      contactName: "Priya Sharma",
      contactPhone: "+91 9765432109",
      description: "Ready to move apartment with all modern facilities.",
      posted: "1 week ago"
    },
    {
      id: "3",
      title: "Independent House with Garden",
      price: "₹75 Lakh",
      location: "Sector 50, Gurgaon",
      bedrooms: 3,
      bathrooms: 2,
      area: "2000 sq ft",
      propertyType: "Independent House",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      amenities: ["Garden", "Parking", "Terrace", "Store Room"],
      contactName: "Amit Singh",
      contactPhone: "+91 9654321098",
      description: "Spacious independent house perfect for families.",
      posted: "3 days ago"
    },
    {
      id: "4",
      title: "Premium Plot in Developed Area",
      price: "₹45 Lakh",
      location: "Whitefield, Bangalore",
      bedrooms: 0,
      bathrooms: 0,
      area: "1200 sq ft",
      propertyType: "Plot/Land",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      amenities: ["Clear Title", "Corner Plot", "Near Metro", "Developed Area"],
      contactName: "Sunita Patel",
      contactPhone: "+91 9543210987",
      description: "Ready to construct plot in prime location.",
      posted: "5 days ago"
    },
    {
      id: "5",
      title: "Sea-Facing 2BHK Apartment",
      price: "₹1.8 Crore",
      location: "Marine Drive, Mumbai",
      bedrooms: 2,
      bathrooms: 2,
      area: "1400 sq ft",
      propertyType: "Apartment",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      amenities: ["Sea View", "Parking", "Security", "Lift"],
      contactName: "Neha Gupta",
      contactPhone: "+91 9432109876",
      description: "Stunning sea-facing apartment with panoramic views.",
      posted: "1 day ago"
    },
    {
      id: "6",
      title: "Commercial Office Space",
      price: "₹2.5 Crore",
      location: "Connaught Place, Delhi",
      bedrooms: 0,
      bathrooms: 2,
      area: "3000 sq ft",
      propertyType: "Commercial Property",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      amenities: ["Central AC", "Lift", "Parking", "Reception"],
      contactName: "Vikram Mehta",
      contactPhone: "+91 9321098765",
      description: "Prime commercial space in the heart of Delhi.",
      posted: "4 days ago"
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
          <h1 className="text-3xl font-bold mb-4">Houses for Sale</h1>
          <p className="text-muted-foreground mb-6">
            Find your dream home from our extensive collection of properties
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or location..."
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
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Independent House">Independent House</SelectItem>
                <SelectItem value="Plot/Land">Plot/Land</SelectItem>
                <SelectItem value="Commercial Property">Commercial</SelectItem>
              </SelectContent>
            </Select>
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
                  <Badge className="bg-blue-500 text-white">
                    <Home className="w-3 h-3 mr-1" />
                    {property.propertyType}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-black font-semibold">
                    {property.price}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="outline" className="bg-white/90 text-black text-xs">
                    Posted {property.posted}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {property.title}
                </CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {(property.bedrooms > 0 || property.bathrooms > 0) && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} Bed</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} Bath</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                )}

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

                <Button className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
              <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No properties found matching your criteria. Try adjusting your search.
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

export default ViewHouseSales;