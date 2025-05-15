import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MOCK_USER = { username: 'user', password: 'pass123' };
  private readonly STORAGE_KEY = 'rememberMe';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async login(username: string, password: string, rememberMe: boolean): Promise<boolean> {
  if (username === this.MOCK_USER.username && password === this.MOCK_USER.password) {
    if (rememberMe) {
      // Persistent storage
      await this.storageService.set(this.STORAGE_KEY, { 
        username: username,
        isAuthenticated: true,
        timestamp: new Date().getTime()
      });
    } else {
      // Temporary storage that clears when app closes
      await this.storageService.set(this.STORAGE_KEY, {
        isAuthenticated: true,
        temporary: true
      });
    }
    return true;
  }
  return false;
}

 async logout(): Promise<void> {
  await this.storageService.remove(this.STORAGE_KEY);
  await this.router.navigate(['/login']);
}

  async isAuthenticated(): Promise<boolean> {
  const authData = await this.storageService.get(this.STORAGE_KEY);
  return authData?.isAuthenticated === true;
}
}