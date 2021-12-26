import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// id='60cc325e9349da4c88b3485e'
id:string

private _registerUrl="http://localhost:3000/api/register";
private _loginrUrl="http://localhost:3000/api/login";
private _bussesUrl="http://localhost:3000/api/buses";
placs:any
bill:any
bus:any
passengers:any
dataFromSeatselect:any
jrnyDtls:any
  constructor(private http: HttpClient,private router:Router) { }

  registerUser(user:any){
    return this.http.post<any>(this._registerUrl,user)
  }
  loginUser(user:any){
    return this.http.post<any>(this._loginrUrl,user) 
    
  }
  events(places:any){
    return this.http.post<any>(this._bussesUrl,places) 
  }
//   places(p:any){
//     this.placs=p
//   }
//  getplaces(){
//    return this.placs
//  }
 putJourneyDetails(data:any){
  this.jrnyDtls=data
 }
 getJourneyDetails(){
   return this.jrnyDtls
 }
  public isLoggedIn():boolean{  
    var x= (!!localStorage.getItem('token') && localStorage.getItem('token')!=='undefined') 
    return x;
  }

  getToken(){
    return localStorage.getItem('token')
  }
  logOut(){
     localStorage.removeItem('token')
     this.router.navigate([''])
     return true;
  }
  putAmount(t:any){
    this.bill=t;
  }
  getAmount(){
    return this.bill;
  }

  // To know which bus is displayed
  putBus(bus:any){
    this.bus=bus;
  }
  // Displaying Bus Details
  getBus(){
    return this.bus
  }
  putPassengers(list:any){
  this.passengers=list
  }
  getPassengers(){
    return this.passengers
  }
  updateSeats(seats:any){
 this.id=seats._id
 let _updateSeats=`http://localhost:3000/api/bookedseats`
    console.log('Checening Here',seats);
    return this.http.put<any>(_updateSeats,seats)
  }
putSeatselectData(data:any){
  this.dataFromSeatselect=data;
}
getSeatselectData(){
  return this.dataFromSeatselect;
}
}
