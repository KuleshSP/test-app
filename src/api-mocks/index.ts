import MockAdapter from 'axios-mock-adapter';
import {instance} from '_services/axios';
import productsJSON from './products.json';
import pricePlansJSON from './pricePlans.json';
import pagesJSON from './pages.json';


const mock = new MockAdapter(instance, {delayResponse: 100});

mock
    .onGet('/products')
    .reply(() => {
      return [200, productsJSON];
    })
    .onGet('/pricePlans')
    .reply(() => {
      return [200, pricePlansJSON];
    })
    .onGet('/pages')
    .reply(() => {
      return [200, pagesJSON];
    })
    .onAny()
    .passThrough();
