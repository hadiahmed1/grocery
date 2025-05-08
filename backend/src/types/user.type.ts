export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    phno?: string;
    role: 'user'|'seller'; 
    user_password: string;
    isVerified?: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;
