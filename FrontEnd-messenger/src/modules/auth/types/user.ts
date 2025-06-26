export interface UserData {
    id: string;
    email: string;
    image?: string; // Optional field for user image
    firstName?: string; // Optional field for first name
    lastName?: string; // Optional field for last name
    username: string;
    birthday?: string; // Optional field for birthday
    postCount?: number; // Optional field for posts count
    // subscribersCount?: number; // Optional field for subscribers count
    friendCount?: number; // Optional field for friends count

    posts?: {
        id: string;
        title: string;
        topic?: string;
        description: string;
        images?: (string | { uri: string })[]; // массив base64, url или объект с uri
        url?: string;
        tags?: (string | { name: string })[]; // массив тегов или объектов с name
        likesCount: number;
        viewsCount: number;
    }[];
    friends?: {
        id: string;
        username: string;
        image?: string; // Optional field for friend image
    }[];
};