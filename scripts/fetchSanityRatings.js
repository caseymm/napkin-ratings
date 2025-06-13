import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sanityClient from "@sanity/client";

// Define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Sanity client
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2023-06-06",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// GROQ query
const query = `*[_type == "rating"]{
  name,
  location,
  description,
  durability,
  absorbency,
  texture,
  size,
  effectiveness,
  appearance,
  notes,
  date,
  "imageUrl": image.asset->url
}`;

async function fetchAndSave() {
  try {
    const ratings = await client.fetch(query);
    const filePath = path.join(__dirname, "..", "src", "ratings.json");

    // Create data dir if missing
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Save JSON with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(ratings, null, 2));
    console.log("✅ ratings.json updated");
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    process.exit(1);
  }
}

fetchAndSave();
