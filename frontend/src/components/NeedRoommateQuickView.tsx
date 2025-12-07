// frontend/src/components/NeedRoommateQuickView.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

function resolveImage(img?: string) {
  if (!img) return "/assets/default-avatar.svg";
  if (img.startsWith("/")) return `${API}${img}`;
  return img;
}

type Props = {
  item: any | null;
  onClose: () => void;
  onOpenFull?: () => void;
};

export default function NeedRoommateQuickView({ item, onClose, onOpenFull }: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative max-w-4xl w-full mx-auto bg-card rounded-lg shadow-xl overflow-auto">
        <div className="p-4 flex items-start gap-4">
          <img
            src={resolveImage(item.profileImage || (item.propertyImages && item.propertyImages[0]))}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{item.name || item.fullName || "Unnamed"}</h3>
                <div className="text-sm text-muted-foreground">
                  {item.location || "—"} {item.gender ? `• ${item.gender}` : ""} {item.age ? `• ${item.age}` : ""}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-2">
                <Button onClick={onClose} variant="ghost" className="w-full">Close</Button>
                {onOpenFull && (
                  <Button onClick={onOpenFull} className="w-full">Open full profile</Button>
                )}
              </div>
            </div>

            <div className="mt-3 text-gray-700">
              {item.roomDescription ? item.roomDescription : "No description provided."}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {item.rentBudget && <div><strong>Rent:</strong> {item.rentBudget}</div>}
              {item.propertyType && <div><strong>Type:</strong> {item.propertyType}</div>}
              {item.depositAmount && <div><strong>Deposit:</strong> {item.depositAmount}</div>}
              {item.roommatePreference && <div><strong>Prefers:</strong> {item.roommatePreference}</div>}
            </div>

            {item.preferences?.length > 0 && (
              <div className="mt-4">
                <strong>Preferences:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.preferences.map((p: string, i: number) => <span key={i} className="px-2 py-1 bg-muted/30 rounded text-xs">{p}</span>)}
                </div>
              </div>
            )}

            {item.amenities?.length > 0 && (
              <div className="mt-3">
                <strong>Amenities:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.amenities.map((a: string, i: number) => <span key={i} className="px-2 py-1 bg-muted/30 rounded text-xs">{a}</span>)}
                </div>
              </div>
            )}

            <div className="mt-4">
              <strong>Contact:</strong>
              <div className="text-sm mt-1">
                <div>Email: {item.email || "—"}</div>
                <div>Phone: {item.phone || "—"}</div>
              </div>
            </div>

            <div className="mt-4">
              <strong>Photos</strong>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {item.propertyImages && item.propertyImages.length > 0 ? (
                  item.propertyImages.map((img: string, idx: number) => (
                    <img key={idx} src={resolveImage(img)} className="w-full h-28 object-cover rounded" />
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No photos uploaded.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
