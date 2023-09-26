import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public fullName: string = '';
  public role: string = '';
  public isLoggedIn: boolean = this.authService.isLoggedIn();
  public hideLogin: boolean = this.authService.isLoggedIn();

  constructor(
    private authService: AuthService,
    private toaster: NgToastService,
    private api: ApiService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  //function to logout
  logout() {
    this.authService.logOut();
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'Logged out successfully.',
      duration: 1500,
    });
    this.router.navigate(['dashboard']);
  }

  //login button clicked
  onLoginClick() {
    this.router.navigate(['login']);
    this.hideLogin = false;
  }


  }

