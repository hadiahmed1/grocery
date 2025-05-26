export default interface ProductAttributes {
    rating?: number;
    id: string;
    seller_id: string;
    name: string;
    mrp: number;
    discount_percent?: number;
    quantity?: number;
    unit?: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
    photo?: string | null;
    description?: string | null;
    stock?: number;
    address_id?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export type ProductCreationAttributes = Omit<ProductAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
