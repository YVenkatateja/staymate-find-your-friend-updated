import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import FindCompanions from "./pages/FindCompanions";
import NeedRoommate from "./pages/NeedRoommate";
import WantsToBeRoommate from "./pages/WantsToBeRoommate";
import Rentals from "./pages/Rentals";
import RegisterNeedRoommate from "./pages/RegisterNeedRoommate";
import RegisterWantsRoommate from "./pages/RegisterWantsRoommate";
import RegisterRentals from "./pages/RegisterRentals";
import HousingSolutions from "./pages/HousingSolutions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LearnMore from "./pages/LearnMore";
import Safety from "./pages/Safety";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import ViewNeedRoommate from "./pages/ViewNeedRoommate";
import NeedRoommateDetail from "./pages/NeedRoommateDetail";    
import ViewWantsRoommate from "./pages/ViewWantsRoommate";
import ViewRentals from "./pages/ViewRentals";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";
import NearbyPlacesPage from "./pages/NearbyPlaces";
import RegisterHouseSale from "./pages/RegisterHouseSale";
import RegisterVacationRental from "./pages/RegisterVacationRental";
import ViewHouseSales from "./pages/ViewHouseSales";
import ViewVacationRentals from "./pages/ViewVacationRentals";
import Profile from "./pages/profile"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-companions" element={<FindCompanions />} />
          <Route path="/need-roommate" element={<NeedRoommate />} />
          <Route path="/need-roommate/register" element={<RegisterNeedRoommate />} />
          <Route path="/wants-to-be-roommate" element={<WantsToBeRoommate />} />
          <Route path="/wants-to-be-roommate/register" element={<RegisterWantsRoommate />} />
          <Route path="/wants-to-be-roommate/browse" element={<ViewWantsRoommate />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rentals/register" element={<RegisterRentals />} />
          <Route path="/rentals/browse" element={<ViewRentals />} />
          <Route path="/housing-solutions" element={<HousingSolutions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} /> {/* <-- add Profile route */}
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/view-need-roommate" element={<ViewNeedRoommate />} />
          <Route path="/needroommates/:id" element={<NeedRoommateDetail />} /> 
          <Route path="/view-wants-roommate" element={<ViewWantsRoommate />} />
          <Route path="/view-rentals" element={<ViewRentals />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/nearby-places" element={<NearbyPlacesPage />} />
          <Route path="/house-sale/register" element={<RegisterHouseSale />} />
          <Route path="/vacation-rental/register" element={<RegisterVacationRental />} />
          <Route path="/house-sales" element={<ViewHouseSales />} />
          <Route path="/vacation-rentals" element={<ViewVacationRentals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
