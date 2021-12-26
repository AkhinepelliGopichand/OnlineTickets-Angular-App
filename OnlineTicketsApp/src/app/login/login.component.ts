import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
error:any
errors:any
  constructor(private FB: FormBuilder,private router:Router,private _auth:AuthService) { }

  userdtls=this.FB.group({
    email:['',[Validators.required,
    Validators.minLength(3)]],
    password:['',Validators.required]
  })

  ngOnInit() {
  }
  get email(){
    // console.log('Errors Array',this.userinfo.controls['email'].errors);
   return this.userdtls.controls['email']

  }
  get password(){
   return this.userdtls.controls['password']
  }
  
  getvalues(){
    console.log(this.userdtls.value);  
  }
  regclicked(){
    this.router.navigate(['register'])
  }
     userInfo(){
      this._auth.loginUser(this.userdtls.value)
      .subscribe(
        res =>{
          console.log('FROM SERVER:',res)
          localStorage.setItem('token',res.token)
          this.router.navigate(['home'])
          this.error=res
        },
        err=>{ 
        console.log("Error is",err)
        this.errors=err
        }
      )
      
    }
}
