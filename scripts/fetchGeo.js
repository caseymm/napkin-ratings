import fs from "fs";
import fetch from "node-fetch";

const data = JSON.parse(fs.readFileSync("src/ratings.json", "utf-8"));

function extractLatLngFromString(str) {
  const match = str.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
}

async function resolveRedirectAndFetchCoords(name, url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    // Step 1: Try extracting from final URL after redirects
    const finalUrl = response.url;
    let coords = extractLatLngFromString(finalUrl);

    // Step 2: Fallback to HTML if not in URL
    if (!coords) {
      const html = await response.text();
      coords = extractLatLngFromString(html);
    }

    if (!coords) {
      console.warn(`No coordinates found for: ${name}`);
    }

    return coords;
  } catch (err) {
    console.error(`Error fetching ${name}:`, err.message);
    return null;
  }
}

async function main() {
  const results = [];

  for (const { id, location } of data) {
    console.log(`Processing: ${id}`);
    const coords = await resolveRedirectAndFetchCoords(id, location);
    if (coords) {
      results.push({ id, ...coords });
    }
  }

  fs.writeFileSync("src/coords.json", JSON.stringify(results, null, 2));
  console.log("✅ Done! Results saved to coords.json");
}

main();
