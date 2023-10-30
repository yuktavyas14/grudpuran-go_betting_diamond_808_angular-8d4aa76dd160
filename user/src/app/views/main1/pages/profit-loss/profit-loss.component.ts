import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {

  accountList:any;
  fromDate = new Date()
  toDate = new Date()
  page = 1;
  constructor(private service:MatchService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  getProfitLossList(){
   let payload = {
    page :this.page,
    from_date : this.fromDate,
    to_date : this.toDate,
    search : ''

   }
   this.service.getProfitLossList(payload).subscribe((res)=>{
     if(res?.status){

       this.accountList = res?.data?.data;
     }else{
    this.toaster.error(res?.message)
     }
   })
  }
}
