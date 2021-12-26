import { Component } from '@angular/core';
import { Router, NavigationStart,NavigationEnd,Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusApp';
images = ['../assets/images/Bus1.jpg','../assets/images/Bus2.jpg','../assets/images/Bus3.jpeg']
loader:boolean;

  constructor(public auth:AuthService, private router:Router)
  {

  }
   OnInit(){}
  


   logged(){
     return this.auth.isLoggedIn()
   }
   loggedOut(){
   return this.auth.logOut()
   }
   login(){
     this.router.navigate(['login'])
   }
   register(){
     this.router.navigate(['register'])
   }
 
}



