import { ListItem } from "./listitem.model";

export interface QuestionResponse {
    current_page: number;
    data: ListItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page: string;
    to: number;
    total: number;
}