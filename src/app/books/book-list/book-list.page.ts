import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { LoadingComponent } from '../../core/components/loading/loading.component';
import { addIcons } from 'ionicons';
import { logOut, star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, LoadingComponent, ReactiveFormsModule]
})
export class BookListPage implements OnInit {
  books$ = this.booksService.getBooks(); 
  searchControl = new FormControl('');
  isLoading = false;
  isDesktop = window.innerWidth > 768;
 

  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService
  ) {addIcons({star,starOutline,logOut});}

  ngOnInit() {
    this.setupSearch();
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth > 768;
    });
  }

  private setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isLoading = true;
        return query 
          ? this.booksService.searchBooks(query) 
          : this.booksService.getBooks();
      })
    ).subscribe({
      next: (books) => {
        this.books$ = of(books);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.isLoading = false;
      }
    });
  }

  openBookDetails(bookId: string) {
    this.router.navigate(['/books', bookId]);
  }

  async logout() {
    await this.authService.logout();
  }
}