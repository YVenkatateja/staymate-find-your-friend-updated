import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, X, Upload, Camera, User, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const baseFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
});

const needRoommateSchema = baseFormSchema.extend({
  currentLiving: z.string().min(1, "Current living situation is required"),
  propertyType: z.string().min(1, "Property type is required"),
  rentBudget: z.string().min(1, "Rent budget is required"),
  availableFrom: z.string().min(1, "Available from date is required"),
  roomDescription: z.string().min(10, "Room description must be at least 10 characters"),
  roommatePreference: z.string().min(1, "Roommate preference is required"),
  customRoommatePreference: z.string().optional(),
  furnishingStatus: z.string().min(1, "Furnishing status is required"),
  depositAmount: z.string().min(1, "Deposit amount is required"),
});

const wantsRoommateSchema = baseFormSchema.extend({
  budget: z.string().min(1, "Budget is required"),
  preferredArea: z.string().min(1, "Preferred area is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  occupation: z.string().min(1, "Occupation is required"),
  aboutMe: z.string().min(20, "Tell us more about yourself (at least 20 characters)"),
  roommateGenderPreference: z.string().min(1, "Roommate gender preference is required"),
  customGenderPreference: z.string().optional(),
  workSchedule: z.string().min(1, "Work schedule is required"),
  smokingPreference: z.string().min(1, "Smoking preference is required"),
  customSmokingPreference: z.string().optional(),
});

const rentalsSchema = baseFormSchema.extend({
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.string().min(1, "Number of bedrooms is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  rentAmount: z.string().min(1, "Rent amount is required"),
  propertyAddress: z.string().min(5, "Property address is required"),
  amenities: z.string().optional(),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  availableFrom: z.string().min(1, "Available from date is required"),
  leaseDuration: z.string().min(1, "Lease duration is required"),
});

interface RegistrationFormProps {
  type: "need-roommate" | "wants-roommate" | "rentals";
  title: string;
  description: string;
  backPath: string;
}

const preferences = [
  { 
    id: "night-owl", 
    label: "Night Owl", 
    description: "Active during late hours",
    icon: "🌙",
    gradient: "bg-gradient-to-br from-gradient-purple to-gradient-blue" 
  },
  { 
    id: "early-bird", 
    label: "Early Bird", 
    description: "Rise with the sun",
    icon: "🌅",
    gradient: "bg-gradient-to-br from-gradient-orange to-gradient-accent" 
  },
  { 
    id: "gym-freak", 
    label: "Fitness Enthusiast", 
    description: "Health and fitness focused",
    icon: "💪",
    gradient: "bg-gradient-to-br from-gradient-pink to-primary" 
  },
  { 
    id: "foodie", 
    label: "Foodie", 
    description: "Love exploring cuisines",
    icon: "🍕",
    gradient: "bg-gradient-to-br from-gradient-secondary to-accent" 
  },
  { 
    id: "party-lover", 
    label: "Social Butterfly", 
    description: "Enjoy social gatherings",
    icon: "🎉",
    gradient: "bg-gradient-to-br from-gradient-blue to-gradient-purple" 
  },
  { 
    id: "homebody", 
    label: "Homebody", 
    description: "Comfort of home",
    icon: "🏠",
    gradient: "bg-gradient-to-br from-primary to-gradient-purple" 
  },
  { 
    id: "pet-lover", 
    label: "Pet Lover", 
    description: "Animal companion enthusiast",
    icon: "🐕",
    gradient: "bg-gradient-to-br from-gradient-pink to-gradient-orange" 
  },
  { 
    id: "non-smoker", 
    label: "Non-Smoker", 
    description: "Smoke-free lifestyle",
    icon: "🚭",
    gradient: "bg-gradient-to-br from-gradient-secondary to-gradient-blue" 
  },
  { 
    id: "vegetarian", 
    label: "Vegetarian", 
    description: "Plant-based lifestyle",
    icon: "🥗",
    gradient: "bg-gradient-to-br from-accent to-gradient-secondary" 
  },
  { 
    id: "tech-savvy", 
    label: "Tech Savvy", 
    description: "Technology enthusiast",
    icon: "💻",
    gradient: "bg-gradient-to-br from-secondary to-primary" 
  },
  { 
    id: "music-lover", 
    label: "Music Lover", 
    description: "Passionate about music",
    icon: "🎵",
    gradient: "bg-gradient-to-br from-gradient-purple to-gradient-pink" 
  },
  { 
    id: "clean-freak", 
    label: "Cleanliness Focused", 
    description: "Organized and tidy",
    icon: "✨",
    gradient: "bg-gradient-to-br from-gradient-blue to-accent" 
  },
];

const RegistrationForm = ({ type, title, description, backPath }: RegistrationFormProps) => {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const propertyFileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm({
    resolver: zodResolver(type === "need-roommate" ? needRoommateSchema : 
                        type === "wants-roommate" ? wantsRoommateSchema : 
                        type === "rentals" ? rentalsSchema : baseFormSchema),
    defaultValues: type === "need-roommate" ? {
      fullName: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      location: "",
      currentLiving: "",
      propertyType: "",
      rentBudget: "",
      availableFrom: "",
      roomDescription: "",
      roommatePreference: "",
      customRoommatePreference: "",
      furnishingStatus: "",
      depositAmount: "",
    } : type === "wants-roommate" ? {
      fullName: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      location: "",
      budget: "",
      preferredArea: "",
      moveInDate: "",
      occupation: "",
      aboutMe: "",
      roommateGenderPreference: "",
      customGenderPreference: "",
      workSchedule: "",
      smokingPreference: "",
      customSmokingPreference: "",
    } : type === "rentals" ? {
      fullName: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      location: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      rentAmount: "",
      propertyAddress: "",
      amenities: "",
      securityDeposit: "",
      availableFrom: "",
      leaseDuration: "",
    } : {
      fullName: "",
      email: "",
      age: "",
      gender: "",
      phone: "",
      location: "",
    }
  });

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setPropertyImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePropertyImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  // -------- submit -> POST to backend ----------
const apiBase = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

const onSubmit = async (values: any) => {
  const payload: any = {
    name: values.fullName || "",
    email: values.email || "",
    phone: values.phone || "",
    age: values.age ? Number(values.age) : undefined,
    gender: values.gender || undefined,
    location: values.location || undefined,
    currentLiving: values.currentLiving,
    propertyType: values.propertyType,
    rentBudget: values.rentBudget,
    availableFrom: values.availableFrom,
    roomDescription: values.roomDescription || values.aboutMe || "",
    roommatePreference: values.roommatePreference || values.roommateGenderPreference || undefined,
    customRoommatePreference: values.customRoommatePreference || values.customGenderPreference,
    furnishingStatus: values.furnishingStatus,
    depositAmount: values.depositAmount || values.securityDeposit,
    bedrooms: values.bedrooms,
    bathrooms: values.bathrooms,
    rentAmount: values.rentAmount,
    propertyAddress: values.propertyAddress,
    leaseDuration: values.leaseDuration,
    preferences: selectedPreferences,
    profileImage,
    propertyImages,
    type
  };

  Object.keys(payload).forEach((k) => { if (payload[k] === undefined) delete payload[k]; });

  // <-- THIS IS THE CRITICAL LINE: selects correct endpoint based on form `type`
  const endpoint =
    type === "need-roommate" ? "/needroommates" :
    type === "wants-roommate" ? "/wantsroommates" :
    type === "rentals" ? "/rentals" :
    "/needroommates";

  try {
    console.log("Posting to", apiBase + endpoint, "payload:", payload);

    const res = await fetch(`${apiBase}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let jsonBody: any = null;
    try { jsonBody = text ? JSON.parse(text) : null; } catch (e) { /* ignore */ }

    if (!res.ok) {
      const msg = jsonBody?.error || jsonBody?.message || `Server responded ${res.status}`;
      console.error("Server error response:", jsonBody || text);
      throw new Error(msg);
    }

    console.log("Saved listing:", jsonBody);
    navigate(`/thank-you?type=${type}`);
  } catch (err: any) {
    console.error("Submit failed:", err);
    alert("Failed to submit registration: " + (err?.message || err));
  }
};



  const renderCategorySpecificFields = () => {
    if (type === "need-roommate") {
      return (
        <>
          <FormField
            control={form.control}
            name="currentLiving"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Current Living Situation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select living situation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="shared-housing">Shared Housing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1bhk">1 BHK</SelectItem>
                    <SelectItem value="2bhk">2 BHK</SelectItem>
                    <SelectItem value="3bhk">3 BHK</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Rent Budget (per month)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹15,000" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Available From</FormLabel>
                <FormControl>
                  <Input type="date" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roommatePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Roommate Gender Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male Only</SelectItem>
                    <SelectItem value="female">Female Only</SelectItem>
                    <SelectItem value="any">No Preference</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("roommatePreference") === "other" && (
            <FormField
              control={form.control}
              name="customRoommatePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Specify Your Preference</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your custom preference" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="furnishingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Furnishing Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depositAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Security Deposit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹30,000" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomDescription"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel className="text-base font-medium">Room Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the room and living space..." 
                    className="min-h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (type === "wants-roommate") {
      return (
        <>
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Budget Range (per month)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹10,000 - ₹15,000" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Preferred Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Koramangala, Indiranagar" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moveInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Preferred Move-in Date</FormLabel>
                <FormControl>
                  <Input type="date" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Occupation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="working-professional">Working Professional</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roommateGenderPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Roommate Gender Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male Only</SelectItem>
                    <SelectItem value="female">Female Only</SelectItem>
                    <SelectItem value="any">No Preference</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workSchedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Work Schedule</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="regular">Regular (9-5)</SelectItem>
                    <SelectItem value="flexible">Flexible Hours</SelectItem>
                    <SelectItem value="night-shift">Night Shift</SelectItem>
                    <SelectItem value="weekend">Weekend Work</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("roommateGenderPreference") === "other" && (
            <FormField
              control={form.control}
              name="customGenderPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Specify Gender Preference</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your custom preference" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="smokingPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Smoking Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="non-smoker">Non-Smoker Only</SelectItem>
                    <SelectItem value="smoker-ok">Smoker OK</SelectItem>
                    <SelectItem value="outdoor-only">Outdoor Smoking Only</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel className="text-base font-medium">About Me</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself, your lifestyle, and what you're looking for in a roommate..." 
                    className="min-h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (type === "rentals") {
      return (
        <>
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="pg">PG/Hostel</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Bedrooms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Number of bedrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Bathrooms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Number of bathrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Bathroom</SelectItem>
                    <SelectItem value="2">2 Bathrooms</SelectItem>
                    <SelectItem value="3">3 Bathrooms</SelectItem>
                    <SelectItem value="4">4+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Rent Amount (per month)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹25,000" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyAddress"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-base font-medium">Property Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter complete property address" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="securityDeposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Security Deposit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹50,000" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Available From</FormLabel>
                <FormControl>
                  <Input type="date" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leaseDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Lease Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel className="text-base font-medium">Amenities (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List amenities like parking, gym, swimming pool, etc..." 
                    className="min-h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate(backPath)}
          className="mb-8 hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            {/* Personal Information Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-semibold">Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Profile Image Upload */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div 
                        className={`w-32 h-32 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 ${profileImage ? 'border-primary bg-primary/10' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {profileImage ? (
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                            <span className="text-sm text-muted-foreground">Add Photo</span>
                            <span className="text-xs text-muted-foreground block">(Optional)</span>
                          </div>
                        )}
                      </div>
                      
                      {profileImage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProfileImage(null);
                          }}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" type="email" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your age" type="number" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your city/area" className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Specific Fields */}
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-semibold">
                    {type === "need-roommate" ? "Property Details" : 
                     type === "wants-roommate" ? "Your Requirements" : 
                     "Property Information"}
                  </CardTitle>
                  <CardDescription>
                    {type === "need-roommate" ? "Tell us about your property and what you're offering" : 
                     type === "wants-roommate" ? "Let us know what you're looking for" : 
                     "Provide details about your rental property"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderCategorySpecificFields()}
                  </div>

                  {/* Property Images Section - Only for need-roommate and rentals */}
                  {(type === "need-roommate" || type === "rentals") && (
                    <div className="mt-12 space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Property Images (Optional)</h3>
                        <p className="text-muted-foreground">Add photos to showcase your property</p>
                      </div>

                      {/* Upload Button */}
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => propertyFileInputRef.current?.click()}
                          className="h-24 w-48 border-dashed border-2 border-primary/30 hover:border-primary/60 transition-colors"
                        >
                          <div className="text-center">
                            <ImagePlus className="h-8 w-8 text-primary mx-auto mb-2" />
                            <span className="text-sm font-medium">Add Property Photos</span>
                          </div>
                        </Button>
                        <input
                          ref={propertyFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePropertyImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Property Images Grid */}
                      {propertyImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {propertyImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Property ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removePropertyImage(index)}
                                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preferences Section */}
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Choose Your Lifestyle
                </h2>
                <p className="text-xl text-muted-foreground">Select preferences that match your personality</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {preferences.map((preference, index) => (
                  <div
                    key={preference.id}
                    className="animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => togglePreference(preference.id)}
                  >
                    <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden border-2 ${
                      selectedPreferences.includes(preference.id)
                        ? "ring-2 ring-primary border-primary shadow-xl scale-105 bg-primary/5"
                        : "hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${preference.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}></div>
                      
                      <CardContent className="p-8 text-center space-y-4 relative z-10">
                        <div className="text-5xl mb-4">{preference.icon}</div>
                        <h4 className="text-xl font-bold">{preference.label}</h4>
                        <p className="text-muted-foreground">{preference.description}</p>
                        
                        {selectedPreferences.includes(preference.id) && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-primary text-primary-foreground rounded-full p-2 animate-scale-in shadow-lg">
                              <Check className="h-5 w-5" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {selectedPreferences.length > 0 && (
                <div className="text-center mt-12 animate-fade-in">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 inline-block">
                    <p className="text-primary font-bold text-lg">
                      ✨ {selectedPreferences.length} lifestyle preference{selectedPreferences.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Section */}
            <div className="text-center pt-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button type="submit" size="lg" className="px-12 py-4 text-lg font-semibold">
                  Complete Registration
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onClick={() => navigate(backPath)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationForm;