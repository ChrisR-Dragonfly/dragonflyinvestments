"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { ComposableMap, Geographies, Geography, Marker } = require("react-simple-maps") as any;

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Active investment states (gold, large)
const activeStates: { abbr: string; coords: [number, number] }[] = [
  { abbr: "TX", coords: [-99.9,  31.9] },
  { abbr: "AL", coords: [-86.9,  32.8] },
  { abbr: "IN", coords: [-86.3,  39.8] },
  { abbr: "OH", coords: [-82.9,  40.4] },
  { abbr: "KY", coords: [-84.7,  37.7] },
  { abbr: "WV", coords: [-80.5,  38.9] },
  { abbr: "VA", coords: [-78.2,  37.8] },
  { abbr: "NC", coords: [-79.8,  35.6] },
  { abbr: "SC", coords: [-81.2,  34.0] },
  { abbr: "GA", coords: [-83.6,  32.9] },
  { abbr: "FL", coords: [-81.8,  28.5] },
  { abbr: "PA", coords: [-77.2,  40.8] },
];

// All other contiguous states (gray, small)
const inactiveStates: { abbr: string; coords: [number, number] }[] = [
  { abbr: "WA", coords: [-121.5, 47.4] },
  { abbr: "OR", coords: [-120.5, 43.9] },
  { abbr: "CA", coords: [-119.4, 37.1] },
  { abbr: "NV", coords: [-116.4, 38.8] },
  { abbr: "AZ", coords: [-111.4, 34.3] },
  { abbr: "ID", coords: [-114.7, 44.3] },
  { abbr: "MT", coords: [-109.6, 47.0] },
  { abbr: "WY", coords: [-107.3, 43.0] },
  { abbr: "CO", coords: [-105.5, 39.1] },
  { abbr: "NM", coords: [-106.2, 34.8] },
  { abbr: "UT", coords: [-111.5, 39.3] },
  { abbr: "ND", coords: [-100.5, 47.5] },
  { abbr: "SD", coords: [ -99.4, 44.3] },
  { abbr: "NE", coords: [ -99.9, 41.5] },
  { abbr: "KS", coords: [ -97.5, 38.5] },
  { abbr: "OK", coords: [ -97.5, 35.6] },
  { abbr: "MN", coords: [ -93.6, 45.7] },
  { abbr: "IA", coords: [ -93.5, 42.0] },
  { abbr: "MO", coords: [ -92.3, 38.5] },
  { abbr: "AR", coords: [ -92.4, 34.8] },
  { abbr: "LA", coords: [ -91.9, 30.9] },
  { abbr: "MS", coords: [ -89.7, 32.8] },
  { abbr: "WI", coords: [ -89.6, 44.3] },
  { abbr: "IL", coords: [ -89.5, 40.0] },
  { abbr: "MI", coords: [ -84.5, 44.3] },
  { abbr: "TN", coords: [ -86.7, 35.7] },
  { abbr: "NY", coords: [ -75.5, 42.9] },
  { abbr: "ME", coords: [ -69.4, 45.3] },
  { abbr: "VT", coords: [ -72.7, 44.1] },
  { abbr: "NH", coords: [ -71.6, 43.5] },
  { abbr: "MA", coords: [ -71.5, 42.2] },
  { abbr: "RI", coords: [ -71.5, 41.7] },
  { abbr: "CT", coords: [ -72.7, 41.6] },
  { abbr: "NJ", coords: [ -74.5, 40.2] },
  { abbr: "DE", coords: [ -75.5, 39.0] },
  { abbr: "MD", coords: [ -76.8, 39.1] },
];

export default function FootprintMap() {
  return (
    <div className="rounded overflow-hidden border border-[#dddddd] bg-[#f5f0e8]">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 900 }}
        width={960}
        height={560}
        style={{ width: "100%", height: "auto" }}
      >
        {/* State outlines */}
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e8e3d8"
                stroke="#cec8bc"
                strokeWidth={0.8}
                style={{
                  default: { outline: "none" },
                  hover:   { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Inactive state dots */}
        {inactiveStates.map(({ abbr, coords }) => (
          <Marker key={abbr} coordinates={coords}>
            <circle r={15} fill="#d4cec5" stroke="#c4bdb3" strokeWidth={0.5} />
            <text
              textAnchor="middle"
              dy="0.35em"
              fill="#9e9890"
              fontSize={9}
              fontWeight="600"
              fontFamily="inherit"
            >
              {abbr}
            </text>
          </Marker>
        ))}

        {/* Active state dots */}
        {activeStates.map(({ abbr, coords }) => (
          <Marker key={abbr} coordinates={coords}>
            <circle r={22} fill="#C8961A" stroke="#B8840F" strokeWidth={1} />
            <text
              textAnchor="middle"
              dy="0.35em"
              fill="white"
              fontSize={11}
              fontWeight="700"
              fontFamily="inherit"
            >
              {abbr}
            </text>
          </Marker>
        ))}

        {/* Label */}
        <text
          x={480}
          y={545}
          textAnchor="middle"
          fill="#b0a898"
          fontSize={10}
          fontWeight="600"
          letterSpacing={3}
          fontFamily="inherit"
        >
          DRAGONFLY · ACTIVE STATES
        </text>
      </ComposableMap>
    </div>
  );
}
