import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private auth:AuthService,private router:Router, private FB:FormBuilder) { }
  dtls=this.FB.group({
   name:['',Validators.required],
   email:['',Validators.required],
   mobile:['',Validators.required],
   password:['',Validators.required],
   DOB:['',Validators.required],
   gender:['',Validators.required],
  })

  get name(){
    return this.dtls.controls['name']
    console.log(this.dtls.value);
    
  }
  get gender(){
    return this.dtls.controls['gender']
  }
  get email(){
    return this.dtls.controls['email']
  }
  get mobile(){
    return this.dtls.controls['mobile']
  }
  get password(){
    return this.dtls.controls['password']
  }
  get DOB(){
    return this.dtls.controls['DOB']
  }

// registerUserData={
//   name:'',
//   email:'',
//   mobile:'',
//   password:"",
//   DOB:'',
//   gender:""
// }

  ngOnInit(): void {
  }
  registerUser(){
    // console.log(this.registerUserData); 
    this.auth.registerUser(this.dtls.value)
    .subscribe(
      res=>{
        console.log("REGISTERED USER IS:",res); 
        localStorage.setItem('token',res.token)
        this.router.navigate(['home'])
      },
     err=> {
       console.log(err)  
        }
    )

  }
}
