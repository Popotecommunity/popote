"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Address } from "@/lib/database.types";

function makePinIcon(emoji: string | null) {
  return L.divIcon({
    className: "popote-pin",
    html: `
      <div style="
        width: 36px; height: 36px;
        background: linear-gradient(160deg, #c1502e, #a33f22);
        border: 2.5px solid #f7f2e9;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 3px 8px rgba(44,43,38,0.35);
      "></div>
      <div style="
        position: absolute; top: 0; left: 0;
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; line-height: 1;
      ">${emoji ?? "🥕"}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34],
  });
}

export default function AddressMap({
  addresses,
  center,
}: {
  addresses: Address[];
  center: [number, number];
}) {
  const located = addresses.filter(
    (a): a is Address & { lat: number; lng: number } => a.lat != null && a.lng != null,
  );

  return (
    <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-line shadow-sm">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#f7f2e9" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />
        {located.map((address) => (
          <Marker
            key={address.id}
            position={[address.lat, address.lng]}
            icon={makePinIcon(address.category?.icone ?? null)}
          >
            <Popup className="popote-popup" minWidth={200}>
              <p className="font-serif text-base text-ink">{address.nom}</p>
              <p className="text-xs text-ink/60 mt-0.5">
                {address.category?.nom}
                {address.quartier ? ` · ${address.quartier}` : ""}
              </p>
              {address.adresse && <p className="text-xs text-ink/70 mt-2">{address.adresse}</p>}
              {address.criteria && address.criteria.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {address.criteria.slice(0, 3).map((c) => (
                    <span
                      key={c.id}
                      className="text-[10px] font-medium rounded-full bg-olive/10 text-olive px-2 py-0.5"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
