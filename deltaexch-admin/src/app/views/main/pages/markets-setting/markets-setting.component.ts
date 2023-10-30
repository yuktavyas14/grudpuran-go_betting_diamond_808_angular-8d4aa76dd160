import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-markets-setting',
  templateUrl: './markets-setting.component.html',
  styleUrls: ['./markets-setting.component.css']
})
export class MarketsSettingComponent implements OnInit {

  sportList: any = [];
  seriesList: any = [];
  sportId: any = 0;
  status: any = "";
  searchKeyword: any;
  MatchList: any = [];
  marketList: any = [];
  matchList: any = [];
  updateSet: FormGroup;
  popUpMatchList = [];
  matchId: any = '0';
  marketData: any;
  seriesId: any = 0;
  selection_name: any = "";
  selection_id: any = "";
  selectionId: any;
  constructor(private service: MatchService, private toaster: ToastrService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getSportList();
    this.getSeriesList();
    this.getMatchList();
    this.getMarketList();
    // this.SearchMatch();
    this.updateSet = this.fb.group({
      score_key: ['', Validators.required],
      score_type: ['', Validators.required]
    })
  }


  autoResult(){
    this.service.autoResultDeclare({}).subscribe(res =>{
      if(res?.status){
        // alert()
        this.getMarketList();
        this.toaster.success(res?.message);
      }else{
        this.toaster.error(res?.message);
      }
    })
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
  changeMatch(val){
    // this.matchId = val;
   this.getMarketList();
  }
  onSeriesSelect(val) {
    this.matchId = 0

    this.getMatchList();
   this.getMarketList();
  }
  onChange(val) {
    // this.sportId = val;
    // this.getMarketList()
    // this.getSeriesList();
    // // this.getMatchList();


    this.seriesId = 0
    this.sportId =val;
    this.matchId = 0
    // this.getsp
    // this.getSportList()
    this.getSeriesList();
    this.getMatchList();
    this.getMarketList()
  }
  onTogalChange(id, market_id, val) {
    let payload = {
      match_id: id,
      market_id: market_id,
      status: val == true ? "1" : "0"

    }
    this.service.updateMarketStatus(payload).subscribe((res) => {
      if (res.status) {
       // this.getMarketList();
        this.toaster.success(res?.message)
      } else {
        this.toaster.error(res?.message);
      }
    })
  }

  resultDeclare() {
    let obj = {
      sport_id: this.marketData.sport_id,
      series_id: this.marketData.series_id,
      match_id: this.marketData.match_id,
      market_id: this.marketData.market_id,
      selection_id: this.selectionId,
      sport_name: this.marketData.sport_name,
      series_name: this.marketData.series_name,
      match_name: this.marketData.match_name,
      market_name: this.marketData.market_name,
      selection_name: this.selection_name


    }
    this.service.declareMarket(obj).subscribe((res) => {
      if (res?.status) {
        $('#declareMatch').modal('hide')

        this.getMarketList();

        this.toaster.success(res?.message);


      } else {
        $('#declareMatch').modal('hide')

        this.getMarketList();

        this.toaster.error(res?.message)
      }
    }
    )
  }

  // sport_id (optional)
  // series_id (optional)
  // match_id (optional)
  // market_id (optional)
  // status (optional, string) ("0", "1")
  // search (optional, string)
 
 async getMarketList() {
    let obj = {
      sport_id   : this.sportId == 0 ? '' : String(this.sportId),
      series_id  : this.seriesId == 0 ? '' : String(this.seriesId),
      // match_id   : this.matchId,
      match_id: this.matchId ==0 ? '':String(this.matchId),

      market_id  : '',
      status     : '',
      search     : ''
      

    }
    this.marketList = [];
    // getMarketListSetting
   await this.service.getMarketListSetting(obj).subscribe((res) => {
      if (res.status) {
        this.marketList = res?.data;
      } else {
        this.toaster.error(res?.message);
      }
    })
  }
  resultDeclarepop(data) {
    console.log(data);
    
    this.marketData={}
    this.popUpMatchList = [];
    // this.matchId = id;
    this.selection_name = '';
    this.marketData = data;
    let obj = {
      match_id: data?.match_id,
      market_id: data?.market_id
    }
    this.service.getSelectionMarket(obj).subscribe((res) => {
      if (res?.status) {
        this.popUpMatchList = res?.data;
      } else {
        this.toaster.error(res?.message);
      }
    })
    $('#declareMatch').modal('show');
  }

  updateSetting() {
    let obj = {
      match_id: this.matchId,
      score_key: this.updateSet.controls.score_key.value,
      score_type: this.updateSet.controls.score_type.value
    }
    this.service.updateMatchSettting(obj).subscribe((res) => {
      if (res?.status) {
        this.toaster.success(res?.message);
        $('#declareMatch').modal('hide')

      } else {
        this.toaster.error(res?.message);
      }
    })
  }


  selectionChange(match) {
    console.log(match);
    
    let selectedSelection= this.popUpMatchList.filter((item:any)=> item.selection_id ==match );
    this.selectionId= selectedSelection[0].selection_id;
    this.selection_name=selectedSelection[0].name;

    // for (let item of this.popUpMatchList) {

    //   // if (item.id === this.selection_id) {
    //   //   this.selectionId = String(item.selection_id);
    //   //   this.selection_name = String(item.selection_id);
    //   // }
    // }
  }

  marketAbandon(market) {
    let payload = {
      market_id: market?.market_id,
      market_name: market?.market_name,
      match_id: market?.match_id,
      match_name: market?.match_name,
      series_id: market?.series_id,
      series_name: market?.series_name,
      sport_id: market?.sport_id,
      sport_name: market?.sport_name
    }
    if(confirm("Are you sure you want to Abandoned Match ?")) {

    this.service.marketAbandon(payload).subscribe((res) => {
      if (res?.status) {
        this.getMarketList();
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    })
  }
  }
}
