import { Location, } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'q';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { MatchService } from 'src/app/core/services/match.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShortNumberPipe } from 'src/app/core/pipes/short-number.pipe';
import { SocketService } from 'src/app/core/services/socket.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
  query,
  group,
  stagger
} from "@angular/animations"

declare var $: any;


@Component({
  selector: 'app-casino-match-details',
  templateUrl: './casino-match-details.component.html',
  styleUrls: ['./casino-match-details.component.scss'],
  providers: [ShortNumberPipe, SocketService],
  animations: [
    trigger("flip", [
      transition('*=>*', [
        animate(".6s", keyframes([
          style({ transform: "rotateX(0deg)", offset: 0 }),
          style({ transform: "rotateX(-90deg)", offset: .5 }),
          style({ transform: "rotateX(-180deg)", offset: 1 }),
        ]))
      ])
    ])]
})
export class CasinoMatchDetailsComponent implements OnInit, OnDestroy {
  home: any;
  away: any;
  ballByBallScore: any;
  public loading = false;

  matchId: any;
  sportId:any;
  marketId: any;
  sub$ = Subscription;
  userInfo = new User().getData();
  matchDetails: any;
  scoreType: any;
  scoreKey: any;
  scoreboardDetails: any;
  stackList: any;  // button values
  betType = 'M';
  matchDetailsSocketData: any = []
  betList: any = [];
  betdetails: any = {}
  stackValue = 0;
  odds = 0;
  showBetslip: Boolean = false;
  betplaceType: any;
  teamName: any;
  selectedIndex: any = 'Fancy';
  slectionIDs: any;
  slectedIDteams: any = []
  teamLastPosition: any = []
  changeText: boolean;
  documents: any;
  displayScore: boolean = false;
  fancyPostion: any;
  bets: any;
  tvUrlCricket: any;
  selectedIndex2: number = -1;
  // matchDetailsSub$    : Subscription ;
  maxIndexWinner = -1;
  value = 0;
  oldvalue = 0;
  newvalue = 0;
  value1 = 0;
  oldvalue1 = 0;
  newvalue1 = 0;
  isLiveSport: any;
  public callType = 1
  public tvUrl: any;
  isShowTv: boolean = false;
  public safeSrc: any;
  id: any;
  card_dataArray: any;
  card_data32Array: any;
  instanceWorliArray: any;
  bollywoodArray: any;
  card_data32: any;
  instanceWorli: any;
  oddEven: any;
  card_dataArray1: any;
  card_data: any;
  aall: any;
  ball: any;
  minMaxShow = -1;
  isMinMax = false;
  isDragon = true;
  isTiger = false;
  cardResult: any;
  cardResultArray: any;
  fiveCricketArray: any;
  fiveCricet_data: any;
  isBetPopUp:string='back';
  chartData:any;
  staticArray= [40,45,15];
  isShowStatic= false;
  isCasinoWar='1';
  firstRowData:any;
  firstRowData1:any;

  secondRowData:any;
  secondRowData1:any;
  thirdRowData:any;
  thirdRowData1:any;
  fourthRowData:any;
  fourthRowData1:any;
  fifthRowData:any;
  fifthRowData1:any;
  sixthRowData:any;
  sixthRowData1:any;
  sessionMarketFancy :any
  overByOverFancy :any
  ballByBallFancy :any
  runnerJsonPerviousData:any;
  runnerJsonLastResultPerviousData:any;
  constructor(private socketService: SocketService, public shorterNumber: ShortNumberPipe,
    private loader: NgxSpinnerService, private location: Location,
    private activatedRoute: ActivatedRoute, public matchService: MatchService,
    private toaster: ToastrService, private sanitizer: DomSanitizer, private router: Router,) {
    // this.sub$       = this.activatedRoute.paramMap.subscribe((param) => {
    //   this.matchId  = param.get('matchId');
    //   this.marketId = param.get('marketId')
    // })

    this.activatedRoute.paramMap.subscribe((param) => {
      this.matchId = param.get('matchId');
      this.marketId = param.get('marketId')
      // alert(this.matchId)
    })
    this.activatedRoute.params.subscribe(val => {
      if (localStorage.getItem("marketID")) {
        localStorage.removeItem("marketID")
      }
      if (history.state.id) {
        localStorage.setItem("marketID", history.state.id)
      }
      if (localStorage.getItem("marketID")) {
        this.id = true;
      } else {
        this.id = false;
      }

      this.getMatchDetails(this.matchId, this.marketId)
    });
    this.changeText = false;

  }

