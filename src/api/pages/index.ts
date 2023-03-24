import {PagesListType} from 'types/pages';
import {instance} from '_services/axios';

export const requests = {
  getPages: (): Promise<PagesListType> => {
    return instance.get('/pages');
  },
};
