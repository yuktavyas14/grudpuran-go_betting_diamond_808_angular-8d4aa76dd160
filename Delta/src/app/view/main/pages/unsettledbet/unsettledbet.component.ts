import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-unsettledbet',
  templateUrl: './unsettledbet.component.html',
  styleUrls: ['./unsettledbet.component.scss']
})
export class UnsettledbetComponent implements OnInit {
  data             = ['Matched', 'Un Matched', 'Deleted']
  betList          : any;
  page             = 1;
  limit            = 10;
  totalrecored     : any =0;
  config           : any;
  itemsPerPage     : any = 10;
  betType          : any = 'M';
  constructor(private toster: ToastrService, private matchService : MatchService) { }

  ngOnInit(): void {
    this.getUnsettledbet(this.betType)
  }


  getUnsettledbet(type :any){
    this.betType = type
    let payload = {
   
      bet_type : this.betType,
    }
    this.matchService.getUnsettaledBetList(payload).subscribe((res)=>{
      if(res?.status){
      this.betList= res?.data?.data;
      if(res?.data?.total?.total_count != 0){
        this.totalrecored = res?.data.total?.total_count;
      }
      this.itemsPerPage = res?.data?.limit;

      this.config = {
       currentPage: this.page,
       itemsPerPage: this.itemsPerPage,
       totalItems: this.totalrecored
   };
      }else{
         this.toster.error(res?.message)
      }
    })
  }

  trackByFn(index: any, item:any) {
    return index; // or item.id
}

pageChange(newPage: number) {
  this.page = newPage;
  this.getUnsettledbet(this.betType)
}
}
