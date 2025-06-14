import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { Protocol } from "pmtiles";
import { layers, namedFlavor } from "@protomaps/basemaps";

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize PMTiles protocol
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapRef.current,
      center: [-78.7224957, 35.7836484], // initial center
      zoom: 12,
      style: {
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
        sources: {
          protomaps: {
            type: "vector",
            url: "pmtiles://https://demo-bucket.protomaps.com/v4.pmtiles",
            attribution:
              '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
          },
        },
        layers: layers("protomaps", namedFlavor("light"), { lang: "en" }),
      },
    });

    map.on("load", async () => {
      try {
        const response = await fetch("src/coords.json");
        console.log(response);
        const coordsData = await response.json();

        const geojson = {
          type: "FeatureCollection",
          features: coordsData.map(({ ratingId, lat, lng }) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            properties: {
              title: ratingId,
            },
          })),
        };

        map.addSource("marker-source", {
          type: "geojson",
          data: geojson,
        });

        map.addLayer({
          id: "marker-layer",
          type: "circle",
          source: "marker-source",
          paint: {
            "circle-radius": 8,
            "circle-color": "#FF5722",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Fit map to bounding box of all coordinates
        const lats = coordsData.map((d) => d.lat);
        const lngs = coordsData.map((d) => d.lng);

        if (lats.length && lngs.length) {
          const bounds = [
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ];
          // map.fitBounds(bounds, {
          //   padding: 40,
          //   duration: 1000,
          // });
        }
      } catch (err) {
        console.error("Error loading coords.json:", err);
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} className="bodyMap" />;
}
