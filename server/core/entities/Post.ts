export class Post {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly user: any,
    // place: any,
    public readonly created_at: Date,
    public readonly hashtags: string[],
    public readonly squad_ids: number[],
    public readonly link: string | null,
    public readonly pictures: string[],
    public readonly city: string | null,
    public readonly country: string,
    // public readonly location?: {
    //   latitude: string;
    //   longitude: string;
    // },
    public readonly likes: number,
    // comments: number,
    public readonly category_id: number,
    public readonly style_id: number | null
  ) {}
}
