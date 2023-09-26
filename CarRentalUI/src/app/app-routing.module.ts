import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { authAgreementGuard } from './guards/auth-agreement.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { AddCarsComponent } from './components/add-cars/add-cars.component';
import { MyAgreementComponent } from './components/my-agreement/my-agreement.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'admin',component:AdminPanelComponent, canActivate:[authGuard]},
  {path:'addCars',component:AddCarsComponent, canActivate:[authGuard]},
  {path:'agreement', component:AgreementComponent,canActivate:[authAgreementGuard]},
  {path:'myAgreement', component: MyAgreementComponent, canActivate:[authAgreementGuard]},
  {path:'', redirectTo:"/dashboard", pathMatch:'full'},
  { path: '**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
