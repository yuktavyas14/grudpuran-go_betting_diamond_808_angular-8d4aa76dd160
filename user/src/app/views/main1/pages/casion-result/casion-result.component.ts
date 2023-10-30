import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { FormControl } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-casion-result',
  templateUrl: './casion-result.component.html',
  styleUrls: ['./casion-result.component.scss'],
  providers : [DatePipe]
})
export class CasionResultComponent implements OnInit {


  constructor(private service: MatchService , private ac : ActivatedRoute , public datepipe : DatePipe) { }
  betlist:any = []
  matchDetails: any = {

  }
  sportId:any='';
  fiveCricketArray: any;
  fiveCricet_data: any;
  cardResult:any;
  cardResultArray:any;
  betType:any='';
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit=10;
  totalrecored;
  config;
  searchKey = new FormControl('')

itemsPerPage;
  sportList:any = [];
  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.sportId = param.get('id');
    })


    this.searchKey.valueChanges.subscribe(value => {
      // this.getUnsettledbet(this.betType)
      this.getCasinoResult()
    });


    this.getCasinoSportList()
    this.getCasinoResult()
  }

  getCasinoSportList(){
    let payload = {
      is_active :''
    }
    this.service.getCasinoSportList().subscribe((res)=>{
      if(res?.status){
      this.sportList = res?.data;
      }
    })
  }
  getCasinoResult(){


    let payload = {
      match_id : this.sportId,
      page : this.page,
      date : this.datepipe.transform((this.toDate), 'yyyy-MM-dd') ,
      market_id : this.searchKey.value
  };
   this.service.marketResultDetailsByMarketId(payload).subscribe((res)=>{
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

     }
   })
  }
  trackByFn(index, item) {
    return index; // or item.id
}
GetWinnerName(value:string){
  let winnerNameList=this.cardResult.winner_name.split(",");
  return winnerNameList.includes(value);

}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getCasinoResult();
  }




  openResult(result){
 
   this.cardResult = [];
   this.cardResultArray = []
    let market_id= result.market_id.split(result.match_id+'_').pop();
   market_id= market_id.split('_').shift();

  console.log(market_id , "result")
  console.log(result , "result")
    //$('#modalInstanceWorliresult').show();
    this.matchDetails.match_id = result.match_id
    this.matchDetails.market_id = market_id

    // console.log(this.matchDetails , "match detail")
    let marketData = {
     market_id: market_id,
     match_id: result.match_id

 };
 this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
 if (!response.error) {
     if(response.data != null){
     //  $('#modalLastResults').show();
   $('#modalLastResults').modal('show');
   this.fiveCricketArray = response.data.data[0];
   this.fiveCricet_data = JSON.parse(response.data.data[0].card_data);
   this.cardResult = response.data.data[0];
   this.cardResultArray = JSON.parse(response.data.data[0].card_data);
  //  console.log(this.cardResultArray, this.cardResult,'jklkjklk')
     // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
     //     console.log(this.oddEven);





 }
 else{
     console.log('No Data Found')
 }
 }
 }, error => {
 });
 }
 closeResultModal(){
   $('#modalLastResults').modal('hide');


 }
}
