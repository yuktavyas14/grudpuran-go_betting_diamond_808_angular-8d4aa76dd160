import { Component, OnInit } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.css']
})
export class CommissionSettingComponent implements OnInit {
  currencyName      : any  
  Updatevalue       : any;
  Currencyvalue     : any 
  CurrencyList      : any =[];
  constructor(private matchservice: MatchService, private toster: ToastrService) { }

  ngOnInit(): void {
    //this.getCurrency()
  }


  trackByFn(index: any, item: any) {
    return index;
   }

  // getCurrency(){
  //   this.matchservice.getCurrency({}).subscribe((res)=>{
  //     if(res?.status){
  //       this.CurrencyList = res?.data;
  //     } else{
  //     }
  //   })
  // }


//   addCurrency(){
//     let payload = {
//     currency_name : this.currencyName,
//     value         : this.Currencyvalue
//   }
//   this.matchservice.addCurrency(payload).subscribe((res)=>{
//     if(res?.status){
//       document.getElementById('Add-Account').click();
//       this.toster.success(res?.message)
//       this.getCurrency()
//     } else {
//       this.toster.error(res?.message)
//     }
//   })
//   }



//   updateCurrency(data){
//     let payload = {
//     currency_id   : data.currency_id,
//     value         : data.value
//   }
//   this.matchservice.updateCurrency(payload).subscribe((res)=>{
//     if(res?.status){
//       this.getCurrency()
//       this.toster.success(res?.message)
//     } else {
//       this.toster.error(res?.message)
//     }
//   })
// }
}