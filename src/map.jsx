import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { Protocol } from "pmtiles";
import { layers, namedFlavor } from "@protomaps/basemaps";

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the PMTiles protocol
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapRef.current,
      center: [-78.7224957, 35.7836484],
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

    map.on("load", () => {
      map.addSource("marker-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-78.7224957, 35.7836484],
              },
              properties: {
                title: "My Marker",
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "marker-layer",
        type: "circle",
        source: "marker-source",
        // layout: {
        //   "icon-image": "custom-marker",
        //   "icon-size": 0.5,
        //   "text-field": "{title}",
        //   "text-offset": [0, 1.25],
        //   "text-anchor": "top",
        // },
        paint: {
          "circle-radius": 8,
          "circle-color": "#FF5722",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} className="bodyMap" />;
}