  ngOnInit(): void {
    if (this.matchId && this.marketId) {
      this.getMatchDetails(this.matchId, this.marketId)
    }

    this.getbuttonValue();
    this.getMarketnFancyBet(this.betType);
    // this.getBetHistory()
    // this.activatedRoute.params.subscribe(val => {
    //   // put the code from `ngOnInit` here
    //   this.getMatchDetails(this.matchId, this.marketId)
    // });
    //   this.socketService.match_details().subscribe(res => {
    //     this.getMatchDetails(this.matchId , this.marketId)

    // })
    this.socketService.getMessages().subscribe((res: any) => {

      if (res?.['data'] && res?.['ids']) {
        if (res?.['ids']?.split(',').includes(this.userInfo.user_id.toString())) {
          this.getMarketnFancyBet('M')

        }

      } else {
        //this.getMarketnFancyBet('M')
      }

    }, (error: any) => {
      console.log("error")
    })

    //this.getMatchOdds()
  }
  openStatistics(){
    this.isShowStatic= !this.isShowStatic
  }
  closeData(){

  }
  GetWinnerName(value:string){
    let winnerNameList=this.cardResult.winner_name.split(",");
    return winnerNameList.includes(value);

  }
  onDragonTiger(value: any) {
    if (value == '1') {
      this.isTiger = false;
      this.isDragon = true;
    } else {
      this.isDragon = false;
      this.isTiger = true;
    }

  }
  setIndex(index: number) {
    this.selectedIndex2 = index;
  }
  // @HostListener('document:click', ['$event', '$event.target'])
  // onClick(event: MouseEvent, targetElement: HTMLElement): void {
  //   if (!targetElement) {
  //     return;
  //   }

