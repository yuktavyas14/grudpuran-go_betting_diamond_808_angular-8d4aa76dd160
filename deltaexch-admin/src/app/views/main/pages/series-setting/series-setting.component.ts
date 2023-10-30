import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-series-setting',
  templateUrl: './series-setting.component.html',
  styleUrls: ['./series-setting.component.css']
})
export class SeriesSettingComponent implements OnInit {
  seriesList  :any;  
  sportList   :any;
  sportId     :any = '0';
  constructor(private service:MatchService,private toaster:ToastrService) { }

  ngOnInit(): void {
this.getSportList();
  }
  getSportList() {
    let payload = {
      is_active: "1"
    }
    this.service.getSportList(payload).subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
        this.sportId = this.sportList[0].sport_id;
      
       this.getSeriesList(this.sportId);
      }
      else {
        this.toaster.error(res?.message)
      }
    })

  }

  getSeriesList(id) {
    let payload = {
      sport_id:id ==0 ? '':id,
      // is_active : '',
      // search : ''
    }
    this.service.getSeriesList1(payload).subscribe((res) => {
      if (res.status) {
        this.seriesList = res.data;
      }
      else { 
        this.toaster.error(res?.message)
      }
    })
 
  }
  onChangeSport(data){
     this.getSeriesList(data)
  }
  onChange(id,val){

    let payload = {
      series_id:id,
      is_active: val == true? "1":"0"

    }
    this.service.updateSeriesStatus(payload).subscribe((res)=>{
      if(res.status){
this.getSeriesList(this.sportId)
       this.toaster.success(res?.message)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }

}
