import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-agreement',
  templateUrl: './my-agreement.component.html',
  styleUrls: ['./my-agreement.component.css']
})
export class MyAgreementComponent implements OnInit {

  public myAgreement :any = [];
  userId:any;
  
  constructor(private api: ApiService,
              private auth: AuthService,
              private toast : NgToastService){}

  ngOnInit(): void {
    
    this.userId= this.auth.getIdFromToken();
    this.api.getMyAgeements(this.userId).subscribe(val=>{
      this.myAgreement=val;

    });
  }

  //return request
  requestToReturn(carId: number){
    this.api.requestToReturn(carId).subscribe();
    this.toast.success({detail:"Success" , summary:"Your request has been successfully sent.", duration:3000})
  }

}
