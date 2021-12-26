import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { AuthService } from '../auth.service';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ticket-confirm',
  templateUrl: './ticket-confirm.component.html',
  styleUrls: ['./ticket-confirm.component.css']
})
export class TicketConfirmComponent implements OnInit {

  constructor(private auth:AuthService){ }
list:any
  ngOnInit(){
    console.log('Checking Seats',this.seats);
    var i=0
   for(let p of this.passengers){
       p['seatNo']=this.seats[i++]
     }
  }
  data=this.auth.getSeatselectData();
  bus=this.data.bus;
  passengers=this.data.passengers;
  seats=this.data.seatsselected;
  Amount=this.auth.getAmount();
 Data=this.auth.getJourneyDetails();
date=this.Data.date;

@ViewChild('ticket',{static:false})
// el:ElementRef
imgData:any
  DownloadPDF(){
let element=document.getElementById('ticketprint') as HTMLCanvasElement
 html2canvas(element).then((canvas)=>{
   this.imgData=canvas.toDataURL('image/png')
var doc =new jspdf()
var ht=canvas.height * 208/ canvas.width
doc.addImage(this.imgData,0,0,208,ht)
doc.save("ticket.pdf")
 })
}
}