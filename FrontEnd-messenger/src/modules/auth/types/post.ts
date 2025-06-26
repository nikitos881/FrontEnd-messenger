export interface Post{
    id: string;
    user: {
        id: string; // Add the id property
        image?: string; // URL или base64 строка
        username?: string;
        firstName?: string;
        lastName?: string;
    };
    title: string;
    topic?: string;
    description: string;
    images?: ImageSource[]; // массив base64, url или объект с uri
    url?: string;
    tags: (string | { name: string })[]; // массив тегов или объектов с name
    likesCount?: number;
    viewsCount?: number;
};

export type ImageSource = string | { uri: string };