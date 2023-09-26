import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
})
export class AgreementComponent implements OnInit {
  car: any;
  carId: any;
  date = Date().slice(0, 16);
  public fullName: string = '';
  rentalForm!: FormGroup;
  totalPrice = 0;
  startDate = Date();
  msg = '';
  userId!:number;
  isDisabled = true;
  
  constructor(
    private api: ApiService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private fb: FormBuilder,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.car = this.api.getOneCar();
    this.carId = this.car.id;
    this.getCar();

    this.userStore.getFullNameFromStore().subscribe((val) => {
    let fullNameFromToken = this.auth.getFullNameFromToken();
    this.fullName = val || fullNameFromToken;
    });

    this.userStore.getIdFromStore().subscribe((val) => {
      let IdFromToken = this.auth.getIdFromToken();
      let suserId = val || IdFromToken;
      this.userId = parseInt(suserId);
    });

    //Form for agreement
      this.rentalForm = this.fb.group({
        duration: ['', [Validators.required]],
        totalPrice: ['',Validators.nullValidator],
        startDate: [this.startDate,Validators.nullValidator],
        carId:[this.carId,Validators.nullValidator],
        userId:[this.userId,Validators.nullValidator],
        agreementStatus:[true,Validators.nullValidator]
      });
  }

  getCar() {
    this.api.getCarById(this.carId).subscribe((car) => {
      this.car = car;
    });
  }

  //total price calculator
  priceCal(price: any) {
    this.totalPrice = this.car.rentalPrice * price.value;
  }

  get Duration(): FormControl {
    return this.rentalForm.get('duration') as FormControl;
  }

  // save agreement
  onAccept() {
    this.rentalForm.value.totalPrice = this.totalPrice;
    if (this.rentalForm.valid) {
      this.auth.addAgreement(this.rentalForm.value)
      .subscribe({
        next:(res) =>{
          this.rentalForm.reset();
          this.toast.success({detail:"SUCCESS", summary:"Agreement Accepted", duration:1500});
          this.router.navigate(['dashboard']);
        },
        error:(err) => {
          this.toast.error({detail:"ERROR", summary:"Please enter duration", duration:1500});
        }
      })
    }
    else {
      this.msg = '*Please enter Duration';
      this.ngOnInit;
    }
  }

  //checkbox
  enableDisable(){
    this.isDisabled = ! this.isDisabled;
  }
  

}
