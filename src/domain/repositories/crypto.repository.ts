import { CryptoAsset } from '../entities/crypto.entity';

/**
 * Domain Repository Interface
 * 
 * Think of this as a strict "Contract" or "Blueprint".
 * It declares WHAT our app can do regarding cryptocurrencies, 
 * but it absolutely does NOT care HOW it is done.
 * 
 * Notice there is no Axios, no APIs, and no databases mentioned here.
 * This ensures our core business logic is completely isolated from our tools.
 */
export interface CryptoRepository {
  /**
   * Fetches a list of top cryptocurrency assets.
   * @param limit How many coins to fetch (e.g., 10, 50, 100)
   * @param currency The fiat currency to convert to (e.g. 'usd', 'inr')
   * @returns A Promise containing an array of clean, validated CryptoAsset objects.
   */
  getTopAssets(limit: number, currency: string): Promise<CryptoAsset[]>;

  /**
   * Fetches details for a single specific coin.
   * @param id The ID of the coin (e.g., 'bitcoin')
   */
  getAssetById(id: string): Promise<CryptoAsset>;
}
