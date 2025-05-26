export default interface OrderAttributes {
    id: string;
    status: 'ordered' | 'delivered' | 'cancelled',
    isPaid: boolean,
    total: number,
    delivery_date: Date,
    createdAt: Date;
}

