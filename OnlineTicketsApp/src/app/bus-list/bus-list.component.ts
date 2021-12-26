import { TmplAstBoundText } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private comp: HomeComponent) {
  }
  events: any
  e: any
buses:any
avlblSeats:any
  ngOnInit() {
  let Details=this.auth.getJourneyDetails();
    let y = {
      source:Details.from,
      destination:Details.to
    }
    this.auth.events(y)
      .subscribe(
        res => {
          this.buses = res,
          this.auth.putBus(this.buses)
            console.log('buses are:', this.buses)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401)
              this.router.navigate(['/login'])
          }
        }
      )
  }
  


  goToSeats(b:any) {
    console.log('selected Bus',b);
    this.auth.putBus(b)
    this.router.navigate(['seats'])
  }
  check() {
    if (this.buses.length!==0)
    {
      console.log('len',this.buses.length);
      
      return true;
    }
    else {
      return false;
    }
  // for(let i of this.buses){
  //   this.avlblSeats=(i.totalseats)-(i.bookedSeats.length);
  // }
  }
}