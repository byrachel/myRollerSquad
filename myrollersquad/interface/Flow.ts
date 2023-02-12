export interface PostInterface {
    id: number;
    title: string;
    content: string;
    hashtags: string[];
    created_at: Date;
    category: {
        id: number;
        name: string
    },
    pictures: string[]
}