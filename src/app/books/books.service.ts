import { Injectable } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 private readonly MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    shortDescription: 'A story of wealth, love, and the American Dream in the 1920s.',
    longDescription: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    coverImage: 'assets/images/books/gatsby.jpg',
    publishedDate: '1925-04-10',
    genre: ['Classic', 'Fiction', 'Literary'],
    averageRating: 4.2,
    pageCount: 180
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    shortDescription: 'A powerful story of racial injustice and moral growth in the American South.',
    longDescription: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.',
    coverImage: 'assets/images/books/kill.jpg',
    publishedDate: '1960-07-11',
    genre: ['Classic', 'Fiction', 'Historical'],
    averageRating: 4.3,
    pageCount: 281
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    shortDescription: 'A dystopian novel about totalitarianism and surveillance.',
    longDescription: 'Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian novel by English novelist George Orwell. It was published in June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime.',
    coverImage: 'assets/images/books/orwell.jpg',
    publishedDate: '1949-06-08',
    genre: ['Dystopian', 'Political Fiction', 'Science Fiction'],
    averageRating: 4.5,
    pageCount: 328
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    shortDescription: 'A romantic novel about the Bennet family and their five unmarried daughters.',
    longDescription: 'Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
    coverImage: 'assets/images/books/pride.jpg',
    publishedDate: '1813-01-28',
    genre: ['Romance', 'Classic', 'Literary Fiction'],
    averageRating: 4.7,
    pageCount: 279
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    shortDescription: 'A fantasy novel about Bilbo Baggins\' adventurous quest.',
    longDescription: 'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
    coverImage: 'assets/images/books/hobbit.jpg',
    publishedDate: '1937-09-21',
    genre: ['Fantasy', 'Adventure', 'Classic'],
    averageRating: 4.8,
    pageCount: 310
  },
  {
    id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    shortDescription: 'A story of teenage alienation and rebellion.',
    longDescription: 'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945-1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society.',
    coverImage: 'assets/images/books/catcher.jpg',
    publishedDate: '1951-07-16',
    genre: ['Literary Fiction', 'Coming-of-Age'],
    averageRating: 3.8,
    pageCount: 234
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    shortDescription: 'An epic fantasy adventure about the quest to destroy the One Ring.',
    longDescription: 'The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien\'s 1937 children\'s book The Hobbit, but eventually developed into a much larger work.',
    coverImage: 'assets/images/books/lord.jpg',
    publishedDate: '1954-07-29',
    genre: ['Fantasy', 'Adventure', 'Epic'],
    averageRating: 4.9,
    pageCount: 1178
  },
  {
    id: '8',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    shortDescription: 'The first book in the Harry Potter series about a young wizard.',
    longDescription: 'Harry Potter and the Philosopher\'s Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.',
    coverImage: 'assets/images/books/harry.jpg',
    publishedDate: '1997-06-26',
    genre: ['Fantasy', 'Adventure', 'Young Adult'],
    averageRating: 4.6,
    pageCount: 223
  },
  {
    id: '9',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    shortDescription: 'A mystical story about a shepherd\'s journey to find treasure.',
    longDescription: 'The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller. The story follows the journey of an Andalusian shepherd boy named Santiago.',
    coverImage: 'assets/images/books/alc.jpg',
    publishedDate: '1988-01-01',
    genre: ['Fiction', 'Fantasy', 'Philosophical'],
    averageRating: 3.9,
    pageCount: 163
  },
  {
    id: '10',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    shortDescription: 'A mystery thriller about a symbologist\'s quest to solve a murder.',
    longDescription: 'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris, when they become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ having been married to Mary Magdalene.',
    coverImage: 'assets/images/books/dc.jpg',
    publishedDate: '2003-03-18',
    genre: ['Mystery', 'Thriller', 'Conspiracy'],
    averageRating: 3.8,
    pageCount: 454
  }
];

  constructor(private storageService: StorageService) {}

  getBooks() {
    return of(this.MOCK_BOOKS).pipe(delay(500)); // Simulate API delay
  }

  getBookById(id: string) {
    return of(this.MOCK_BOOKS.find(book => book.id === id)).pipe(delay(500));
  }

  searchBooks(query: string) {
    return of(
      this.MOCK_BOOKS.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      )
    ).pipe(delay(300));
  }
}