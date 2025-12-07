// frontend/src/pages/NeedRoommateDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

export default function NeedRoommateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/needroommates/${id}`);
        if (!res.ok) throw new Error(`Server ${res.status}`);
        const json = await res.json(); // { item: doc }
        setItem(json.item || json);
      } catch (err: any) {
        console.error("Detail fetch error", err);
        setError(err?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen"><Header /><div className="container mx-auto p-8 text-center">Loading…</div></div>;
  if (error) return <div className="min-h-screen"><Header /><div className="container mx-auto p-8 text-center text-red-600">{error}</div></div>;
  if (!item) return <div className="min-h-screen"><Header /><div className="container mx-auto p-8 text-center">Not found</div></div>;

  const resolveImg = (img?: string) => {
    if (!img) return `${API}/assets/default-avatar.svg`;
    return img.startsWith("/") ? `${API}${img}` : img;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">← Back</Button>

        <Card className="p-6">
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <img src={resolveImg(item.profileImage || (item.propertyImages && item.propertyImages[0]))} alt="profile" className="w-full h-64 object-cover rounded-lg" />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {(item.propertyImages || []).map((img: string, i: number) => (
                    <img key={i} src={resolveImg(img)} className="h-20 w-full object-cover rounded" alt={`img-${i}`} />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <div className="text-sm text-muted-foreground mt-2">
                  {item.location} {item.gender ? `• ${item.gender}` : ""} {item.age ? `• ${item.age}` : ""}
                </div>

                <div className="mt-4 space-y-3">
                  {item.roomDescription && (<div>
                    <h4 className="font-medium">About the room</h4>
                    <p className="text-muted-foreground">{item.roomDescription}</p>
                  </div>)}

                  <div>
                    <h4 className="font-medium">Contact</h4>
                    <p>Email: {item.email || "—"}</p>
                    <p>Phone: {item.phone || "—"}</p>
                  </div>

                  {item.preferences && item.preferences.length > 0 && (
                    <div>
                      <h4 className="font-medium">Preferences</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.preferences.map((p: string, idx: number) => <span key={idx} className="px-2 py-1 bg-muted rounded text-sm">{p}</span>)}
                      </div>
                    </div>
                  )}

                  {item.amenities && item.amenities.length > 0 && (
                    <div>
                      <h4 className="font-medium">Amenities</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.amenities.map((a: string, idx: number) => <span key={idx} className="px-2 py-1 border rounded text-sm">{a}</span>)}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    <Button>Contact {String(item.name || "Owner").split(" ")[0]}</Button>
                    <Button variant="outline">Save</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
