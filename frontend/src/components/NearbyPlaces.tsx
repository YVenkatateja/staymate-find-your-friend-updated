import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Utensils, 
  Coffee, 
  Camera, 
  Gamepad2, 
  Waves, 
  TreePine,
  Star,
  Clock,
  Navigation
} from "lucide-react";

interface Place {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'tourist' | 'entertainment';
  rating: number;
  distance: string;
  price?: string;
  image: string;
  description: string;
  openHours?: string;
}

const NearbyPlaces = () => {
  const [location, setLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Mock data - in real app, this would come from APIs
  const mockPlaces: Place[] = [
    {
      id: "1",
      name: "Gourmet Bistro",
      type: "restaurant",
      rating: 4.5,
      distance: "0.3 km",
      price: "₹₹₹",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      description: "Fine dining with local and international cuisine",
      openHours: "11:00 AM - 11:00 PM"
    },
    {
      id: "2",
      name: "Coffee Culture",
      type: "cafe",
      rating: 4.2,
      distance: "0.5 km",
      price: "₹₹",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop",
      description: "Artisan coffee and cozy atmosphere",
      openHours: "7:00 AM - 9:00 PM"
    },
    {
      id: "3",
      name: "City Heritage Museum",
      type: "tourist",
      rating: 4.7,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1565301660306-29e08751cc53?w=300&h=200&fit=crop",
      description: "Explore local history and culture",
      openHours: "9:00 AM - 6:00 PM"
    },
    {
      id: "4",
      name: "Adventure Water Park",
      type: "entertainment",
      rating: 4.4,
      distance: "2.1 km",
      price: "₹₹₹",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
      description: "Thrilling water slides and family fun",
      openHours: "10:00 AM - 8:00 PM"
    },
    {
      id: "5",
      name: "Sports Turf Complex",
      type: "entertainment",
      rating: 4.3,
      distance: "0.8 km",
      price: "₹₹",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop",
      description: "Football, cricket, and multi-sport facilities",
      openHours: "6:00 AM - 10:00 PM"
    },
    {
      id: "6",
      name: "Rooftop Lounge",
      type: "restaurant",
      rating: 4.6,
      distance: "0.7 km",
      price: "₹₹₹₹",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
      description: "Panoramic city views with premium dining",
      openHours: "6:00 PM - 1:00 AM"
    }
  ];

  const getTypeIcon = (type: Place['type']) => {
    switch (type) {
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'cafe': return <Coffee className="w-4 h-4" />;
      case 'tourist': return <Camera className="w-4 h-4" />;
      case 'entertainment': return <Gamepad2 className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Place['type']) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-500';
      case 'cafe': return 'bg-amber-500';
      case 'tourist': return 'bg-blue-500';
      case 'entertainment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: Place['type']) => {
    switch (type) {
      case 'restaurant': return 'Restaurant';
      case 'cafe': return 'Café';
      case 'tourist': return 'Tourist Spot';
      case 'entertainment': return 'Entertainment';
      default: return 'Place';
    }
  };

  const handleSearch = () => {
    if (location.trim()) {
      setShowResults(true);
    }
  };

  const filteredPlaces = mockPlaces;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Discover Nearby Places</h2>
        <p className="text-muted-foreground mb-6">
          Find the best restaurants, cafés, tourist spots, and entertainment venues around your location
        </p>
        
        <div className="flex gap-4 max-w-md mx-auto mb-6">
          <Input
            placeholder="Enter your location (e.g., Mumbai, Delhi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={!location.trim()}>
            <Navigation className="w-4 h-4 mr-2" />
            Explore
          </Button>
        </div>
      </div>

      {showResults && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <Utensils className="w-3 h-3 mr-1" />
              Restaurants
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <Coffee className="w-3 h-3 mr-1" />
              Cafés
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Camera className="w-3 h-3 mr-1" />
              Tourist Spots
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Gamepad2 className="w-3 h-3 mr-1" />
              Entertainment
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getTypeColor(place.type)} text-white`}>
                      {getTypeIcon(place.type)}
                      <span className="ml-1">{getTypeLabel(place.type)}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      <MapPin className="w-3 h-3 mr-1" />
                      {place.distance}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {place.name}
                    </CardTitle>
                    {place.price && (
                      <Badge variant="outline" className="text-xs">
                        {place.price}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{place.rating}</span>
                    </div>
                    {place.openHours && (
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="text-xs">{place.openHours}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">
                    {place.description}
                  </CardDescription>
                  
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Places
            </Button>
          </div>
        </div>
      )}

      {!showResults && location.trim() && (
        <div className="text-center py-12">
          <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Enter a location and click "Explore" to discover amazing places nearby!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyPlaces;