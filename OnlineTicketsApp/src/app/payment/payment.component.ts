import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SeatSeletionComponent } from '../seat-seletion/seat-seletion.component';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private FB:FormBuilder, private router:Router,private auth:AuthService) {
    console.log('amount',this.x);
    
   }

payment=this.FB.group({
  number:['',[Validators.required,Validators.minLength(16)]],
  name:['',[Validators.required,Validators.minLength(5)]],
  cvv:['',[Validators.required]],
  expdate:['',Validators.required],
  upiID:['',Validators.required]
})
get num(){
// console.log('Check',this.payment.valid);

return this.payment.controls['number']

}
get name(){
return this.payment.controls['name']

}
get cvv(){
return this.payment.controls['cvv']
}
get date(){
return this.payment.controls['expdate']
}
get upiID(){
  // console.log( this.payment.controls['upiID'].hasError('required'))
  return this.payment.controls['upiID']
}
months=[
  {month:"Jan"},
  {month:"Feb"},
  {month:"Mar"},
  {month:"Apr"},
  {month:"May"},
  {month:"Jun"},
  {month:"Jul"},
  {month:"Aug"},
  {month:"Sep"},
  {month:"Oct"},
  {month:"Nov"},
  {month:"Dec"},
]
years=[
  {year:2021},
  {year:2022},
  {year:2023},
  {year:2024},
  {year:2025},
]
  ngOnInit(): void {
    console.log('Credit',this.selected);
    console.log('UPI',this.upis);
  }
check(){
var x=this.name.valid && this.num.valid && this.cvv.valid;
return x
}

selected=false
upis=false
count=0;
card:boolean=true;
UPI:boolean=false;

credit(){
this.UPI=!this.UPI
this.card=!this.card  
}
upi(){
  this.UPI=!this.UPI
  this.card=!this.card
}
x=this.auth.getAmount()
randomId=Date.now()
end(){
  this.router.navigate(['/thankyou'])
  }
}
