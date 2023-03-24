import {PricePlansListType} from 'types/pricePlans';
import {instance} from '_services/axios';

export const requests = {
  getPricePlans: (): Promise<PricePlansListType> => {
    return instance.get('/pricePlans');
  },
};
