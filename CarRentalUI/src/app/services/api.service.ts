import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseurl : string = "https://localhost:7267/api/";
  constructor(private http : HttpClient) { }

  getUsers(){
    let url = this.baseurl + 'User';
    return this.http.get<any>(url);
  }

  getCars(){
    let url = this.baseurl + 'Car';
    return this.http.get<any>(url);
  }
  getCarById(id:any){
    let url = this.baseurl + 'Car/GetCar/'  + id;
    return this.http.get(url);
  }
  oneCar: any;
  getOneCar(){
    return this.oneCar;
  }

  setOneCar(oneCar:Car){
    this.oneCar = oneCar;
  }

  getMyAgeements(userId:any){
    let url = this.baseurl + 'Agreement/userAgreements/' + userId;
    return this.http.get<any>(url);
  }

  getAllAgreements(){
    let url = this.baseurl + 'Agreement/allAgreements';
    return this.http.get<any>(url);
  }

  requestToReturn(id:number){
    let url = this.baseurl + 'Car/requestToReturn/' + id;
    return this.http.get<any>(url)
  }
  
  carInspected(carId:any,id:any){
    let url = this.baseurl + 'Car/carInspected/'+carId +'/'+id;
    return this.http.get<any>(url);
  }
  
  deleteAgreement(id:number){
    let url = this.baseurl + 'Agreement/deleteAgreement/' +id;
    return this.http.delete(url);
  }
  
  updateDuration(id:number, duration:any){
    let url = this.baseurl + 'Agreement/UpdateAgreement/' + id + '/' + duration;
    return this.http.put<any>(url,id);
  }
}
