// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { StorageService } from './core/services/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        driverOrder: [
          Drivers.IndexedDB,
          Drivers.LocalStorage,
          Drivers.SecureStorage
        ]
      })
    ),
    // Explicitly provide StorageService
    StorageService
  ]
};