import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Car } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public users: any = [];
  public cars: any = [];
  public fullName: string = '';
  public role: string = '';
  public searchQuery: string = '';
  public filteredCars: any = [];
  type= "";
  msg="No Result Found";
  p: any;
  text: any;

  constructor(
    private authService: AuthService,
    private toaster: NgToastService,
    public api: ApiService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
     
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    //all cars
    this.api.getCars().subscribe((res) => {
      this.cars = res;
      this.filteredCars = this.cars;
    });

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
      duration: 5000,
    });
  }
  passName() {
    return this.fullName;
  }

  typeValue(value: any) {
    this.type = value;
  }

  //filters by brand and model
  performSearch(search: any) {
    this.searchQuery = search.value.toLowerCase();
    let value = this.type;
    if (value == 'maker') {
      if (this.searchQuery) {
        this.filteredCars = this.cars.filter((car: any) => {
          return car.maker.toLowerCase().includes(this.searchQuery);
        });
      }
    }
    else if(value == "model"){
      if (this.searchQuery) {
        this.filteredCars = this.cars.filter((car: any) => {
          return car.model.toLowerCase().includes(this.searchQuery);
        });
      }
    }
    else if(value == ""){
      if (this.searchQuery) {
        this.filteredCars = this.cars.filter((car: any) => {
          return car.about.toLowerCase().includes(this.searchQuery);
        });
      }
    }
     else {
      this.filteredCars = this.cars;
    }
  }

  //filter by price
  filterByPrice(start:number){
    if (start) {
      this.filteredCars = this.cars.filter((car: any) => {
        return (car.rentalPrice < start);
      });
    }
    else {
      this.filteredCars = this.cars;
    }
  }

  //lessen about
  cardAbout(about:any){
    const words = about.split(" ");
    if(words.length>18) {
      const truncText = words.slice(0,18).join(" ");
      const addEllipsis = truncText + " ...";
      this.text = addEllipsis;
      return this.text;
    }
    else {
      this.text = about;
      return this.text;}
  }
}
