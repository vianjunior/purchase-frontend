import { Product } from './product.model';
import { Requester } from './requester.model';

export interface Purchase {
    id?: number;
    solicitante: Requester;
    produto: Product;
    passouPorAprovacao: boolean;
    aprovado: boolean;
    observacao: string;
}