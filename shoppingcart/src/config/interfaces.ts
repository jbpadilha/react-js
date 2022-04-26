import Product from '../components/Product';

export interface Action {
    type: string;
    payload?: any;
    error?: any;
}

export interface State {
    // Common Usage
    loading?: boolean;

    // Auth interface
    user?: any;
    accessToken?: any;
    isAuthenticated?: boolean;

    // Product
    products?: Product[];

}

export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}