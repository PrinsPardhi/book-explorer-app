import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, lockClosedOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });
  showPassword = false;
  loginError = '';


  ngOnInit(): void {
    this.loginForm.reset({
      username: '',
      password: '',
      rememberMe: false
    });
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    addIcons({
      'lock-closed-outline': lockClosedOutline,
      'person-outline': personOutline,
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });

  }

  async onSubmit() {
    this.loginError = ''; // Reset error message
    if (this.loginForm.invalid) {
      this.loginError = 'Please fill all fields correctly';
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const { username, password, rememberMe } = this.loginForm.value;
      const credentials = {
        username: username || '',
        password: password || '',
        rememberMe: rememberMe || false
      };

      const isAuthenticated = await this.authService.login(
        credentials.username,
        credentials.password,
        credentials.rememberMe
      );

      if (!isAuthenticated) {
        this.loginError = 'Invalid username or password';
        await this.showErrorToast();
      } else {
        await this.router.navigate(['/books']);
      }
    } catch (error) {
      this.loginError = 'Login failed. Please try again.';
      await this.showErrorToast();
    } finally {
      await loading.dismiss();
    }
  }

  ionViewWillEnter() {
    this.clearForm();
  }

  clearForm() {
    this.loginForm.reset({
      username: '',
      password: '',
      rememberMe: false
    });
  }

  private async showErrorToast() {
    const toast = await this.toastCtrl.create({
      message: this.loginError,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}