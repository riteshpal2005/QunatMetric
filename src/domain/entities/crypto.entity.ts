import { z } from 'zod';

/**
 * 1. Zod Schema Definition
 * We define exactly what a "Crypto Asset" should look like.
 * Zod is a runtime validator, meaning when the API sends us JSON,
 * we can pass it through this schema to ensure the API didn't send us bad data
 * (like sending a string instead of a number for the price).
 */
export const CryptoAssetSchema = z.object({
  id: z.string(),
  symbol: z.string().transform(str => str.toUpperCase()), // Automatically capitalize symbols like 'btc' to 'BTC'
  name: z.string(),
  currentPrice: z.number().positive(), // Ensures price is a positive number
  priceChangePercentage24h: z.number(), // Can be negative or positive
  imageUrl: z.string().url(), // Ensures it's a valid URL format
});

/**
 * 2. TypeScript Type Inference
 * Instead of writing `type CryptoAsset = { id: string, symbol: string ... }` manually,
 * we tell TypeScript to automatically generate the type by looking at our Zod Schema.
 * 
 * If we ever add a new field to the schema above, this type updates automatically!
 */
export type CryptoAsset = z.infer<typeof CryptoAssetSchema>;
