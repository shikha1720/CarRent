import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$  = new BehaviorSubject<string>("");
  private Id$  = new BehaviorSubject<string>("");
  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    return this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullName:string){
    return this.fullName$.next(fullName)
  }

public setFullNameForStore(fullName:string){
  this.fullName$.next(fullName);
}

public getIdFromStore(){
return this.Id$.asObservable();
}

}
