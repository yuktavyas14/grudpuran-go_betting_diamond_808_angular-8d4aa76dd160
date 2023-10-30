import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-unsettledbet',
  templateUrl: './unsettledbet.component.html',
  styleUrls: ['./unsettledbet.component.scss']
})
export class UnsettledbetComponent implements OnInit {
 betType = 'M'
  constructor(private service:MatchService,private toaster:ToastrService) { }
  betList = []
  page = 1;

  limit=10;
  totalrecored;
  searchKey = new FormControl('')

  config;

itemsPerPage;
  ngOnInit(): void {
    this.searchKey.valueChanges.subscribe(value => {
      this.getUnsettledbet(this.betType)
    });

    this.getUnsettledbet('M')
  }

  getUnsettledbet(type){
    this.betType = type
    let payload = {
      page   : 1,
      bet_type : this.betType,
      search : this.searchKey.value

    }
    this.service.getUnsettaledBetList(payload).subscribe((res)=>{
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
         this.toaster.error(res?.message)
      }
    })
  }



  pageChange(newPage: number) {
    this.page = newPage;
    this.getUnsettledbet(this.betType)
  }

}
