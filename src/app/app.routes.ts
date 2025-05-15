import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'books',
    loadComponent: () => import('./books/book-list/book-list.page').then(m => m.BookListPage),
    canActivate: [authGuard]
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./books/book-detail/book-detail.page').then(m => m.BookDetailPage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];