export interface PostInterface {
    id: number;
    title: string;
    content: string;
    hashtags: string[];
    category: {
        id: number;
        name: string
    }
}