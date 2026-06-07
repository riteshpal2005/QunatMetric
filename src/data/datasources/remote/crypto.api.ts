import { apiClient } from '@/utils/axios.config';

/**
 * Data Source Layer (Remote)
 * 
 * This file is purely responsible for talking to the external world (the API).
 * It knows about URLs, HTTP methods, and query parameters.
 * 
 * Notice that it returns "any". That's because we don't trust the API yet.
 * We will validate this raw data later using our Mapper.
 */
export const CryptoApi = {
  /**
   * Fetch a list of top coins by market cap
   * Endpoint: GET /coins/markets
   */
  fetchMarkets: async (limit: number = 20, currency: string = 'inr'): Promise<any> => {
    const response = await apiClient.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  },

  /**
   * Fetch details for a specific coin
   * Endpoint: GET /coins/{id}
   */
  fetchCoinDetails: async (id: string): Promise<any> => {
    const response = await apiClient.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
      },
    });
    return response.data;
  },
};
