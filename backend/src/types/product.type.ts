import { Buffer } from 'buffer';

export default interface ProductType {
    id: Buffer;
    seller_id: Buffer;
    name: string;
    mrp: number;
    discount_percent: string;
    quantity: number;
    unit: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
    photo: string | null;
    description: string | null;
    stock: number;
    address_id: Buffer | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    uid: string;
}

export interface NewProductType {
    seller_id: Buffer;
    name: string;
    mrp: number;
    discount_percent?: number;
    quantity?: number;
    unit?: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
    photo?: string | null;
    description?: string | null;
    stock?: number;
    address_id?: Buffer | null;
}