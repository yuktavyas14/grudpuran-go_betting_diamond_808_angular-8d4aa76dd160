import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatchService } from 'src/app/core/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { ShortNumberPipe } from 'src/app/core/pipes/short-number.pipe';

declare var $:any;

@Component({
  selector: 'app-casino-result',
  templateUrl: './casino-result.component.html',
  styleUrls: ['./casino-result.component.scss'],
  providers : [ShortNumberPipe,DatePipe]
})
export class CasinoResultComponent implements OnInit {
  // Casino_Type = [{
  //   teen:
  // }]
  constructor(private service: MatchService , private ac : ActivatedRoute , public shorterNumber: ShortNumberPipe,
    public datepipe : DatePipe) { }
    betlist:any = []
    matchDetails: any = {

    }
    sportId:any='';
    cardResult:any;
    cardResultArray:any;
    betType:any='';
    fromDate = new Date();
    toDate = new Date();
    page = 1;
    limit=10;
    totalrecored:any=0;
    config:any;
    fiveCricketArray: any;
    fiveCricet_data: any;
  itemsPerPage:any;
    sportList:any = [];
    ngOnInit(): void {
      this.ac.paramMap.subscribe((param) => {
        this.sportId = param.get('id');
      })
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
        // market_id: result.mid
    };
     this.service.marketResultDetailsByMarketId(payload).subscribe((res)=>{
       if(res?.status){
         this.betlist = []
        this.betlist = res?.data?.data;
        if(res?.data?.total != 0){
          this.totalrecored = res?.data?.total ? res?.data?.total : 0;
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
    trackByFn(index:any, item:any) {
      return index; // or item.id
  }
    pageChange(newPage: number) {
      this.page = newPage;
      this.getCasinoResult();
    }
    GetWinnerName(value:string){
      let winnerNameList=this.cardResult.winner_name.split(",");
      return winnerNameList.includes(value);

    }



    openResult(result:any){
      let market_id= result.market_id.split(result.match_id+'_').pop();
      market_id= market_id.split('_').shift();
      this.matchDetails.match_id = result.match_id
      this.matchDetails.market_id = result.market_id
      if(result.match_id =='-1018' || result.match_id =='-1025'){
        this.showLastResultsFiveCricket(result);
        return
       }
     this.cardResult = [];
     this.cardResultArray = []

      // console.log(result.match_id , "result")
      //$('#modalInstanceWorliresult').show();


      // console.log(this.matchDetails , "match detail")
      let marketData = {
       market_id: market_id,
       match_id: result.match_id

   };
   this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
   if (!response.error) {
       if(response.data != null){
       //  $('#modalLastResults').show();



      this.cardResult = response.data.data[0];
      this.cardResultArray = JSON.parse(response.data.data[0].card_data);
      console.log('cardResultArray',this.cardResultArray)
      $('#modalLastResults').modal('show');



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
     $('#modalFiveCricket').modal('hide');


   }
   showLastResultsFiveCricket(result: any) {
    let self= this;
    let marketData = {

      //  market_id: '41.2114091208400'
      market_id: result.market_id,
      match_id: result.match_id
    };
    this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        self.fiveCricketArray = response.data.data[0];
        self.fiveCricet_data = JSON.parse(response.data.data[0].card_data);
        //  $('#modalFiveCricket').show();
         $('#modalFiveCricket').modal('show');
         console.log('modalFiveCricket',this.fiveCricketArray)
         console.log('modalFiveCricket',this.fiveCricet_data)

      }
    }, error => {
    });
  }
  }
