export type Album = {
    id: number;
    userId: number;
    title: string;
    date: string;
    images: { id: number; url: string }[];
  };