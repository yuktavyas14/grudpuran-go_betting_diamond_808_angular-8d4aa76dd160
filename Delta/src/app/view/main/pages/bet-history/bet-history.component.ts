import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {
  betHistoryForm   : FormGroup
  sportList        : any;
  totalrecored     : any;
  itemsPerPage     : any;
  config           : any
  page             = 1;
  maxDate = new Date();
  minDate = new Date();
  minDateTo = new Date();
  maxDateTo = new Date();
  // type='All'
  limit            = 10;
  betlist          : any;
  constructor(private toster:ToastrService ,private formBuilder: FormBuilder, private matchService : MatchService) { 
    this.minDate.setDate(this.minDate.getDate() - 30);
    this.maxDate.setDate(this.maxDate.getDate() + 0);
    this.minDateTo.setDate(this.minDateTo.getDate() - 30);
    this.maxDateTo.setDate(this.maxDateTo.getDate() + 0);
    var date = new Date();
    date.setDate(date.getDate() - 7);
    this.betHistoryForm = this.formBuilder.group({
      sport_id    : [''],
      bet_type    : [''],
      from_date   : [new Date(date)],
      to_date     : [new Date()]
  });
  }

  ngOnInit(): void {
    this.getSportList()
  }

  getSportList(){
    let payload = {
      is_active :''
    }
    this.matchService.getSportList(payload).subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }


  getBetHistory(data: any){
    data['page'] = this.page;
    this.matchService.getBetHistory(data).subscribe((res)=>{
      if(res?.status){
        // console.log("res",res)
        this.betlist = []
       this.betlist = res?.data?.data;
       if(res?.data?.total != 0){
         this.totalrecored = res?.data?.total;
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

  trackByFn(index :any, item : any) {
    return index; 
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getBetHistory(this.betHistoryForm.value);
  }
}
