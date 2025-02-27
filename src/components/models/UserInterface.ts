export interface IUser {
    id: number;
    member_id: string;
    name: string;
    last_name: string;
    is_admin: boolean;
    access_token: string;
    refresh_token: string;
    updated_at: string | null;
    ex?: number
}