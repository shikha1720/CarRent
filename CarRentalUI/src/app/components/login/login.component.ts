import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
type:string = "password";
isText:boolean = false;
eyeIcon: string = "fa-eye-slash";
loginForm!:FormGroup;

constructor(private fb : FormBuilder,
             private auth:AuthService,
              private router:Router,
              private toast: NgToastService,
              private userStore : UserStoreService
             ) { }


ngOnInit():void{

  //login form
this.loginForm = this.fb.group({
  email:['', Validators.required],
  password:['', Validators.required]

})
}

hideShowPass(){
this.isText =!this.isText;
this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash"
this.isText ? this.type="text" : this.type="password"
}

//login fumction
onLogin(){
  if(this.loginForm.valid){
    // send the object to db
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        const tokenpayload = this.auth.decodedToken();
        this.userStore.setFullNameFromStore(tokenpayload.unique_name)
        this.userStore.setRoleFromStore(tokenpayload.role)
        this.toast.success({detail:"SUCCESS",summary:res.message, duration:1500})
        this.auth.loginSuccess.emit();
        this.router.navigate(['dashboard']);
        setTimeout(function() {
          window.location.reload();
      },1700);
      },
      error: (err)=> {
        this.toast.error({detail:"ERROR",summary:"Email or Password is wrong. Please Check.", duration:1500})
      }
    })
  }
  else{
    this.validateFormFields(this.loginForm);
    this.toast.warning({detail:"WARNING",summary:"Form is invalid.", duration:1500})
  }
}

//validate form
private validateFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }
    else if(control instanceof FormGroup){
      this.validateFormFields(control)
    }
  })
}


}
