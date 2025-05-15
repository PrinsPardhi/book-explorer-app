import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { AuthService } from '../../auth/auth.service';
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, LoadingComponent]
})
export class BookDetailPage implements OnInit {
  book?: Book;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private authService: AuthService
  ) {addIcons({logOut});}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBook(bookId);
    }
  }

  private loadBook(bookId: string) {
    this.booksService.getBookById(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  async logout() {
    await this.authService.logout();
  }
}