export interface IUser {
    user_id: number;
    member_id: string;
    name: string;
    last_name: string;
    is_admin: boolean;
    exp?: number
}