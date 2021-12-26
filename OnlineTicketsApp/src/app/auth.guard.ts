import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private auth:AuthService, private router:Router){ }
  
   canActivate():boolean{
     if( this.auth.isLoggedIn()){
      console.log('Logged In');
       return true;
     }else{
       this.router.navigateByUrl('/login')
       console.log('Not Loggedin');
       return false
     }
    }
}
