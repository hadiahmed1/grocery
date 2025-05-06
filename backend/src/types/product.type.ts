import { Buffer } from 'buffer';

export default interface ProductAttributes {
    id: string;
    seller_id: Buffer;
    name: string;
    mrp: number;
    discount_percent?: number;
    quantity: number;
    unit: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
    photo?: string | null;
    description?: string | null;
    stock: number;
    address_id?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type ProductCreationAttributes = Omit<ProductAttributes,
    'id' | 'quantity' | 'unit' | 'stock' | 'createdAt' | 'updatedAt'>;
