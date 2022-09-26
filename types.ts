export interface PostProps {
    post: Post;
}

export interface Post {
    author:         Author;
    createdAt:      Date;
    excerpt:        string;
    slug:           string;
    title:          string;
    featuredImages: FeaturedImages;
    categories:     Category[];
    content:        Content;
}

export interface Author {
    bio:   string;
    name:  string;
    id:    string;
    photo: FeaturedImages;
}

export interface FeaturedImages {
    url: string;
}

export interface Category {
    name: string;
    slug: string;
}

export interface Content {
    raw: Raw;
}

export interface Raw {
    children: RawChild[];
}

export interface RawChild {
    type:     string;
    children: ChildChild[];
}

export interface ChildChild {
    text: string;
}
