export default interface CartItemAttributes {
    id: string;
    product_id: string;
    count: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    mrp: number;
    discount_percent?: string;
    quantity?: number;
    unit?: string;
    photo: string;
    seller_id: string;
    description: string;
}
