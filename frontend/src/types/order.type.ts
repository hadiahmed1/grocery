export default interface OrderAttributes {
    id: string;
    status: 'ordered' | 'delivered' | 'cancelled',
    total: number,
    delivery_date: Date,
    createdAt?: Date;
}