  // }
  getMatchDetails(matchId: any, marketId: any) {
    let self = this;

    let payload;
    if (marketId == 'cup') {
      payload = {
        match_id: matchId,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
      }
    } else {
      payload = {
        match_id: matchId,
        is_show_100_percent: 0,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id)
      }
    }
    this.matchService.getMatchDetails(payload).subscribe((res) => {
      if (res?.status) {
        if (res?.data != null)
          self.matchDetails = res?.data;
          if(self.matchDetails.markets[0].runner_json == null || self.matchDetails.markets[0].runner_json == 'null'){
            self.matchDetails.markets[0].runner_json= this.runnerJsonPerviousData;
          }
          if(self.matchDetails.markets[0].runner_json != null || self.matchDetails.markets[0].runner_json != 'null'){
            this.runnerJsonPerviousData =  self.matchDetails.markets[0].runner_json;
            // console.log('this.runnerJsonPerviousData',this.runnerJsonPerviousData)
          }
          if(self.matchDetails.markets[0].results == null || self.matchDetails.markets[0].results == 'null'){
            self.matchDetails.markets[0].results= this.runnerJsonLastResultPerviousData;
          }
          if(self.matchDetails.markets[0].results != null || self.matchDetails.markets[0].results != 'null'){
            this.runnerJsonLastResultPerviousData =  self.matchDetails.markets[0].results;
            // console.log('this.runnerJsonPerviousData',this.runnerJsonPerviousData)
          }
          if(this.matchDetails.fancies.length > 0){

            this.sessionMarketFancy= this.matchDetails.fancies.filter((item:any)=> ((item.fancy_type_id ==1 || item.fancy_type_id==2) &&(item.ball_sess=='1')));
            this.overByOverFancy=this.matchDetails.fancies.filter((item:any)=>  ((item.fancy_type_id ==1 || item.fancy_type_id==2) &&(item.ball_sess=='2')));
            this.ballByBallFancy=this.matchDetails.fancies.filter((item:any)=>  ((item.fancy_type_id ==1 || item.fancy_type_id==2) &&(item.ball_sess=='3')));

          }
          if(this.matchDetails.match_id =='-1029'){
            let runnerJson= this.matchDetails.markets[0].runner_json;
            this.firstRowData= runnerJson.filter((item:any)=> item.selection_id <=5);
            this.firstRowData1= runnerJson.filter((item:any)=> item.selection_id >5 && item.selection_id <=9);

            this.secondRowData = runnerJson.filter((item:any)=> item.selection_id >10 && item.selection_id <=15);
            this.secondRowData1= runnerJson.filter((item:any)=> item.selection_id >15 && item.selection_id <=19);

            this.thirdRowData= runnerJson.filter((item:any)=> item.selection_id >20 && item.selection_id <=25);
            this.thirdRowData1= runnerJson.filter((item:any)=> item.selection_id >25 && item.selection_id <=29);

            this.fourthRowData = runnerJson.filter((item:any)=> item.selection_id >30 && item.selection_id <=35);
            this.fourthRowData1= runnerJson.filter((item:any)=> item.selection_id >35 && item.selection_id <=39);

            this.fifthRowData= runnerJson.filter((item:any)=> item.selection_id >40 && item.selection_id <=45);
            this.fifthRowData1= runnerJson.filter((item:any)=> item.selection_id >45 && item.selection_id <=49);

            this.sixthRowData= runnerJson.filter((item:any)=> item.selection_id >50 && item.selection_id <=55);
            this.sixthRowData1= runnerJson.filter((item:any)=> item.selection_id >55 && item.selection_id <=59);
          }
            if(this.matchDetails.match_id =='-1027' || this.matchDetails.match_id =='-1028'){
            this.chartData= this.matchDetails.markets[0].cardsTotal;

            if(this.chartData != undefined && this.chartData != null && this.chartData !=''){
              let chartValues:any= Object.values(this.chartData)
              this.staticArray= chartValues;
              this.matchService.setPieChartData(chartValues)
            }else{
              this.matchService.setPieChartData(this.staticArray)
            }

          }
          this.sportId = self.matchDetails.sport_id;
        if (this.matchDetails?.markets[0]?.cardsTotal != undefined) {
          this.indexofMax(this.matchDetails.markets[0].cardsTotal)
        }
        self.matchDetails.markets.forEach((market: any) => {
          if (market?.autotime?.length == 2) {
            this.newvalue = market?.autotime.substring(1, 2)
            this.newvalue1 = market?.autotime.substring(0, 1)
          } else {
            this.newvalue = market?.autotime
            this.newvalue1 = 0
            this.oldvalue1 = 0
          }

          if (this.newvalue != 0)
            this.value = this.value + 1
          if (this.newvalue != this.oldvalue) {
            this.oldvalue = this.newvalue
          }
          if (this.newvalue1 != this.oldvalue1) {
            this.oldvalue1 = this.newvalue1
          }
          if (market.name.toLowerCase() === 'match odds' || market.name.toLowerCase() === 'matchodds') {
            const matchOddIndex = this.matchDetails.markets.indexOf(market);
            self.matchDetails.markets.unshift(this.matchDetails.markets.splice(matchOddIndex, 1)[0]);
          }
        });
        this.isLiveSport = res?.data.is_live_sport;
        self.scoreType = self.matchDetails?.score_type;
        self.scoreKey = self.matchDetails?.score_key;

        if (self.callType == 1) {
          if (self.matchDetails.sport_id == '-1') {
            self.tvUrl = self.matchDetails?.live_sport_tv_url;

          }
          if (self.matchDetails.sport_id == '-17') {
            // alert(self.matchDetails?.tv_url)
            // alert(            self.tvUrl = self.matchDetails?.live_sport_tv_url              )
            this.isShowTv = true;
            self.tvUrlCricket = self.sanitizer.bypassSecurityTrustResourceUrl(self.matchDetails?.tv_url) ;
            this.getScoreBoard()

          }
          if (self.matchDetails.sport_id > '0') {
            if (self.matchDetails?.tv_url != undefined && self.matchDetails?.tv_url != null && self.matchDetails?.tv_url != 'null' && self.matchDetails?.tv_url != '') {
              this.isShowTv = true;
              let url = self.matchDetails?.tv_url;
              self.tvUrlCricket = self.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            this.getScoreBoard()

          }
          this.getDataUrl(self.tvUrl)
          this.callType = 2;
          if (this.matchDetails?.max_stack) {
            this.matchDetails.max_stack = this.shorterNumber.transform(Number(this.matchDetails?.max_stack))
            // this.numFormatter(Number(this.matchDetails?.max_stack))
          }
        }
      }
    },
      (err) => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getMatchDetails(this.matchId, this.marketId)), 1000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getMatchDetails(this.matchId, this.marketId)), 1000);
        }
      })
  }
  SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  abbreviateNumber(number : any){

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = this.SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

  openCloseTv() {
    this.isShowTv = !this.isShowTv
  }
  trackByFn(index: any, item: any) {
    return index; // or item.id
  }
  indexofMax(array: any) {
    if (array.length === 0) {
      return -1;
    }
    var max = array[0];
    var maxIndex = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
        maxIndex = i;
        max = array[i]
      }

    }
    this.maxIndexWinner = maxIndex;
    return maxIndex
  }

  getDataUrl(url: any) {
    let self = this;
    self.safeSrc = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  showMinMax32(selectionId:any,matchId: any, isValid: any) {
    this.isMinMax = !this.isMinMax
    if (this.isMinMax) {
      this.minMaxShow =  matchId + selectionId;
      console.log(this.minMaxShow)
    }
    else {
      this.minMaxShow = -1;
    }
  }
  ngOnDestroy() {
    //this.sub$.unsubscribe()
    // this.matchDetailsSub$.unsubscribe()
  }
  openResult1019(result: any) {
    console.log(this.matchDetails.match_id)
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id

    };
    this.matchService.getMatchResult(marketData).subscribe(response => {
      if (!response.error) {
        if (response.data != null) {
          //  $('#modalLastResults').show();
          $('#modalLastResults1019').modal('show');
          this.cardResult = response.data.data[0];
          this.cardResultArray = JSON.parse(response.data.data[0].card_data);

        }
        else {
          console.log('No Data Found')
        }
      }
    }, error => {
    });
  }

  getScoreBoard() {
    let payload = {
      match_id: this.matchId,
      score_type: this.scoreType,
      score_key: this.scoreKey,
      sport_id: this.sportId,
    }
    this.matchService.scoreBoard(payload).subscribe((response) => {
      if (response.status && response?.data) {
        if (this.scoreType == '0' && this.scoreKey != '0') {
          this.ballByBallScore = response.data.data;
        } else {
          this.documents = response.data;
          if (this.documents != null) {
            if (this.documents.eventTypeId === 2) {
              this.home = this.documents.score.home;
              this.away = this.documents.score.away;
            }
          } else {
            // this.displayScore = false;
          }
        }
      }
    },
      (err) => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      }
    )
  }

  getbuttonValue() {
    this.matchService.getbuttonValue().subscribe((res) => {
      if (res?.status) {
        this.stackList = res?.data;

      }
    })
  }


  getMarketnFancyBet(type: any) {
    this.betType = type;
    let payload = {
      bet_type: type,
      match_id: this.matchId

    }
    this.matchService.getMarketAndfancyBet(payload).subscribe((res) => {
      if (res?.status) {
        this.betList = res?.data;
      }
    }, (err) => {
      if (this.location?.path().split('/')[2] === 'matchdetail') {
        setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 2000);
      }
    },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 2000);
        }
      }
    )
  }



  setTTenMatch(marketName:string,sportId:any){
    if(marketName =='Match Odds' && sportId=='-17'){
      return false;
    }
    else{
      return true;
    }

  }

  viewAllResult(matchId: any) {

    this.router.navigate(['main/casino-result', matchId])
  }

  getRunningName(item:any){
    let value= item
    if(item != undefined && item != null && item != ''){

        return item;
    }
    else{
      return 'SUSPENDED'
    }


  }

  getmarketStatus(item:any){
    if(item != undefined && item != null && item != ''){
      if (item == 'ACTIVE' || item == 'OPEN' || item == '1' || item == 'True') {
        return '';
      }
      else {
        return 'suspended';
      }
    }
    else{
      return 'suspended'
    }
  }
  setStack(value: any) {
    this.stackValue = value;
  }

  setBetData(betDetail: any, teamName: any, type: any, bets: any) {
    console.log(betDetail, teamName, type, bets)
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp='back';
      $('#backpopup').modal('show');

    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp='lay';
      $('#backpopup').modal('show');

    }

    this.bets = bets;
    this.slectedIDteams = []
    this.teamLastPosition = []
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name })
                this.teamLastPosition.push({ winloss: element.win_loss })

              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataOdds(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp='back';


      $('#backpopup').modal('show');

    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp='lay';

      $('#backpopup').modal('show');

    }

    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;

    if (market_name == 'total card' || market_name == 'total point') {
      marketId = marketId.slice(0, -4)
    }
    betDetail.market_id = marketId
    this.bets = bets;
    this.slectedIDteams = []
    this.teamLastPosition = []
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name })
                this.teamLastPosition.push({ winloss: element.win_loss })

              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataTotalCards(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp='back';

      $('#backpopup').modal('show');

    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp='lay';

      $('#backpopup').modal('show');

    }

    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    if (market_name == 'total point') {
      let marketIdnew = marketId.slice(0, -4);
      marketId = marketIdnew + 2222
    }
    if (market_name == 'match odds') {
      marketId = marketId + 2222
    }
    if (market_name == 'total card') {
      marketId = marketId
    }
    betDetail.market_id = marketId

    this.bets = bets;
    this.slectedIDteams = []
    this.teamLastPosition = []
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name })
                this.teamLastPosition.push({ winloss: element.win_loss })

              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataTotalPoint(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp='back';

      $('#backpopup').modal('show');

    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp='lay';

      $('#backpopup').modal('show');

    }

    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    if (market_name == 'total card') {
      let marketIdnew = marketId.slice(0, -4);
      marketId = marketIdnew + 1111
    }
    if (market_name == 'match odds') {
      marketId = marketId + 1111
    }
    if (market_name == 'total point') {
      marketId = marketId
    }
    betDetail.market_id = marketId

    this.bets = bets;
    this.slectedIDteams = []
    this.teamLastPosition = []
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name })
                this.teamLastPosition.push({ winloss: element.win_loss })

              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail
      this.odds = Number(this.betdetails?.run);
    }
  }

  placeBetData() {
    if (this.betplaceType === 'M') {
      this.placeMarketBet()
    } else {
      this.placeFancyBet()
    }
    // betplaceType == 'M' ? placeMarketBet(): placeFancyBet()
  }
  placeMarketBet() {
    this.closeModal()
    this.betdetails.user_id = Number(this.userInfo?.user_id)
    this.betdetails.stack = Number(this.stackValue)
    this.betdetails.odds = Number(this.odds)
    this.loader.show();
    this.loading= true;

    this.matchService.placeMarketBet(this.betdetails).subscribe((res) => {
      this.loader.hide();
    this.loading= false;

      if (res.status) {
        this.toaster.success(res?.message);
        this.stackValue = 0;
        this.odds = 0;
        this.showBetslip = false;
        // document.getElementById('sdf').click();

      } else {
        this.toaster.error(res?.message)
      }
    })
  }
  placeFancyBet() {
    this.closeModal()
    this.betdetails.stack = Number(this.stackValue)
    this.odds = this.betdetails.run;
    this.loader.show();
    this.loading= true;

    this.matchService.placeFancyBet(this.betdetails).subscribe((res) => {
      this.loader.hide();
    this.loading= false;

      if (res.status) {
        this.toaster.success(res?.message);
        this.stackValue = 0;
        this.odds = 0;
        this.showBetslip = false;

      } else {
        this.toaster.error(res?.message)

      }
    })
  }
  onDisplayMessage(message:any){
    console.log(message)
    let displayMsg= message.toLowerCase();

    if(displayMsg =='close' || displayMsg =='result awaiting'){
      return false;
    }else{
      return true;
    }

  }

  // this methode is use for  close modal
  private closeModal(): void {
    document.getElementById('backpopup')?.click();
    document.getElementById('laypopup')?.click();
  }



  numFormatter(num: any) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  tab1:boolean = true;
  tab2:boolean = false;
  tab3:boolean = false;
  showTag(value:any){
if(value==1){
  this.tab1= true;
  this.tab2= false;
  this.tab3= false;
}
if(value==2){
  this.tab1= false;
  this.tab2= true;
  this.tab3= false;
}
if(value==3){
  this.tab1= false;
  this.tab2= false;
  this.tab3= true;
}
  }

  getCategrey(activlassId: any) {
    this.selectedIndex = activlassId;

  }


  changeOdssValue(data: any) {
    // if (this.bets === '-') {
      if (data === '-') {
        this.odds = this.odds - 0.01;
      } else if (data === '+') {
        this.odds = this.odds + 0.01;
      }
      this.odds = Number(this.odds.toFixed(2))
      return
    // }
  }


  checkNumberPositvie(values: any) {
    if (values >= 0) {
      return true;
    }
    else {
      return false;
    }
  }
  // }



  setFancyPosition(data: any, index: number) {
    this.fancyPostion = []

    if (data)
      this.fancyPostion = JSON.parse(data)

  }

  showLastResultsFiveCricket(result: any) {
    let self= this;
    let marketData = {

      //  market_id: '41.2114091208400'
      market_id: result.mid,
      match_id: self.matchDetails.match_id
    };
    this.matchService.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        self.fiveCricketArray = response.data.data[0];
        self.fiveCricet_data = JSON.parse(response.data.data[0].card_data);


      }
    }, error => {
    });
  }
  closeModalPopup(){
    return
  }
  closeModal1(data:string){}

  getMatchOdds() {
    let payload = {
      match_id: this.matchId,
      is_show_100_percent: 0,
      user_id: Number(this.userInfo.user_id),
      user_type_id: Number(this.userInfo.user_type_id),
      "is_live_sport": "0"

    }

    this.matchService.getMatchOdds(payload).subscribe((res) => {
      if (res?.status) {
        this.matchDetailsSocketData = res?.data;

        if (this.matchDetails && this.matchDetails?.fancies &&
          this.matchDetailsSocketData && this.matchDetailsSocketData?.fancies) {

          this.matchDetails['fancies'].forEach((ele: any, index: number) => {
            ele.display_message = this.matchDetailsSocketData?.fancies[index].display_message,
              ele.session_size_no = this.matchDetailsSocketData?.fancies[index].session_size_no,
              ele.session_size_yes = this.matchDetailsSocketData?.fancies[index].session_size_yes,
              ele.session_value_no = this.matchDetailsSocketData?.fancies[index].session_value_no,
              ele.session_value_yes = this.matchDetailsSocketData?.fancies[index].session_value_yes;

          })
        }


        if (this.matchDetails && this.matchDetails?.markets && this.matchDetailsSocketData && this.matchDetailsSocketData?.markets) {
          this.matchDetails?.markets?.forEach((element: any, index: number) => {
            element.status = this.matchDetailsSocketData?.markets[index]?.status

            if (element?.runner_json && this.matchDetailsSocketData?.markets[index]?.runner_json) {
              element?.runner_json.forEach((ele: any, index1: number) => {
                ele.back = this.matchDetailsSocketData?.markets[index]?.runner_json[index1].back
                ele.lay = this.matchDetailsSocketData?.markets[index]?.runner_json[index1].lay
                ele.status = this.matchDetailsSocketData?.markets[index]?.runner_json[index1].status

              });
            }
          });
        }
      }
    },
      (err) => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetail') {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      }
    )
  }

  isSuperOvercard(card:string){
    if(card !='1' && card !='')
    {
      return true;
    }else{
      return false;
    }
  }
  superOvercard(card:string){
    if(card !='1' && card !='')
    {
      let cards= card.slice(0, -2);
      return cards;
    }
    else{
      return
    }
  }

  openBookmarkerModal(market: any) {

    let marketName = market.name.toLowerCase();
    if (marketName == 'bookmaker' || marketName == 'book maker') {
      $('#modalBookmarker').modal('show');
    }
    else {
      $('#otherModal').modal('show');

    }
    //$('#modalBookmarker').modal('show');

  }

  openFancyModal() {
    $('#modalFacy').modal('show');
  }

  onOpenRules(matchId: any) {
    $('#modalGmaeRules').modal('show');


  }
  closeRulesModal() {
    $('#modalGmaeRules').modal('hide');

  }
  showPlayerNumber(value:any) {
    return value.replace('Player', '')
  }
  suspendedPoker6Class(selectionStatus:any) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True' || selectionStatus == 'true')) {
      return '';
    }
    else {
      return 'suspended';
    }
  }
  onClickValue(value: any) {
    this.isCasinoWar= value;

  }
  suspendedClass(selectionStatus: any, marketStatus: any) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return '';
    }
    else {
      return 'suspended';
    }
  }
  NotclickAbleClass(selectionStatus: any, marketStatus: any) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return '';
    }
    else {
      return 'NotclickAble';
    }
  }
  suspendedClassOne(selectionStatus:any) {


    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True' || selectionStatus == 'true')) {
      return '';
    }
    else {
      return 'suspended';
    }
  }
  suspendedTextPok6(selectionStatus: any) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True')) {
      return false;
    }
    else {
      return true;
    }
  }
  suspendedText(selectionStatus: any, marketStatus: any) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return false;
    }
    else {
      return true;
    }
  }
  ShowTextStatus(value: any) {
    if (value == 'CLOSED') {
      return 'CLOSED';
    }
    else {
      return 'SUSPENDED'
    }

  }

  public minMaxDetails: any;
  showMinMax(matchDetail: any) {
    this.minMaxDetails = matchDetail;
    $('#minMaxPopUp').modal('show');
  }
  closeMinMax() {

    $('#minMaxPopUp').modal('hide');
  }
  closePopup() {
    $('#modalrulesteenpatti').hide();

  }

  ballByBallClass(value: any) {
    debugger
    if (value == '4') {
      return 'four';
    }
    if (value == '6') {
      return 'six';
    }
    if (value == 'ww' || value == 'WW' || value == 'W' || value == 'ww') {
      return 'wicket';
    }
    return ''
  }

  closeResultModal() {
    $('#modalLastResults').modal('hide');
  }

  getImageName(name:string){
    let str = name.slice(-2);
    return str
  }
  getCardFirstName(name:string){
    let str = name.slice(0,-2);
    return str;
  }
  openResult(result: any) {
    //$('#modalInstanceWorliresult').show();
    let marketData = {
     // market_id: '22.212409113409',
      market_id: result.mid,
      match_id: this.matchDetails.match_id

    };
    this.matchService.getMatchResult(marketData).subscribe(response => {
      if (!response.error) {
        if (response.data != null) {
          //  $('#modalLastResults').show();
          $('#modalLastResults').modal('show');
          this.cardResult = response.data.data[0];
          this.cardResultArray = JSON.parse(response.data.data[0].card_data);
          console.log(this.cardResultArray)
        }
        else {
          console.log('No Data Found')
        }
      }
    }, error => {
    });
  }

  setClass(type:any){
    if(type=='P'){
      return 'player'
    }else if(type =='B'){
      return 'banker'
    }
    else if(type =='T'){
      return 'tie'
    }
    else{
      return ''
    }
  }

  getLastResult(item:any){
    return item;
    // if(self.matchDetails.markets[0].runner_json == null || self.matchDetails.markets[0].runner_json == 'null'){
    //   self.matchDetails.markets[0].runner_json= this.runnerJsonPerviousData;
    // }
    // if(self.matchDetails.markets[0].runner_json != null || self.matchDetails.markets[0].runner_json != 'null'){
    //   this.runnerJsonPerviousData =  self.matchDetails.markets[0].runner_json;
    //   // console.log('this.runnerJsonPerviousData',this.runnerJsonPerviousData)
    // }
  }
}


