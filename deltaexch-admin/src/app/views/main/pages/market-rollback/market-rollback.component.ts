import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/model/user';
declare var $: any;

@Component({
  selector: 'app-market-rollback',
  templateUrl: './market-rollback.component.html',
  styleUrls: ['./market-rollback.component.css']
})
export class MarketRollbackComponent implements OnInit {

  sportList: any = [];
  seriesList: any = [];
  sportId: any = 0;
  status: any = "";
  searchKeyword: any;
  MatchList: any = [];
  declaredMarketlist: any = [];
  matchList: any = [];
  updateSet: FormGroup;
  popUpMatchList=[];
  matchId: any='';
  marketData:any;
  seriesId: any = 0;
  selection_name:any="";
  totalItems:any= 2;
  itemPerPage:any;
  page= 1;
  config:any;
  selectionId:any;
  useradmininfo = new User()?.getData();
  gloabalData:any;
  constructor(private service: MatchService, private toaster: ToastrService, private fb: FormBuilder) { 
    this.getGlobalSetting();
  }
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
 getGlobalSetting(){
    this.service.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
        this.gloabalData = res?.data

      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }

getMatchList(){
  let obj = {
    sport_id: this.sportId == 0 ? "":this.sportId,
    is_active: "",
    search: "",
    series_id: this.seriesId == 0 ?"":this.seriesId
  }
  this.service.getMatchListAdded(obj).subscribe((res) => {
    if (res?.status) {
      this.MatchList = res?.data;
      this.getMarketList();
    } else {
      this.toaster.error(res?.message);
    }
  })
}


getSeriesList(){
  let obj = {
    sport_id: this.sportId == 0 ? "":this.sportId
    
  }
  this.service.getSeries(obj).subscribe((res) => {
    if (res?.status) {
      this.seriesList = res?.data;
      //this.getMarketList();
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

  pageChanged(page){
    this.page = page;
    this.getMarketList()
  }
  onSeriesSelect(val) {
    this.matchId = 0
  this.getMatchList();
  // this.getMarketList();

  }
  
  onChange(val) {
    this.seriesId = 0
    this.sportId =val;
    this.matchId = 0
    // this.getsp
    // this.getSportList()
    this.getSeriesList();
    this.getMatchList();
    this.getMarketList()

  }





  getMarketList() {
    let obj = {
      sport_id: this.sportId== 0? '':String(this.sportId),
      series_id: this.seriesId==0? '':String(this.seriesId),
      match_id: this.matchId ==0 ? '':String(this.matchId),
      page:this.page

    }
    this.declaredMarketlist = [];
    this.service.getDeclaredMarket(obj).subscribe((res) => {
      if (res.status) {
        this.declaredMarketlist = res?.data?.data;
        if(this.page === 1){
          this.totalItems= res?.data?.total;

        }

        this.itemPerPage = res?.data?.limit;
        this.config = {
          itemsPerPage: this.itemPerPage,
          currentPage: this.page,
          totalItems: this.totalItems
         }
      } else {
        this.toaster.error(res?.message);
      }
    })
  }
  resultRollback(data) {
    this.marketData = data;
    if(this.marketData?.type === "1"){
    let obj = {
      bet_result_id :data?.bet_result_id,
      match_id:data?.match_id,
      market_id:data?.market_id
    }
    this.marketRollback(obj) 

  }else{
    // debugger
    let obj = {
      bet_result_id :data?.bet_result_id,
      match_id:data?.match_id,
      fancy_id:data?.market_id
    }
    this.fancyRollback(obj) 
  }
  }

marketRollback(data){
  let path = '/api/betResult/rollbackMarketResult';
  this.service.marketRollback(path,data).subscribe((res)=>{
    if(res?.status){
    this.toaster.success(res?.message);
    this.getMarketList();
    }else{
      this.toaster.error(res?.message);
    }
  })

}
fancyRollback(data){
  let path = '/api/betResult/rollbackFancyResult';
  this.service.marketRollback(path,data).subscribe((res)=>{
    if(res?.status){
    this.toaster.success(res?.message);
    this.getMarketList();
    }else{
      this.toaster.error(res?.message);
    }
  })
}


  selectionChange(match){
    for(let item of this.popUpMatchList){
      if(item.name === this.selection_name){
        this.selectionId =String(item.id);
      }
    }
  }

  changeMatch(val){
    // this.matchId = val;
   this.getMarketList();
  }

}
