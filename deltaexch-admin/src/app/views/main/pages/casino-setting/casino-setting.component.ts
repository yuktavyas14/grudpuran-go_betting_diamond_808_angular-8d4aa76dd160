import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';
@Component({
  selector: 'app-casino-setting',
  templateUrl: './casino-setting.component.html',
  styleUrls: ['./casino-setting.component.css']
})
export class CasinoSettingComponent implements OnInit {

  sportList:any=[];

  sportId:any="4";

  betlock
  chipvalue
  constructor(private service:MatchService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getSportList()
  }
  getSportList() {
    let payload = {
      is_active: ""
    }
    this.service.getCasinoSport().subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
      }
      else {
        this.toaster.error(res?.message)
      }
    })

  }
  onChange(id,val,  chipvalue, betlock){

    let payload = {
      sport_id:id,
      is_active: val == true? "1":"0",
      bet_lock : betlock == true? "1":"0" ,
      show_chip_value_popup: chipvalue == true? "1":"0"


    }
    this.service.updateCasinoSports(payload).subscribe((res)=>{
      if(res.status){
       this.getSportList();
       this.toaster.success(res?.message)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
}
