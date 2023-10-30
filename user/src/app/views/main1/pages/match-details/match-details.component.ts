import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { resolve } from 'q';
import { User } from 'src/app/core/model/user';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocketService } from 'src/app/core/services/socket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgZone } from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import { ResultsComponent } from '../Modal/results/results.component';
declare var $;

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
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
export class MatchDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  sportId;
  selectedIndex2: number = -1;
  selectedIndex: any = 'Fancy1';
  constructor(public router: Router, public socketService: SocketService,
     public loader: NgxSpinnerService, private service: MatchService,
      private ac: ActivatedRoute, private location: Location,public dialog: MatDialog,
       public toaster: ToastrService, private sanitizer: DomSanitizer, private _ngZone: NgZone, private ref: ChangeDetectorRef) {
    this.sportId = sessionStorage.getItem('sportId')
    console.log(this.sportId)
  }
  cardResult: any;
  cardResultArray: any;
  marketname: any
  userInfo = new User().getData();
  value = 0;
  oldvalue = 0;
  newvalue = 0;

  value1 = 0;
  oldvalue1 = 0;
  newvalue1 = 0;
  isLiveSport;
  matchId;
  marketId;
  betType = 'M';
  bets: any;
  betList: any = [];
  type: any = 'all';
  page = 1;
  public safeSrc: any;
  public callType = 1
  public scoreCallType = 1
  public tvUrl: any;

  code: any;
  matchDetailsSocketData;
  fromAmt: any = 0;
  toAmt: any = 0;
  ipAdd: any = ''
  showBetslip = false;
  odds = 0;
  scoreKey = "0"
  betplaceType;
  stackValue = 0;
  betdetails: any = {}
  teamName: any;
  stackList: any;
  tvUrlCricket: any;
  scoreType: any = '1'
  scoreboardDetails: any;
  matchDetails: any;
  matchDetailsFancy1: any;
  matchDetailsOddEven: any;
  fancyPostion: any;
  home: any;
  away: any;
  documents: any;
  displayScore: boolean = false;
  ballByBallScore: any;
  oldOdds: number;
  id: any;
  isShowTv: boolean = false;
  maxIndexWinner = -1;
  card_dataArray: any;
  card_data32Array: any;
  instanceWorliArray: any;
  bollywoodArray: any;
  card_data32;
  instanceWorli;
  oddEven;
  card_dataArray1;
  card_data;
  aall;
  ball;
  minMaxShow = -1;
  isMinMax = false;
  fiveCricketArray: any;
  fiveCricet_data;
  tvScoreBoard;
  isTvScoreBoard;
  ball_by_ball;
  overByOver;
  sesion_market: any
  runnerJsonPerviousData:any;
  runnerJsonLastResultPerviousData:any;
  MinStacks: number;
  MaxStacks: number;
  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.matchId = param.get('matchId');
      this.marketId = param.get('marketId')
      console.log(this.matchId)
      console.log(this.marketId)
    })

    this.ac.params.subscribe(val => {
      if (localStorage.getItem("marketID")) {
        localStorage.removeItem("marketID")
      }
      if (history.state.id) {
        localStorage.setItem("marketIDuser", history.state.id)
      }
      if (localStorage.getItem("marketIDuser")) {
        this.id = true;
      } else {
        this.id = false;
      }

      this.getMatchDetails(this.matchId, this.marketId)
    });


    // if(history.state.id){
    //   localStorage.setItem("marketID", history.state.id)
    // }
    // if(localStorage.getItem("marketID")){
    //   this.id = true;
    // }else {
    //   this.id = false;
    // }

    this.getbuttonValue();
    this.getMarketnFancyBet(this.betType);
    // this.getMatchDetails(this.matchId, this.marketId)
    // this.pageScrll()


    //   this.socketService.match_details().subscribe(res => {

    //     this.getMatchDetails(this.matchId , this.marketId)




    // })
    this.socketService.getMessages().subscribe(res => {


      if (res?.['data'] && res?.['ids']) {
        if (res?.['ids']?.split(',').includes(this.userInfo.user_id.toString())) {
          this.getMarketnFancyBet('M');

        }

      } else {
        // this.getMarketnFancyBet('M')
      }


    }, (error: any) => {
      console.log("error")
    })
  }

  onDisplayMessage(message:any){
    let displayMsg= message.toLowerCase();

    if(displayMsg =='close' || displayMsg =='result awaiting'){
      return false;
    }else{
      return true;
    }

  }

  showMinMax32(value, isValid) {
    this.isMinMax = !this.isMinMax
    if (this.isMinMax) {
      this.minMaxShow = value;
    }
    else {
      this.minMaxShow = -1;
    }
  }
  
  minMaxStack(item:any){
    this.MinStacks= item.min_stack;
    this.MaxStacks= item.max_stack;
    $('#minMaxModal').modal('show');
  }

  ngAfterViewInit() {
    //this.ref.detach()
    // this.pageScroll()

  }
  ngOnDestroy() {
    // console.log('Service destroy')
    localStorage.removeItem('marketID')
    this.socketService.socketDisconnect();

    // localStorage.getItem("marketID")
  }
  getScoreBoard() {
    let payload = {
      match_id: this.matchId,
      sport_id: this.sportId,
      score_type: this.scoreType,
      score_key: this.scoreKey
    }
    this.service.scoreBoard(payload).subscribe((response) => {
      if (response.status) {
      
        if (this.scoreType == '0' && this.scoreKey != '0') {
          if(response.data.url){
            if(this.scoreCallType ===1){
            this.isTvScoreBoard= response.data.url;
            this.getScoreBordUrl(response.data.url)
            console.log('addnew', response.data.url)
            }
           }
           this.scoreCallType = 2
          this.ballByBallScore = response.data.data;
        } else {
          this.documents = response.data;
          // this.displayScore = false;
          
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
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getScoreBoard()), 5000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getScoreBoard()), 5000);
        }
      }
    )
  }
  getbuttonValue() {
    this.service.getbuttonValue().subscribe((res) => {
      if (res?.status) {
        this.stackList = res?.data;
      }
    })
  }
  setStack(value: any) {
    this.stackValue = value;
  }
  setBetData(betDetail, teamName, type, bets) {
    console.log(betDetail, 'betDetail')
    console.log(teamName, 'betDetail')
    console.log(type, 'betDetail')
    if (betDetail.odds == '--') {
      return;
    }
    this.bets = bets

    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.odds;

    } else {
      this.betdetails = betDetail
      this.odds = this.betdetails?.run;

    }
    this.oldOdds = this.odds
  }
  setBetDataOdds(betDetail, teamName, type, bets) {
    console.log('setBetDataOdds', betDetail)
    if (betDetail.odds == '--') {
      return;
    }
    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    console.log(marketId)
    console.log(market_name)
    if (market_name == 'total card' || market_name == 'total point') {
      marketId = marketId.slice(0, -4)
    }
    betDetail.market_id = marketId
    this.bets = bets
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.odds;

    } else {
      this.betdetails = betDetail
      this.odds = this.betdetails?.run;

    }
    this.oldOdds = this.odds
  }
  setBetDataTotalCards(betDetail, teamName, type, bets) {
    if (betDetail.odds == '--') {
      return;
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

    this.bets = bets
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.odds;

    } else {
      this.betdetails = betDetail
      this.odds = this.betdetails?.run;

    }
    this.oldOdds = this.odds
  }
  setBetDataTotalPoint(betDetail, teamName, type, bets) {
    if (betDetail.odds == '--') {
      return;
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

    this.bets = bets
    this.stackValue = 0;
    this.teamName = teamName
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.odds;

    } else {
      this.betdetails = betDetail
      this.odds = this.betdetails?.run;

    }
    this.oldOdds = this.odds
  }

  placeMarketBet() {
    this.betdetails.user_id = Number(this.userInfo?.user_id)
    this.betdetails.stack = Number(this.stackValue)
    this.betdetails.odds = Number(this.odds)
    this.loader.show()
    this.service.placeMarketBet(this.betdetails).subscribe((res) => {
      this.loader.hide()

      if (res.status) {
        this.toaster.success(res?.message);
        this.stackValue = 0;
        this.odds = 0;
        this.showBetslip = false;

      } else {
        // alert()
        // this.toaster.error("error")
        this.toaster.error(res?.message)
      }
    })
  }
  ballByBallClass(value: any) {
    if (value == '4') {
      return 'four';
    }
    if (value == '6') {
      return 'six';
    }
    if (value == 'ww') {
      return 'wicket';
    }
  }


  placeFancyBet() {
    this.betdetails.stack = Number(this.stackValue)
    this.odds = this.betdetails.run;
    this.loader.show()
    this.service.placeFancyBet(this.betdetails).subscribe((res) => {
      this.loader.hide()
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
instaWorlifirst4:any;
instaWorlifirst5:any;
  getMarketnFancyBet(type) {
    this.betType = type;
    let payload = {
      bet_type: type,
      match_id: this.matchId
    }
    this.service.getMarketAndfancyBet(payload).subscribe((res) => {
      if (res?.status) {
        this.betList = res?.data;
      }
    }, (err) => {
      if (this.location?.path().split('/')[2] === 'matchdetails') {
        setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 5000);
      }
    },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 5000);
        }
      }
    )
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
  getMatchDetails(matchId, marketId) {
    var payload;
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
        user_type_id: Number(this.userInfo.user_type_id),
        market_id: this.id ? '' : marketId,}
    }



    this.service.getMatchDetails(payload).subscribe((res) => {
      let self = this;

      if (res?.status) {

    
        this.matchDetails = res?.data;
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
        this.matchDetailsFancy1 = this.matchDetails?.fancies.filter(item => item.fancy_type_id == '4');
        this.matchDetailsOddEven = this.matchDetails?.fancies.filter(item => item.fancy_type_id == '3');
        self.sesion_market  = self.matchDetails?.fancies.filter(item => item.ball_sess == 1 );

        self.overByOver  = self.matchDetails?.fancies.filter(item => item.ball_sess == 2 );
        self.ball_by_ball = self.matchDetails?.fancies.filter(item => item.ball_sess == 3 );
        // console.log(this.overByOver,'overByOver')
        // console.log(this.ball_by_ball,'ballbyball')
   
        if(this.matchDetails.match_id=='-1013'){
          this.instaWorlifirst4= this.matchDetails.markets[0].runner_json.filter(item => item.selection_id=='4')
          this.instaWorlifirst5= this.matchDetails.markets[0].runner_json.filter(item => item.selection_id=='5')
        
        }
        if (this.matchDetails.markets[0].cardsTotal != undefined) {
          this.indexofMax(this.matchDetails.markets[0].cardsTotal)
        }
        this.matchDetails.markets.forEach(market => {
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
            this.matchDetails.markets.unshift(this.matchDetails.markets.splice(matchOddIndex, 1)[0]);
          }
        });
        this.isLiveSport = res?.data.is_live_sport;
        this.scoreType = this.matchDetails?.score_type;
        this.scoreKey = this.matchDetails?.score_key;

        if (self.callType == 1) {
         

          if (self.matchDetails.sport_id == '-1') {
            self.tvUrl = self.matchDetails?.live_sport_tv_url;
          }
          if (self.matchDetails.sport_id == '-17') {
            self.tvUrl = self.matchDetails?.tv_url;
            this.getScoreBoard();
          }
          if (self.matchDetails.sport_id > '0') {
            if (self.matchDetails?.tv_url != undefined && self.matchDetails?.tv_url != null && self.matchDetails?.tv_url != 'null' && self.matchDetails?.tv_url != '') {
              this.isShowTv = true;
              let url = self.matchDetails?.tv_url;
              self.tvUrlCricket = self.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            this.getScoreBoard();

          }
          this.getDataUrl(self.tvUrl)
        }

        this.callType = 2;
        // this.getMatchOdds()

      }
    },
      (err) => {
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getMatchDetails(this.matchId, this.marketId)), 1000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getMatchDetails(this.matchId, this.marketId)), 1000);
        }
      }
    )

  }
  indexofMax(array) {
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
    console.log('maxIndex', maxIndex, this.maxIndexWinner);
    return maxIndex
  }

  getDataUrl(url) {
    let self = this;
    self.safeSrc = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getScoreBordUrl(url) {
    let self = this;
    self.tvScoreBoard = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  pageScroll() {
    $(document).ready(function () {
      var s = $(".sticker1");
      var pos = s.position();
      var sHeight = s.height();

      $(window).scroll(function () {
        var windowpos = $(window).scrollTop();
        if (windowpos >= (sHeight / 2) + pos.top) {
          s.addClass("sticky1");
        } else {
          $('body').css('paddingTop', '0');
          s.removeClass("sticky1");
        }
      });
    });
  }

  setFancyPosition(data: any, index: number) {
    this.fancyPostion = []
    if (data)
      this.fancyPostion = JSON.parse(data);
  }


  changeOdssValue(data: any) {
    this.odds = Number(this.odds)

    if (this.bets == 'bets') {
      if (data == '-') {
        this.odds = this.odds - 0.01;
      } else if (data == '+') {
        this.odds = this.odds + 0.01;
      }
      this.odds = Number(this.odds.toFixed(2));
    }
  }
  getMarket(market: any) {
   
    let marketName = market.name.toLowerCase();
    if (marketName == 'bookmaker' || marketName == 'book maker') {
      return true
    } else {
      return false

    }
  }
  isBookMakerModal=false;
  isRulesModal=false;
  openBookmarkerModal(market: any) {
    this.isBookMakerModal=true;
    this.isRulesModal=false;
    this.service.bookmarkerModal.next(market);
 
    let marketName = market.name.toLowerCase();
    if (marketName == 'bookmaker' || marketName == 'book maker') {
      $('#modalBookmarker').modal('show');
    } else {
      this.marketname = market.name
      $('#modalBookmarker1').modal('show');

    }
  }

  openFancyModal() {
    $('#modalFacy').modal('show');
  }


  checkNumberPositvie(values: any) {
    if (values >= 0) {
      return true;
    }
    else {
      return false;
    }
  }

  reset() {
    this.showBetslip= false;
    this.stackValue = 0;
    this.odds = Number(this.oldOdds);
  }



  getMatchOdds() {
    var payload;
    if (this.marketId == 'cup') {
      payload = {
        match_id: this.matchId,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
        "is_live_sport": this.isLiveSport

      }
    } else {
      payload = {
        match_id: this.matchId,
        is_show_100_percent: 0,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
        market_id: this.id ? '' : this.marketId,
        "is_live_sport": this.isLiveSport

      }
    }


    this.service.getMatchOdds(payload).subscribe((res) => {
      if (res?.status) {
        this.matchDetailsSocketData = res?.data;

        if (this.matchDetails && this.matchDetails?.fancies &&
          this.matchDetailsSocketData && this.matchDetailsSocketData?.fancies) {

          this.matchDetails['fancies'].forEach((ele, index) => {
            ele.display_message = this.matchDetailsSocketData?.fancies[index].display_message,
              ele.session_size_no = this.matchDetailsSocketData?.fancies[index].session_size_no,
              ele.session_size_yes = this.matchDetailsSocketData?.fancies[index].session_size_yes,
              ele.session_value_no = this.matchDetailsSocketData?.fancies[index].session_value_no,
              ele.session_value_yes = this.matchDetailsSocketData?.fancies[index].session_value_yes;

          })
        }


        if (this.matchDetails && this.matchDetails?.markets && this.matchDetailsSocketData && this.matchDetailsSocketData?.markets) {
          this.matchDetails?.markets?.forEach((element, index) => {
            element.status = this.matchDetailsSocketData?.markets[index]?.status;
            element.autotime = this.matchDetailsSocketData?.markets[index]?.autotime;
            element.cards = this.matchDetailsSocketData?.markets[index]?.cards;


            if (element?.runner_json && this.matchDetailsSocketData?.markets[index]?.runner_json) {
              element?.runner_json.forEach((ele, index1) => {
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
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getMatchOdds()), 9000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'matchdetails') {
          setTimeout(() => resolve(this.getMatchOdds()), 9000);
        }
      }
    )
  }

  onOpenRules(matchId) {
    this.isBookMakerModal= false ;
    this.isRulesModal=true;
    // console.log("onOpenRules", matchId);
    this.service.matchRulesModalData.next(this.matchDetails);
    // $('#modalGmaeRules').modal('show');
   

  }
  closeRulesModal() {
    $('#modalGmaeRules').modal('hide');

  }


  suspendedClass(selectionStatus, marketStatus) {
    // console.log(selectionStatus , marketStatus , "hell")
    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return '';
    }
    else {
      return 'suspended';
    }
  }
  NotclickAbleClass(selectionStatus, marketStatus) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return '';
    }
    else {
      return 'NotclickAble';
    }
  }
  suspendedText(selectionStatus, marketStatus) {

    if ((selectionStatus == 'ACTIVE' || selectionStatus == 'OPEN' || selectionStatus == '1' || selectionStatus == 'True') || (marketStatus == 'ACTIVE' || marketStatus == 'OPEN' || marketStatus == '1' || marketStatus == 'True')) {
      return false;
    }
    else {
      return true;
    }
  }
  ShowTextStatus(value) {
    if (value == 'CLOSED') {
      return 'CLOSED';
    }
    else {
      return 'SUSPENDED'
    }

  }

  public minMaxDetails;
  showMinMax(matchDetail) {
    console.log('minMaxDetails?.session_min_stack', matchDetail)
    this.minMaxDetails = matchDetail;
    $('#minMaxPopUp').modal('show');
  }
  closeMinMax() {

    $('#minMaxPopUp').modal('hide');
  }
  closePopup() {
    $('#modalrulesteenpatti').hide();

  }
  show32cardsRules() {
    $('#modalrules32cards').show();

  }

  close32CardsPopup() {
    $('#modalrules32cards').hide();
    $('#modalrulesbollywoodtable').hide();


  }
  showdbollywoodCasinoRules() {
    $('#modalrulesbollywoodtable').show();

  }

  showLastResultsFiveCricket(result) {
    let marketData = {

      //  market_id: '41.2114091208400'
      market_id: result.mid,
      match_id: this.matchDetails.match_id
    };
    this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        $('#modalFiveCricket').show();
        this.fiveCricketArray = response.data.data[0];
        this.fiveCricet_data = JSON.parse(response.data.data[0].card_data);
        console.log('modalFiveCricket', this.fiveCricketArray)
        console.log('modalFiveCricket', this.fiveCricet_data)

      }
    }, error => {
    });
  }
  closeFiveCricket() {
    $('#modalFiveCricket').hide();

  }




  navigateTo(id) {
    // alert()
    // this.router.navigate(['/main/casinoresult/1'])
    this.router.navigate(['/main/casinoresult', id])

  }


  closeLuckyPopup() {
    $('#modalLucky').hide();

  }
  closePopupResult() {
    $('#modalpokerresult').hide();
    $('#modalDragonTiger2020result').hide();
    $('#modalDragonTiger1Dayresult').hide();

  }
  showAAAResultText(value) {


    return value

  }
  showPlayerNumber(value) {
    return value.replace('Player', '')
  }
  getNameSingle(value) {
    return value.replace('Single', '')
  }
  getNameSingleWorli(value) {
    return value.replace('Single', '')
  }
  setTTenMatch(marketName, sportId) {
    if (marketName == 'Match Odds' && sportId == '-17') {
      return false;
    }
    else {
      return true;
    }

  }

  closePopupAndarResult() {
    $('#modalandarbaharresult').hide();

  }
  covertToDigits(a, b) {
    let totalVal;
    totalVal = parseFloat(a) + parseFloat(b);
    return totalVal.toFixed('2');
  }
  showLuckyPopup() {
    $('#modalLucky').show();

  }
  showdragonTigerRules() {
    $('#modaldragonTiger').show();

  }

  closedragonTigerRules() {
    $('#modaldragonTiger').hide();

  }

  openResult(result) {
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id

    };
    this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        if (response.data != null) {
          $('#modalLastResults').modal('show');

          this.cardResult = response.data.data[0];
          this.cardResultArray = JSON.parse(response.data.data[0].card_data);
          console.log(this.cardResultArray, this.cardResult, 'jklkjklk')
          // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
          //     console.log(this.oddEven);

        }
        else {
          console.log('No Data Found')
        }
      }
    }, error => {
    });
  }
  public andarBaharResultCards= [];
  openResultAndar2(result) {
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id

    };
    this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        if (response.data != null) {
          $('#modalLastResults').modal('show');
          this.andarBaharResultCards=[];

          this.cardResult = response.data.data[0];
          this.cardResultArray = JSON.parse(response.data.data[0].card_data);
          //console.log(this.cardResultArray)
          console.log(this.cardResult, 'jklkjklk1')

//           const allowed = [result.mid];
//           console.log(allowed)
//           console.log(this.cardResultArray)
//           let kyes= Object.keys(this.cardResultArray.cards[0].cards_total)
//           console.log(kyes);
//           Object.keys(this.cardResultArray.cards[0].cards_total)
//         .filter(key => !allowed.includes(key))
//         .forEach(key => delete this.cardResultArray.cards[0].cards_total[key]);
// for(const key in this.cardResultArray.cards[0].cards_total){
//   if(this.cardResultArray.cards[0].cards_total.hasOwnProperty(key)){
//     this.andarBaharResultCards.push({cardsTotal:key,...this.cardResultArray.cards[0].cards_total[key]})
//   }
// }
  
      
          // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
          //     console.log(this.oddEven);

        }
        else {
          console.log('No Data Found')
        }
      }
    }, error => {
    });
  }
  openResult1019(result) {
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id

    };
    this.service.marketResultDetailsByMarketId(marketData).subscribe(response => {
      if (!response.error) {
        if (response.data != null) {
          //  $('#modalLastResults').show();
          $('#modalLastResults').modal('show');

          this.cardResult = response.data.data[0];
          this.cardResultArray = JSON.parse(response.data.data[0].card_data);
          console.log(this.cardResultArray, this.cardResult, 'jklkjklk')
          // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
          //     console.log(this.oddEven);





        }
        else {
          console.log('No Data Found')
        }
      }
    }, error => {
    });
  }
  closeResultModal() {
    $('#modalLastResults').modal('hide');
 }
  setIndex(index: number) {
    this.selectedIndex2 = index;
  }
  getCategrey(activlassId: any) {
    this.selectedIndex = activlassId;

  }
  openDialog() {
    const dialogRef = this.dialog.open(ResultsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}
