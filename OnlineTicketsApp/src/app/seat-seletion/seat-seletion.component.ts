import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BusListComponent } from '../bus-list/bus-list.component';
import { HomeComponent } from '../home/home.component';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-seat-seletion',
  templateUrl: './seat-seletion.component.html',
  styleUrls: ['./seat-seletion.component.css']
})
export class SeatSeletionComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private home: HomeComponent, private bl: BusListComponent,
    private FB: FormBuilder) { }
  seat: number[] = [];
  SSattheend: number[] = [];
  fare: any;
  Tax: any;
  Total: any;
  s: never
  buss = this.auth.getBus()
  passengers: any[] = []
  avlblSeats:any
  TotalSeats:any
  Booked:any
  Available:any
  ngOnInit(){this.TotalSeats=this.buss.seats;
    this.Booked=this.buss.bookedSeats.length;
    this.Available=((this.TotalSeats)-(this.Booked))-(this.seat.length)
   }
// Creating seats Array
  seats = [... new Array(this.buss.seats)].map((item, index) => {
    return {
      selected: this.buss.bookedSeats.includes(index + 1),
      seatNo: index + 1,
    }
  });
 
  // Click Event On Seat
  selectedSeats(seat: any) {
    if (!this.buss.bookedSeats.includes(seat.seatNo)) {
      seat.selected = !seat.selected;
    }

    // Pushig into SelectedSeats
    if (!this.seat.includes(seat.seatNo) && !this.buss.bookedSeats.includes(seat.seatNo)) {
      this.seat.push(seat.seatNo)
    }
    
    // Removing from selectedSeats if Seat is Clicked Twice
    else if (!this.buss.bookedSeats.includes(seat.seatNo)) {
      const index = this.seat.indexOf(seat.seatNo)
      this.seat.splice(index, 1)
    }
    // console.log('selected seats now', this.seat);
    this.Available=((this.TotalSeats)-(this.Booked))-(this.seat.length)
  }

  Data = this.auth.getJourneyDetails();
  from = this.Data.from;
  to = this.Data.to;
  dat = this.Data.date;

// calculating Total Fare
  amount() {
    this.fare = (this.seat.length) * this.buss.fare;
    this.Tax = this.fare * 0.1;
    this.Total = this.fare + this.Tax
    this.auth.putAmount(this.Total)
    return this.fare
  }

// Getting Passenger Details
  details(name: any, gender: any) {
    let x = { name: name, gender: gender }
    this.passengers.push(x)
    console.log(this.passengers);
  }

  // Routing To Payment Page
  paymentLink() {
    //Getting All Blocked Seats
        this.seats.map((item, index) => {
      if (item.selected) {
        this.SSattheend.push(item.seatNo)
      }
    })
    
    // Updating Blocked Seats in DB
    this.auth.updateSeats({ bookedSeats: this.SSattheend, id: this.buss._id })
      .subscribe(
        err => console.log(err),
        res => console.log('updatedseats', res)
      )
      // Passing All the Component Data to service
    this.auth.putSeatselectData({
      bus: this.buss,
      seatsselected: this.seat,
      passengers: this.passengers,
    })
    this.router.navigate(['payment'])
  }
  
}