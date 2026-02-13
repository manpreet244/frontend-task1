import api from './api';
import { Product } from '@/app/types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};