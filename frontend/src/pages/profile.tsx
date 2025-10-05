import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, Calendar, MapPin, Phone, Edit, Shield, BookOpen, Plus } from "lucide-react";
import Header from "@/components/Header";

interface User {
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  location: string;
  phone: string;
  role: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Extract name from email (everything before @)
      const emailName = payload.email ? payload.email.split('@')[0] : 'User';
      const formattedName = emailName.split('.').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      setUser({
        name: formattedName,
        email: payload.email || "",
        avatar: payload.avatar || "",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        location: "", // Empty as requested
        phone: "", // Empty as requested
        role: "Free", // Changed to "Free" as requested
        bio: "Welcome to your profile! Update your information to personalize your experience.",
        stats: {
          posts: 0,
          followers: 0,
          following: 0
        }
      });
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute -bottom-16 left-8">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 max-w-2xl">{user.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    {user.location ? (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.location}
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-6 text-gray-500">
                        <Plus className="h-3 w-3" />
                        <MapPin className="h-3 w-3" />
                        Add Location
                      </Button>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {user.joinDate}
                    </div>
                    {user.phone ? (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 h-6 text-gray-500">
                        <Plus className="h-3 w-3" />
                        <Phone className="h-3 w-3" />
                        Add Phone
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.posts}</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Full Name</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">
                        {user.phone || (
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Phone
                          </Button>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium">
                        {user.location || (
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Location
                          </Button>
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                    <CardDescription>Your current account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Member Since</span>
                      <Badge variant="secondary">{user.joinDate}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Account Type</span>
                      <Badge className="bg-gray-100 text-gray-700">Free</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Email Verification</span>
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Account Status</span>
                      <Badge className="bg-blue-100 text-blue-700">New</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Settings className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                    <p className="mb-4">Start exploring the platform to see your activity here</p>
                    <Button>Get Started</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">Update your password regularly</div>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security</div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-100">
                    <div>
                      <div className="font-medium">Login Sessions</div>
                      <div className="text-sm text-gray-500">Manage your active sessions</div>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;