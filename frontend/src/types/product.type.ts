export default interface ProductAttributes {
    id: string;
    seller_id: string;
    name: string;
    mrp: number;
    discount_percent?: number;
    count?: number;
    quantity?: number;
    unit?: 'piece' | 'units' | 'kg' | 'g' | 'mg' | 'lb' | 'ml' | 'l';
    photo?: string | null;
    description?: string | null;
    stock?: number;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    address_id?: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type ProductCreationAttributes = Omit<ProductAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
