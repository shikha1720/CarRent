import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl : string = "https://localhost:7267/api/";
  private userPayload!:any;
  loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private http: HttpClient,
              private router : Router
    ) {
      this.userPayload = this.decodedToken();
    }

  login(loginObj:any) {
    let url = this.baseurl + 'User/authenticate';
    return this.http.post<any>(url,loginObj).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      }));

  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // singleton service
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  // singleton service
  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token  = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
}
  }

  getIdFromToken(){
    if(this.userPayload)
    return this.userPayload.nameid;
  }

  addCar(carObj:any): Observable<any>{
    let url = this.baseurl + 'Car/addcars';
    return this.http.post<any>(url,carObj).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      }));
  }


addAgreement(agreement:any){
  let url = this.baseurl + 'Agreement/agreement';
  return this.http.post<any>(url,agreement);
}

}
