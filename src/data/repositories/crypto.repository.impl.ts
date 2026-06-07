import { CryptoAsset } from '@/domain/entities/crypto.entity';
import { CryptoRepository } from '@/domain/repositories/crypto.repository';
import { CryptoApi } from '../datasources/remote/crypto.api';
import { CryptoMapper } from '../mappers/crypto.mapper';

/**
 * Concrete Implementation of the Crypto Repository
 * 
 * This file says: "I promise to fulfill the rules of the CryptoRepository blueprint."
 * Notice how it glues the API layer and the Mapper layer together.
 */
export const cryptoRepositoryImpl: CryptoRepository = {
  getTopAssets: async (limit: number, currency: string): Promise<CryptoAsset[]> => {
    try {
      // 1. Fetch raw unvalidated data from the network
      const rawData = await CryptoApi.fetchMarkets(limit, currency);
      
      // 2. Pass it through the Mapper to clean it and validate it with Zod
      return CryptoMapper.toDomainList(rawData);
    } catch (error) {
      // Here we can catch specific API errors and throw standardized custom errors
      console.error('[cryptoRepositoryImpl] Failed to getTopAssets:', error);
      throw error;
    }
  },

  getAssetById: async (id: string): Promise<CryptoAsset> => {
    try {
      const rawData = await CryptoApi.fetchCoinDetails(id);
      return CryptoMapper.toDomain(rawData);
    } catch (error) {
      console.error(`[cryptoRepositoryImpl] Failed to getAssetById for ${id}:`, error);
      throw error;
    }
  },
};
