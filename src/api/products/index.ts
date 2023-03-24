import {ProductsListType} from 'types/products';
import {instance} from '_services/axios';

export const requests = {
  getProducts: (): Promise<ProductsListType> => {
    return instance.get('/products');
  },
};
