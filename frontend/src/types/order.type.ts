export default interface OrderAttributes {
    id: string;
    user_id: string;
    status: 'ordered'| 'delivered'| 'cancelled'
    delivery_date: Date,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

