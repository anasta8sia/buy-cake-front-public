import qs from 'qs';
import { PAGE_SIZE } from '../constants';

export interface ParamsInterface {
  path: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  headers?: any;
  body?: any;
}

export interface CakesDataInterface {
  id: number;
  name: string;
  img: string;
}

export interface CakesFillingsInterface {
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface OrderInterface {
  id: number;
  uniqueId: string;
  name: string;
  email: string;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderCreateType = Pick<OrderInterface, 'name' | 'email' | 'msg'>;

class DataService {
  static readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  public async makeRequest ({
    path,
    method = 'get',
    headers,
    body,
  }: ParamsInterface) {
    const response = await fetch(`${DataService.BASE_URL}${path}`, {
      method,
      headers,
      body,
    });

    return await response.json();
  }

  public getOffset (page: number, pageSize = PAGE_SIZE) {
    return (page - 1) * pageSize;
  }

  public getParams (page: number, pageSize?: number) {
    return qs.stringify({ offset: this.getOffset(page), limit: pageSize }, { addQueryPrefix: true });
  }

  public async getCakes (page: number, pageSize?: number): Promise<{ count: number; rows: CakesDataInterface[] }> {
    const response = await this.makeRequest({
      path: `/cake${this.getParams(page, pageSize)}`,
    });

    return response;
  }

  public async getCakesFillings (): Promise<CakesFillingsInterface[]> {
    const response = await this.makeRequest({
      path: '/cake-filling',
    });

    return response;
  }

  public async getOrder (uniqueId: string): Promise<OrderInterface> {
    const response = await this.makeRequest({
      path: `/order/${uniqueId}`,
    });

    return response;
  }

  public async createOrder (body: OrderCreateType): Promise<OrderInterface> {
    const response = await this.makeRequest({
      path: '/order',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response;
  }
}

export const dataService = new DataService();
