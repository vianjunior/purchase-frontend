import { Product } from './product.model';

export interface Purchase {
    purchaseId?: number;
    requesterName: string;
    product: Product;
    position: string;
    approval: string;
    obs: string;
    startDate: string;
    finishDate: string;
}