import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { BusListComponent } from './bus-list/bus-list.component';
import { SeatSeletionComponent } from './seat-seletion/seat-seletion.component';
import { PaymentComponent } from './payment/payment.component';
import { TicketConfirmComponent } from './ticket-confirm/ticket-confirm.component';


const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:"full",
  //   redirectTo:'login'
  // },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'home',
    canActivate:[AuthGuard],
    component:HomeComponent,
    
  },
  {
   path:'buslist',
   canActivate:[AuthGuard],
   component:BusListComponent
  },
  {
   path:'seats',
   canActivate:[AuthGuard],
   component:SeatSeletionComponent
  },
  {
    path:'payment',
    canActivate:[AuthGuard],
    component:PaymentComponent
  },
  {
    path:'thankyou',
    canActivate:[AuthGuard],
    component:TicketConfirmComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
