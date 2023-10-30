import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exposure-detail',
  templateUrl: './exposure-detail.component.html',
  styleUrls: ['./exposure-detail.component.scss']
})
export class ExposureDetailComponent implements OnInit {

 
  constructor(private service:MatchService,private toaster:ToastrService) { 
    this.getExposureDetailList();
  }
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit=10;
  totalrecored;
  config;
  exposureDetailList :any = []
  openingList:any;
  type='All'
  itemsPerPage:any;
  userListData:any;
  totalSum:any;
  match_id:any;
  market_id:any;
  ngOnInit(): void {
  }
  trackByFn(index, item) {
    return index; // or item.id
}
  getExposureDetailList(){
    let payload = {
      
    }
    this.exposureDetailList = []
    this.openingList = {}
    this.service.userDetailForUser(payload).subscribe((res)=>{
      if(res?.status){
      this.exposureDetailList = res?.data?.data;
      
    }
  })
}
  
  
  checkNumberPositvie(values: any){
    if(values >= 0){
        return true;
      }
      else{
      return false;
      }
    }

}
