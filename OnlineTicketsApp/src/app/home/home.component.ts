import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BusListComponent } from '../bus-list/bus-list.component';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  to: any;
  from: any;
  Date: any
  constructor(private auth: AuthService, private router: Router) { }

  events: any;
  blist: any;
  source = null;
  dstntn = null;
  date = null;
  options= [
    { id: 1, place: "Hyderabad" },
    { id: 2, place: "Chennai" },
    { id: 3, place: "Bangalore" },
    { id: 4, place: "Pune" },
  ]

  ngOnInit() {}
  
  e: any
  buses:any
  buslist() {
    let JrnyDtls = {
      from: this.source,
      to: this.dstntn,
      date: this.Date
    }
    this.auth.putJourneyDetails(JrnyDtls)
    this.router.navigate(['buslist'])
  }
}
