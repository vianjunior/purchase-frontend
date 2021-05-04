import { Product } from './product.model';
import { Approval } from './approval.model';

export interface Purchase {
    purchaseId?: number;
    requesterName: string;
    product: Product;
    hasApproval: boolean;
    approval: Approval;
    startDate: string;
    finishDate: string;
}