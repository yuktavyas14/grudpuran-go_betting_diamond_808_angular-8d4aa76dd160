import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-casion-result-bet',
  templateUrl: './casion-result-bet.component.html',
  styleUrls: ['./casion-result-bet.component.scss'],
  providers : [DatePipe]
})
export class CasionResultBetComponent implements OnInit {
  public casinoSports:any;

  constructor(private service: MatchService , public toster : ToastrService) { }
  betlist:any = []
  sportId:any='';
  betType:any='';
  fromDate = new Date();
  toDate = new Date();
  page = 1;
  searchKey = new FormControl('')

  limit=10;
  totalrecored:any;
  config:any;

  // limit = 100

itemsPerPage:any;
  sportList:any = [];
  ngOnInit(): void {
    this.searchKey.valueChanges.subscribe(value => {
      // this.getUnsettledbet(this.betType)
      // this.getBetHistory()
    });
    this.getCasinoSports()
  }

  getSportList(){
    let payload = {
      is_active :''
    }
    this.service.getSportList(payload).subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }
  getCasinoResult(){
    let payload={
      page :this.page,
      sport_id: this.sportId,
       bet_type:this.betType,

       to_date  :this.toDate,
      from_date: this.fromDate

      // search :
    }
   this.service.getCasinoResultbet(payload).subscribe((res)=>{
     if(res?.status){
       this.betlist = []
      this.betlist = res?.data?.data;
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
  trackByFn(index:any, item:any) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getCasinoResult();
  }



  getCasinoSports(){
    this.service.getCasinoSport().subscribe((res)=>{
      if(res?.status){
      this.casinoSports = res?.data;
      // console.log(this.casinoSports , "test")
      }
    })
  }
}
