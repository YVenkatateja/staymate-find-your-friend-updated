import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase, User, Phone, Mail, Heart, Star, Clock, Sparkles, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * IMPORTANT:
 * - Set ENDPOINT to whatever your backend exposes for 'wants to be roommate' listings.
 *   Example: "/wantsroommates" or "/wants-to-be-roommate" — update if different.
 */
const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";
const ENDPOINT = "/wantsroommates"; // <-- change here if your backend uses a different path
const PER_PAGE = 9; // 3 columns x 3 rows per page

function dedupeByKey(arr: any[], key = "_id") {
  const seen = new Set<string>();
  return arr.filter(item => {
    const id = item[key] || item.email || JSON.stringify(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

// debounce helper
function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function ViewWantsRoommate() {
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [preferences, setPreferences] = useState<string>(""); // comma-separated

  // modal
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    console.log("DEBUG FRONTEND: ViewWantsRoommate API =", API, "ENDPOINT =", ENDPOINT);
  }, []);

  // fetch function
  const fetchPage = async (p = 1, opts: { q?: string; location?: string; propertyType?: string; preferences?: string } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(p));
      params.set("limit", String(PER_PAGE));
      if (opts.q) params.set("q", opts.q);
      if (opts.location) params.set("location", opts.location);
      if (opts.propertyType) params.set("propertyType", opts.propertyType);
      if (opts.preferences) params.set("preferences", opts.preferences);

      const url = `${API}${ENDPOINT}?${params.toString()}`;
      console.log("DEBUG: fetching", url);
      const res = await fetch(url);
      if (!res.ok) {
        // If backend returns HTML (your frontend index), you'll see ok=true but content-type html.
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("text/html")) {
          throw new Error("Server returned HTML — endpoint might be missing or URL/path incorrect.");
        }
        throw new Error(`Server responded ${res.status}`);
      }
      const json = await res.json();
      // backend should return { items, total, page, limit, totalPages }
      const fetched = Array.isArray(json.items) ? json.items : [];
      const deduped = dedupeByKey(fetched, "_id");
      setItems(deduped);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
      setPage(json.page || p);
    } catch (err: any) {
      console.error("Fetch error (ViewWantsRoommate):", err);
      setError(err?.message || "Failed to load listings");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // debounced wrapper for search/filter UI
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useMemo(() => debounce((p: number, qS: string, loc: string, pt: string, prefs: string) => {
    fetchPage(p, { q: qS, location: loc, propertyType: pt, preferences: prefs });
  }, 250), []);

  // when filters change, reset to page 1 and fetch
  useEffect(() => {
    debouncedFetch(1, q.trim(), location.trim(), propertyType.trim(), preferences.trim());
    // also update state page to 1 immediately
    setPage(1);
  }, [q, location, propertyType, preferences, debouncedFetch]);

  // initial load
  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatarFallback = (
    <div className="w-28 h-28 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl text-gray-500">
      👤
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/find-companions")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-semibold">People Who Want To Be Roommates</h1>
          </div>

          <div className="flex gap-2 items-center">
            <input
              aria-label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, location, description..."
              className="px-3 py-2 border rounded-md w-64"
            />
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="">All locations</option>
              <option value="City Center">City Center</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Tech District">Tech District</option>
            </select>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="px-3 py-2 border rounded-md">
              <option value="">All types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="PG">PG</option>
            </select>
            <input
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="preferences (comma separated)"
              className="px-3 py-2 border rounded-md w-48"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> — <strong>{total}</strong> total
        </div>

        {loading && <div className="text-center p-8">Loading…</div>}
        {error && <div className="text-center p-4 text-red-600">Error: {error}</div>}
        {!loading && !error && items.length === 0 && <div className="text-center p-8">No listings found.</div>}

        {/* grid 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((profile: any) => (
            <Card
              key={profile._id || profile.email || JSON.stringify(profile)}
              className="p-4 hover:shadow-2xl transition cursor-pointer"
              onClick={() => setSelected(profile)}
            >
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{profile.profileImage ? <img src={profile.profileImage} className="w-28 h-28 rounded-2xl object-cover" /> : avatarFallback}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{profile.name || profile.fullName || "Unnamed"}</h3>
                      {profile.isOwn && <Badge>Owner</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {profile.location || "—"} • {profile.budget || profile.rentBudget || "—"}
                    </div>

                    {/* hover reveal - small summary */}
                    <div className="mt-3 text-sm text-gray-700 line-clamp-3">
                      {profile.roomDescription || profile.about || "No description provided."}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {(profile.preferences || []).slice(0,3).map((p: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">{String(p).replace('-', ' ')}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelected(profile); }}>View</Button>
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(profile.email || profile.phone || ""); }}>
                      Copy Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* pagination controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => fetchPage(Math.max(1, page - 1), { q, location, propertyType, preferences })} disabled={page <= 1 || loading}>Prev</Button>
          <div className="px-4 text-sm text-muted-foreground">Page {page} / {totalPages}</div>
          <Button variant="outline" onClick={() => fetchPage(Math.min(totalPages, page + 1), { q, location, propertyType, preferences })} disabled={page >= totalPages || loading}>Next</Button>
        </div>

        {/* modal full profile */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-card p-6 rounded-xl max-w-3xl w-full overflow-auto">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold">{selected.name || selected.fullName}</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => { navigator.clipboard.writeText(selected.email || selected.phone || ""); }}>Copy Contact</Button>
                  <Button onClick={() => setSelected(null)}>Close</Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 flex items-center justify-center">
                  {selected.profileImage ? <img src={selected.profileImage} className="w-48 h-48 rounded-2xl object-cover" /> : avatarFallback}
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div className="flex gap-4 flex-wrap">
                    <div><strong>Location:</strong> {selected.location || "-"}</div>
                    <div><strong>Budget:</strong> {selected.budget || selected.rentBudget || "-"}</div>
                    <div><strong>Property Type:</strong> {selected.propertyType || "-"}</div>
                  </div>

                  <div>
                    <h4 className="font-medium">About</h4>
                    <p className="text-muted-foreground">{selected.roomDescription || selected.about || "-"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium">Preferences</h4>
                    <p className="text-muted-foreground">{(selected.preferences || []).join(", ") || "-"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium">Amenities (if any)</h4>
                    <p className="text-muted-foreground">{(selected.amenities || []).join(", ") || "-"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Phone:</strong> {selected.phone || "-"}</div>
                    <div><strong>Email:</strong> {selected.email || "-"}</div>
                    <div><strong>Age / Gender:</strong> {(selected.age ? selected.age + " / " : "") + (selected.gender || "-")}</div>
                    <div><strong>Move-in:</strong> {selected.moveInDate || "-"}</div>
                  </div>

                  {/* show uploaded photos */}
                  {selected.propertyImages && selected.propertyImages.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium">Photos</h4>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {selected.propertyImages.map((p: string, i: number) => <img key={i} src={p} className="w-full h-24 object-cover rounded" />)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-muted-foreground">Showing live data from the server. If no listings appear, ensure backend exposes <code>{ENDPOINT}</code> and returns JSON {`{ items, total, page, limit, totalPages }`}</div>
      </main>
    </div>
  );
}
