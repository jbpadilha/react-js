import Product from '../components/Product';
import ActionBase from './ActionBase';

const actionBase = ActionBase.getInstance();

export const getProducts = async (): Promise<any> => {
    const result = await actionBase.get('/products');
    if (result) {
        return result;
    }
    return null;
};

export const createProduct = async (product: Product): Promise<any> => {
    const result = await actionBase.post<Product>('/products', product);
    if (result) {
        return result;
    }
    return null;
};