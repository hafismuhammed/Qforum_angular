export interface User {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string,
        updated_at: string,
    }
}