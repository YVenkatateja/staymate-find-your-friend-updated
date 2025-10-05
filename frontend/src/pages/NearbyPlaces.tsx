import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NearbyPlaces from "@/components/NearbyPlaces";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NearbyPlacesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <NearbyPlaces />
      </main>
      
      <Footer />
    </div>
  );
};

export default NearbyPlacesPage;