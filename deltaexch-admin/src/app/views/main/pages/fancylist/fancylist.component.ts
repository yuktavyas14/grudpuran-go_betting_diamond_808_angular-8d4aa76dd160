import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-fancylist',
  templateUrl: './fancylist.component.html',
  styleUrls: ['./fancylist.component.css']
})
export class FancylistComponent implements OnInit {
  seriesId = 0;
  sportList
  seriesList
  MatchList
  fancyList: any = [];
  sportId: any= 0;
  sereiesId: any;
  mgs = [];
  matchId: any = 0;
  amountFormControl = new FormControl('');
  marketData:any;
  constructor(private service: MatchService, private toaster: ToastrService,) { }

  ngOnInit(): void {
    this.getMatchList()
    this.getSportList()
    this.getSeriesList()
    this.getFancyList()
  }
  changeMatch(val){
    // this.matchId = val;
   this.getFancyList();
  }
  onSeriesSelect(val) {
    
    this.getMatchList();
   this.getFancyList();
  }
  onChange(val) {
    this.getFancyList()
    this.getSeriesList();
    // this.getMatchList();

  }
  getFancyList() {
    let payload = {
      sport_id  : this.sportId == 0 ? "" : this.sportId,
      series_id  :this.seriesId == 0 ? "" : this.seriesId,
      match_id  : this.matchId == 0 ? "" : this.matchId,
      status  : '',
      search : ''
    }
    this.service.getfancyListsetting(payload).subscribe((res) => {
      if (res.status) {
        this.fancyList = res.data;
        console.log(this.fancyList, "test")
      } else {
        // this.toaster.error(res?.message)
      }
    }
   
    
    )

  }




  updateFancyStatus(id,status){
    let payload = {
     fancy_id:id,
     status : status
    }
    this.service.updateFancyStatus(payload).subscribe(res=>{
      if(res?.status){
        this.toaster.success(res?.message);
        this.getFancyList();
      }else{
        this.toaster.error(res?.message)
      }
    })
  }
  
  updateFancymessage(fancyId,i){
    let mgs = (<HTMLInputElement>document.getElementById(i)).value; 
    let payload = {
      fancy_id:fancyId,
       message:mgs
    }
    this.service.updateFancyMessage(payload).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message);
        this.getFancyList();
      }else{

        this.toaster.error(res?.message);
      }
    })
  }
  fancyAbandon(fancy) {

    let payload = {
      match_id: fancy?.match_id,
      match_name: fancy?.match_name,
      series_id: fancy?.series_id,
      series_name: fancy?.series_name,
      sport_id: fancy?.sport_id,
      sport_name: fancy?.sport_name,
      fancy_id: fancy?.fancy_id,
      is_rollback: 0,
      fancy_name: fancy?.name


    }
    if (confirm("Are you sure you want to Abandoned Fancy ?")) {

      this.service.fancyAbandon(payload).subscribe((res) => {
        if (res?.status) {
          this.getFancyList();
          this.toaster.success(res?.message);
        } else {
          this.toaster.error(res?.message);
        }
      })
    }
  }


  
  resultDeclare(fancy,i) {
    let value = (<HTMLInputElement>document.getElementById('result'+i)).value; 
    let obj = {
      sport_id: fancy.sport_id,
      series_id: fancy.series_id, 
      match_id: fancy.match_id,
      sport_name: fancy.sport_name,
      series_name: fancy.series_name,
      match_name: fancy.match_name,
      fancy_id: fancy?.fancy_id,
      result: value,
      fancy_name: fancy?.name

    }
    this.service.declareFancy(obj).subscribe((res) => {
      if (res?.status) {

        $('#declareFancy').modal('hide')

        this.getFancyList();
        this.amountFormControl.reset();
        this.toaster.success(res?.message);


      } else {
        $('#declareFancy').modal('hide')

        this.toaster.error(res?.message)
      }
    }
    )
  }




  getMatchList() {
    let obj = {
      sport_id: this.sportId == 0 ? "" : this.sportId,
      is_active: "",
      search: "",
      series_id: this.seriesId == 0 ? "" : this.seriesId
    }
    this.service.getMatchListAdded(obj).subscribe((res) => {
      if (res?.status) {

        this.MatchList = res?.data;
      } else {
        this.toaster.error(res?.message);
      }
    })
  }


  getSeriesList() {
    let obj = {
      sport_id: this.sportId == 0 ? "" : this.sportId

    }
    this.service.getSeries(obj).subscribe((res) => {
      if (res?.status) {
        this.seriesList = res?.data;
      //  this.getMarketList();
      } else {
        this.toaster.error(res?.message);
      }
    })
  }

  /**
   * for getting list of the sports
   */
  getSportList() {
    let payload = {
      is_active: "1"
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
}
