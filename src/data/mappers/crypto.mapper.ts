import { CryptoAsset, CryptoAssetSchema } from '@/domain/entities/crypto.entity';

/**
 * Mapper / Serializer Layer
 * 
 * The API gives us ugly data (e.g., snake_case properties like `current_price`).
 * Our app expects beautiful, clean data (camelCase, strongly typed).
 * 
 * The Mapper sits in between. It takes raw API JSON, transforms it, 
 * runs it through Zod, and spits out clean Domain Entities.
 */
export const CryptoMapper = {
  /**
   * Maps CoinGecko's raw market list item to our CryptoAsset entity.
   */
  toDomain: (rawApiData: any): CryptoAsset => {
    // 1. Transform the ugly raw data to match what our Zod schema expects
    const unvalidatedData = {
      id: rawApiData.id,
      symbol: rawApiData.symbol,
      name: rawApiData.name,
      currentPrice: rawApiData.current_price || rawApiData.market_data?.current_price?.usd || 0, // Fallback logic
      priceChangePercentage24h: rawApiData.price_change_percentage_24h || 0,
      imageUrl: rawApiData.image?.large || rawApiData.image || '', // Handles both /markets and /coins/{id} responses
    };

    // 2. Pass it through the Zod "Bouncer".
    // If the data is missing something required (like `id`), it will throw a clear error here!
    return CryptoAssetSchema.parse(unvalidatedData);
  },

  /**
   * Maps an array of raw items.
   */
  toDomainList: (rawApiList: any[]): CryptoAsset[] => {
    if (!Array.isArray(rawApiList)) return [];
    
    return rawApiList.map(rawItem => CryptoMapper.toDomain(rawItem));
  }
};
