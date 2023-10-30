import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-sports-setting',
  templateUrl: './sports-setting.component.html',
  styleUrls: ['./sports-setting.component.css']
})
export class SportsSettingComponent implements OnInit {

  sportList:any=[];
  
  sportId:any="4";
  constructor(private service:MatchService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getSportList()
  }
  getSportList() {
    let payload = {
      is_active: ""
    }
    this.service.getSportList(payload).subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
      }
      else { 
        this.toaster.error(res?.message)
      }
    })
 
  }
  onChange(id,val){

    let payload = {
      sport_id:id,
      is_active: val == true? "1":"0"

    }
    this.service.updateSportStatus(payload).subscribe((res)=>{
      if(res.status){
       this.getSportList();
       this.toaster.success(res?.message)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
}
