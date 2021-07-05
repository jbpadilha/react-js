import { AxiosResponse } from 'axios';
import Product from '../components/Product';
import HttpClient from '../server/HttpClient';

export default class ActionBase extends HttpClient {
  public constructor() {
    super('http://localhost:8080');
  }

  public createItem = (body: Product) => this.instance.post<Product>('/product', body);

  public getProducts = async () => this.instance.get<Product,AxiosResponse<Product[]>>('/products');
}