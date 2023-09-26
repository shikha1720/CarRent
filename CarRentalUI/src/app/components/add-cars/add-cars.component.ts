import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.css']
})
export class AddCarsComponent {
addCarsForm!:FormGroup;
msg="";

  constructor(private fb: FormBuilder,
              private auth : AuthService,
              private router: Router,
              private toast : NgToastService
    ) { }

  ngOnInit(){

    //Form to take car details
    this.addCarsForm = this.fb.group({
      model:['', Validators.required],
      maker:['', Validators.required],
      imageURL:['', Validators.required],
      rentalPrice:['',Validators.required],
      about:['',Validators.required],
      isRented:[false,Validators.nullValidator],
      adminConfirm:[false,Validators.nullValidator]
    })
  }

  //form validators --start
  get Model():FormControl{
    return this.addCarsForm.get('model') as FormControl;
  }
  get Maker():FormControl{
    return this.addCarsForm.get('maker') as FormControl;
  }
  get ImageURL():FormControl{
    return this.addCarsForm.get('imageURL') as FormControl;
  }
  get RentalPrice():FormControl{
    return this.addCarsForm.get('rentalPrice') as FormControl;
  }
  get About():FormControl{
    return this.addCarsForm.get('about') as FormControl;
  }
  //form validators --end
  
  // function to add new car
  onClickAddCars(){
    if(this.addCarsForm.valid){
      // send the object to db
      this.auth.addCar(this.addCarsForm.value)
      .subscribe({
        next:(res)=>{
          this.addCarsForm.reset();
          this.toast.success({detail:"SUCCESS",summary:"Car added successfully.", duration:5000})
          this.router.navigate(['dashboard']);
        },
        error: (err)=> {
          console.error('API Error:', err);
          this.toast.error({detail:"ERROR",summary:"Please fill details carefully.", duration:5000})
        }
      })
    }
    else{
      this.msg = "*Please Enter All The Fields first";
    }
  }
}
