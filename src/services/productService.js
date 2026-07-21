import { CONFIG } from '../config';
import { localProducts } from '../products';

/**
 * Parses a CSV string into an array of product objects, respecting quoted values.
 */
function parseCSV(csvText) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"'; // Escaped quote
        i++;
      } else {
        inQuotes = !inQuotes; // Toggle quotes
      }
    } else if (char === ',' && !inQuotes) {
      row.push(""); // Next column
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n after \r
      }
      lines.push(row);
      row = [""]; // Next row
    } else {
      row[row.length - 1] += char;
    }
  }
  
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  if (lines.length < 2) return [];

  // Exclude header row
  const headers = lines[0].map(h => h.trim().toLowerCase());
  const products = [];

  for (let idx = 1; idx < lines.length; idx++) {
    const columns = lines[idx];
    if (columns.length < headers.length) continue; // Skip malformed rows
    
    const item = {};
    headers.forEach((header, colIdx) => {
      const val = columns[colIdx] ? columns[colIdx].trim() : "";
      
      if (header === 'id' || header === 'name' || header === 'category' || header === 'priceguidance' || header === 'spicelevel' || header === 'description' || header === 'origin' || header === 'imagename') {
        // Simple strings
        const mappedHeader = header === 'priceguidance' ? 'priceGuidance' : header === 'spicelevel' ? 'spiceLevel' : header === 'imagename' ? 'imageName' : header;
        item[mappedHeader] = val === "" ? null : val;
      } else if (header === 'packagingoptions' || header === 'benefits' || header === 'recipes') {
        // Arrays separated by semicolon (e.g. "Option A; Option B")
        const mappedHeader = header === 'packagingoptions' ? 'packagingOptions' : header;
        item[mappedHeader] = val ? val.split(';').map(x => x.trim()).filter(Boolean) : [];
      } else if (header === 'specifications') {
        // Key-value pairs separated by semicolon and colon (e.g. "Purity: 100%; Extraction: Cold Pressed")
        const specs = {};
        if (val) {
          val.split(';').forEach(pair => {
            const splitPair = pair.split(':');
            if (splitPair.length >= 2) {
              const k = splitPair[0].trim();
              const v = splitPair.slice(1).join(':').trim();
              specs[k] = v;
            }
          });
        }
        item.specifications = specs;
      }
    });

    if (item.id && item.name) {
      products.push(item);
    }
  }

  return products;
}

/**
 * Fetches the product list. Returns Google Sheet data if configured,
 * falling back to local dataset upon errors or if sheets config is disabled.
 */
export async function getProducts() {
  if (!CONFIG.USE_GOOGLE_SHEETS) {
    return localProducts;
  }

  const sheetId = CONFIG.GOOGLE_SHEET_ID;
  const gid = CONFIG.GOOGLE_SHEET_GID;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/pub?output=csv&gid=${gid}`;

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheet. Status: ${response.status}`);
    }
    const csvText = await response.text();
    const parsedProducts = parseCSV(csvText);
    
    if (parsedProducts.length === 0) {
      throw new Error("No valid products parsed from Google Sheet.");
    }
    return parsedProducts;
  } catch (error) {
    console.warn("Google Sheet catalog fetch failed. Falling back to local catalog.", error);
    return localProducts;
  }
}
