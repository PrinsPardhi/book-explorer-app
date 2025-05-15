export interface Book {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  longDescription: string;
  coverImage?: string;
  publishedDate: string;
  genre: string[];
  averageRating?: number;
  pageCount?: number;
}