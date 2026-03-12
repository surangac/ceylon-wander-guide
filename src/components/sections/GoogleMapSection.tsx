import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { MapPin, Navigation } from "lucide-react";

const CULTURAL_SITES = [
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    description: "Sacred ancient capital with colossal stupas & Bo trees",
    lat: 8.3114,
    lng: 80.4037,
  },
  {
    id: "polonnaruwa",
    name: "Polonnaruwa",
    description: "Medieval capital with iconic rock-cut Buddha statues",
    lat: 7.9403,
    lng: 81.0188,
  },
  {
    id: "dambulla",
    name: "Dambulla",
    description: "Five sacred cave temples with 150+ Buddha statues",
    lat: 7.8675,
    lng: 80.6517,
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    description: "Ancient rock fortress rising 200m above the plains",
    lat: 7.957,
    lng: 80.7603,
  },
];

const MAP_CENTER = { lat: 8.05, lng: 80.7 };

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f0e8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#1a2e4a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f0e8" }] },
  { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#c8dbe8" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6b8fad" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8e0d0" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#ddd4c4" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#ddd4c4" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#eae4d8" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#d4dfc4" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c8bfa8" }] },
];

const containerStyle = { width: "100%", height: "500px" };

const PIN_SVG = (highlighted: boolean) => ({
  path: "M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z",
  fillColor: "#c9860a",
  fillOpacity: 1,
  strokeColor: "#1a2e4a",
  strokeWeight: highlighted ? 2 : 1,
  scale: highlighted ? 1.8 : 1.4,
  anchor: { x: 12, y: 36 } as google.maps.Point,
});

export const GoogleMapSection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleGetDirections = (lat: number, lng: number, name: string) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name + " Sri Lanka")}`,
      "_blank"
    );
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-ceylon-ocean/5 flex items-center justify-center border border-ceylon-ocean/20">
        <div className="flex items-center gap-3 text-ceylon-ocean-deep">
          <MapPin className="w-5 h-5 animate-pulse" />
          <span className="font-display text-lg">Loading map…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-ceylon-gold/30 shadow-large">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={MAP_CENTER}
        zoom={9}
        onLoad={onLoad}
        onClick={() => setActiveMarker(null)}
        options={{
          styles: MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {CULTURAL_SITES.map((site) => (
          <MarkerF
            key={site.id}
            position={{ lat: site.lat, lng: site.lng }}
            icon={PIN_SVG(activeMarker === site.id)}
            onClick={() => setActiveMarker(site.id)}
          >
            {activeMarker === site.id && (
              <InfoWindowF
                position={{ lat: site.lat, lng: site.lng }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", minWidth: 200, padding: 4 }}>
                  <h3
                    style={{
                      color: "#1a2e4a",
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 4,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {site.name}
                  </h3>
                  <p style={{ color: "#555", fontSize: 13, marginBottom: 10, lineHeight: 1.4 }}>
                    {site.description}
                  </p>
                  <button
                    onClick={() => handleGetDirections(site.lat, site.lng, site.name)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "#c9860a",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <Navigation size={14} />
                    Get Directions
                  </button>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};
