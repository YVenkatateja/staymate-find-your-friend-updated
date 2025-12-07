// frontend/src/pages/ViewWantsRoommate.tsx
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { User, MapPin, DollarSign, Star } from "lucide-react";

const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";
const DEFAULT_AVATAR = "/placeholder.svg"; // adjust if different

export default function ViewWantsRoommate() {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [q, setQ] = useState<string>("");

  // === NEW resilient fetchPage (replace completely) ===
async function fetchPage(p = 1, query = "") {
  setLoading(true);
  setError(null);
  try {
    const params = new URLSearchParams();
    params.set("page", String(p));
    params.set("limit", String(limit || 9));
    if (query) params.set("q", query);

    const url = `${API}/needroommates?${params.toString()}`;
    console.log("DEBUG: fetching", url);

    const res = await fetch(url);
    const ct = res.headers.get("content-type") || "";

    // If backend returns HTML → wrong endpoint
    if (ct.includes("text/html")) {
      const txt = await res.text();
      console.error("HTML returned — wrong endpoint:", url);
      console.error("Snippet:", txt.slice(0, 300));
      throw new Error("Backend returned HTML. Endpoint is incorrect.");
    }

    const json = await res.json();
    console.log("DEBUG: raw response JSON:", json);

    // Allow multiple backend response formats
    let rawItems: any[] = [];
    if (Array.isArray(json)) rawItems = json;
    else if (Array.isArray(json.items)) rawItems = json.items;
    else if (Array.isArray(json.data)) rawItems = json.data;
    else {
      const arr = Object.values(json).find(v => Array.isArray(v));
      rawItems = arr || [];
    }

    const normalized = rawItems.map((it: any) => ({
      _id: it._id || it.id || null,
      name: it.name || it.fullName || "",
      email: it.email || "",
      phone: it.phone || "",
      profileImage: it.profileImage || (Array.isArray(it.propertyImages) && it.propertyImages[0]) || null,
      propertyImages: Array.isArray(it.propertyImages) ? it.propertyImages : [],
      location: it.location || "",
      rentBudget: it.rentBudget || it.budget || "",
      roomDescription: it.roomDescription || it.about || "",
      preferences: Array.isArray(it.preferences) ? it.preferences : [],
      __raw: it,
    }));

    setItems(normalized);
    setPage(json.page || p);
    setTotalPages(json.totalPages || 1);

  } catch (err: any) {
    console.error("fetch error", err);
    setError(err?.message || "Failed to load");
    setItems([]);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => { fetchPage(1); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate("/find-companions")}>← Back</Button>
            <h1 className="text-3xl font-bold mt-2">People Who Want To Be Roommates</h1>
            <div className="text-sm text-muted-foreground">Showing page {page} of {totalPages}</div>
          </div>

          <div className="flex gap-2 items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") fetchPage(1, q); }}
              placeholder="Search (name, location, keywords)"
              className="px-3 py-2 border rounded-md"
            />
            <Button onClick={() => fetchPage(1, q)}>Search</Button>
            <Button variant="outline" onClick={() => { setQ(""); fetchPage(1, ""); }}>Clear</Button>
          </div>
        </div>

        {loading && <div className="text-center p-6">Loading…</div>}
        {error && <div className="text-center p-6 text-red-600">Error: {error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it: any) => (
            <Card key={it._id} className="cursor-pointer hover:shadow-2xl transition-all" onClick={() => setSelected(it)}>
              <CardContent className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border">
                  <img src={it.profileImage || (it.propertyImages && it.propertyImages[0]) || DEFAULT_AVATAR}
                       alt={it.name || it.fullName}
                       className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{it.name || it.fullName || "Unnamed"}</h3>
                    {it.isOwn && <Badge variant="secondary">Your profile</Badge>}
                  </div>

                  <div className="text-sm text-muted-foreground mt-1">
                    <MapPin className="inline-block mr-1 -mt-1" /> {it.location || "—"}
                  </div>

                  <div className="mt-2 flex gap-2 text-sm">
                    <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                      <DollarSign className="h-4 w-4" /> {it.rentBudget || "Budget N/A"}
                    </div>
                    {it.preferences && it.preferences.slice(0,2).map((p: string, idx: number) => (
                      <div key={idx} className="px-2 py-1 bg-muted rounded-md text-xs">{p}</div>
                    ))}
                  </div>

                  <p className="mt-3 text-sm line-clamp-3 text-muted-foreground">{it.roomDescription || it.about || ""}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelected(it); }}>View profile</Button>
                    <Button variant="outline" size="sm" onClick={(e)=>{ e.stopPropagation(); /* TODO: message */ }}>Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* pagination */}
        <div className="flex gap-4 justify-center items-center mt-8">
          <Button onClick={() => fetchPage(Math.max(1, page-1), q)} disabled={page<=1}>Prev</Button>
          <div className="text-sm text-muted-foreground">Page {page} / {totalPages}</div>
          <Button onClick={() => fetchPage(Math.min(totalPages, page+1), q)} disabled={page>=totalPages}>Next</Button>
        </div>

        {/* Modal / full profile */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-card w-full max-w-3xl rounded-lg shadow-lg overflow-auto max-h-[90vh]">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border">
                    <img src={selected.profileImage || DEFAULT_AVATAR} alt={selected.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">{selected.name || selected.fullName}</h2>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" /> {selected.responseRate || "—"}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{selected.location}</div>
                    <div className="mt-4 text-sm">
                      <strong>Budget:</strong> {selected.rentBudget || "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">About</h4>
                    <p className="text-muted-foreground">{selected.roomDescription || selected.about || "—"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Preferences</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(selected.preferences || []).map((p: string, i: number) => (
                        <Badge key={i}>{p}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selected.propertyImages && selected.propertyImages.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selected.propertyImages.map((img: string, idx: number) => (
                        <img key={idx} src={img} className="w-full h-28 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                  <a href={`mailto:${selected.email}`}><Button>Contact</Button></a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
