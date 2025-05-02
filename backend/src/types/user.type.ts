export default interface User {
    id: Buffer;
    username: string;
    email: string;
    phno: string;
    user_password: string;
    isVerified: boolean | 0 | 1;
    address_id: Buffer | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
