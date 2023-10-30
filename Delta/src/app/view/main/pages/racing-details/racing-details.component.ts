import { Location } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  stagger,
} from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-racing-details',
  templateUrl: './racing-details.component.html',
  styleUrls: ['./racing-details.component.scss'],
  providers: [ShortNumberPipe, SocketService],
  animations: [
    trigger('flip', [
      transition('*=>*', [
        animate(
          '.6s',
          keyframes([
            style({ transform: 'rotateX(0deg)', offset: 0 }),
            style({ transform: 'rotateX(-90deg)', offset: 0.5 }),
            style({ transform: 'rotateX(-180deg)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class RacingDetailsComponent implements OnInit, OnDestroy {
  home: any;
  sportId: any;

  away: any;
  ballByBallScore: any;
  matchId: any;
  marketId: any;
  public loading = false;

  slotDateTime: any;
  sub$ = Subscription;
  userInfo = new User().getData();
  matchDetails: any;
  scoreType: any;
  scoreKey: any;
  scoreboardDetails: any;
  stackList: any; // button values
  betType = 'M';
  matchDetailsSocketData: any = [];
  betList: any = [];
  betdetails: any = {};
  stackValue = 0;
  odds = 0;
  showBetslip: Boolean = false;
  betplaceType: any;
  teamName: any;
  selectedIndex: any = 'Fancy';
  slectionIDs: any;
  slectedIDteams: any = [];
  teamLastPosition: any = [];
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
  public callType = 1;
  public scoreCallType = 1;
  public tvUrl: any;
  isShowTv: boolean = false;
  isShowScoreBoard: boolean = true;
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
  tvScoreBoard: any;
  isTvScoreBoard: any;
  isTvScoreBoards: any = false;
  isBetPopUp: string = 'back';
  racingWinMarket: any;
  racingPlaceMarket: any;
  constructor(
    private socketService: SocketService,
    public shorterNumber: ShortNumberPipe,
    private loader: NgxSpinnerService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private toaster: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.sportId = sessionStorage.getItem('sportId');
    // console.log(this.sportId);
    // this.sub$       = this.activatedRoute.paramMap.subscribe((param) => {
    //   this.matchId  = param.get('matchId');
    //   this.marketId = param.get('marketId')
    // })
    this.activatedRoute.paramMap.subscribe((param) => {
      this.matchId = param.get('matchId');
      this.marketId = param.get('marketId');
      this.slotDateTime = param.get('slotDateTime');
      // alert(this.matchId)
    });
    this.activatedRoute.params.subscribe((val) => {
      if (localStorage.getItem('marketID')) {
        localStorage.removeItem('marketID');
      }
      if (history.state.id) {
        localStorage.setItem('marketID', history.state.id);
      }
      if (localStorage.getItem('marketID')) {
        this.id = true;
      } else {
        this.id = false;
      }

      this.getMatchDetails(this.matchId, this.marketId);
    });
    this.changeText = false;
  }

  ngOnInit(): void {
    if (this.matchId && this.marketId) {
      this.getMatchDetails(this.matchId, this.marketId);
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
    this.socketService.getMessages().subscribe(
      (res: any) => {
        if (res?.['data'] && res?.['ids']) {
          if (
            res?.['ids']?.split(',').includes(this.userInfo.user_id.toString())
          ) {
            this.getMarketnFancyBet('M');
          }
        } else {
          //this.getMarketnFancyBet('M')
        }
      },
      (error: any) => {
        console.log('error');
      }
    );

    //this.getMatchOdds()
  }
  closeData() {}
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
      };
    } else {
      payload = {
        match_id: matchId,
        market_id: marketId,
        is_show_100_percent: 0,
        start_date_time:this.slotDateTime,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
      };
    }
    this.matchService.getMatchDetails(payload).subscribe(
      (res) => {
        if (res?.status) {
          if (res?.data != null) {
            self.matchDetails = res?.data;
            // console.log(self.matchDetails.markets);
            const WinArray = self.matchDetails.markets.map((item: any) => {
              return item.market_type == 'WIN';
            });
            const PlaceArray = self.matchDetails.markets.map((item: any) => {
              return item.market_type != 'WIN';
            });
            this.racingWinMarket = WinArray[0];
            this.racingPlaceMarket = PlaceArray[0];
            if(this.racingWinMarket && this.racingPlaceMarket){
              this.showtabMarket(1)
            }
            else{
              if(this.racingWinMarket){
                this.showtabMarket(1)
              }
              else{
                this.showtabMarket(2)
                
              }
            }
           
          }

          if (this.matchDetails?.markets[0]?.cardsTotal != undefined) {
            this.indexofMax(this.matchDetails.markets[0].cardsTotal);
          }
          self.matchDetails.markets.forEach((market: any) => {
            if (market?.autotime?.length == 2) {
              this.newvalue = market?.autotime.substring(1, 2);
              this.newvalue1 = market?.autotime.substring(0, 1);
            } else {
              this.newvalue = market?.autotime;
              this.newvalue1 = 0;
              this.oldvalue1 = 0;
            }

            if (this.newvalue != 0) this.value = this.value + 1;
            if (this.newvalue != this.oldvalue) {
              this.oldvalue = this.newvalue;
            }
            if (this.newvalue1 != this.oldvalue1) {
              this.oldvalue1 = this.newvalue1;
            }
            if (
              market.name.toLowerCase() === 'match odds' ||
              market.name.toLowerCase() === 'matchodds'
            ) {
              const matchOddIndex = this.matchDetails.markets.indexOf(market);
              self.matchDetails.markets.unshift(
                this.matchDetails.markets.splice(matchOddIndex, 1)[0]
              );
            }
          });
          this.isLiveSport = res?.data.is_live_sport;
          self.scoreType = self.matchDetails?.score_type;
          self.scoreKey = self.matchDetails?.score_key;
          // console.log("this.match",this.matchDetails)
          // console.log('socreboard',this.scoreType, this.scoreKey)

          if (self.callType == 1) {
            if (self.matchDetails.sport_id == '-1') {
              self.tvUrl = self.matchDetails?.live_sport_tv_url;
            }
            if (self.matchDetails.sport_id == '-17') {
              this.getScoreBoard();
              // alert(self.matchDetails?.tv_url)
              // alert(            self.tvUrl = self.matchDetails?.live_sport_tv_url              )
              // this.isShowTv = true;
              self.tvUrlCricket = self.sanitizer.bypassSecurityTrustResourceUrl(
                self.matchDetails?.tv_url
              );
            }
            if (self.matchDetails.sport_id > '0') {
              if (
                self.matchDetails?.tv_url != undefined &&
                self.matchDetails?.tv_url != null &&
                self.matchDetails?.tv_url != 'null' &&
                self.matchDetails?.tv_url != ''
              ) {
                // this.isShowTv = true;
                let url = self.matchDetails?.tv_url;
                self.tvUrlCricket =
                  self.sanitizer.bypassSecurityTrustResourceUrl(url);
              }
              this.getScoreBoard();
            }
            this.getDataUrl(self.tvUrl);
            this.callType = 2;
            if (this.matchDetails?.max_stack) {
              this.matchDetails.max_stack = this.shorterNumber.transform(
                Number(this.matchDetails?.max_stack)
              );
              // this.numFormatter(Number(this.matchDetails?.max_stack))
            }
          }
        }
      },
      (err) => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      }
    );
  }
  showtabWinMarket:any;
  showtabPlaceMarket:any;
  showtabMarket(tab:any){
    if(tab==1){
      this.showtabWinMarket= true;
      this.showtabPlaceMarket= false;

    }
    else{
      this.showtabWinMarket= false;
      this.showtabPlaceMarket= true;

    }

  }
  showActiveClass1(){ 
    if(this.showtabWinMarket == true){
      return 'show active'
    }
    else{
      return ''
    }
  }
  showActiveClass(){ 
    if(this.showtabPlaceMarket == true){
      return 'show active'
    }
    else{
      return ''
    }
  }
 

  openCloseTv() {
    this.isShowTv = !this.isShowTv;
  }
  openCloseScoreBoard() {
    this.isShowScoreBoard = !this.isShowScoreBoard;
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
        max = array[i];
      }
    }
    this.maxIndexWinner = maxIndex;
    // console.log('maxIndex',maxIndex, this.maxIndexWinner);
    return maxIndex;
  }

  getDataUrl(url: any) {
    let self = this;
    self.safeSrc = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  showMinMax32(value: any, isValid: any) {
    this.isMinMax = !this.isMinMax;
    if (this.isMinMax) {
      this.minMaxShow = value;
    } else {
      this.minMaxShow = -1;
    }
  }
  ngOnDestroy() {
    //this.sub$.unsubscribe()
    // this.matchDetailsSub$.unsubscribe()
  }

  getScoreBoard() {
    let payload = {
      match_id: this.matchId,
      sport_id: this.sportId,
      score_type: this.scoreType,
      score_key: this.scoreKey,
    };
    this.matchService.scoreBoard(payload).subscribe(
      (response) => {
        if (response.status && response?.data) {
          if (this.scoreType == '0' && this.scoreKey != '0') {
            if (response.data.url) {
              if (this.scoreCallType === 1) {
                this.isTvScoreBoard = response.data.url;
                this.isTvScoreBoards = true;
                this.getScoreBordUrl(response.data.url);
                // console.log('addnew', response.data.url);
              }
            }
            this.scoreCallType = 2;
            this.ballByBallScore = response.data.data;
          } else {
            this.documents = response.data;
            if (this.documents != null) {
              this.scoreCallType = 2;

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
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      }
    );
  }

  getbuttonValue() {
    this.matchService.getbuttonValue().subscribe((res) => {
      if (res?.status) {
        this.stackList = res?.data;
        
      }
    });
  }

  getScoreBordUrl(url: string) {
    let self = this;
    self.tvScoreBoard = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getMarketnFancyBet(type: any) {
    this.betType = type;
    let payload = {
      bet_type: type,
      match_id: this.matchId,
    };
    this.matchService.getMarketAndfancyBet(payload).subscribe(
      (res) => {
        if (res?.status) {
          this.betList = res?.data;
        }
      },
      (err) => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            2000
          );
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            2000
          );
        }
      }
    );
  }

  viewAllResult(matchId: any) {
    this.router.navigate(['main/casino-result', matchId]);
  }

  setStack(value: any) {
    this.stackValue = value;
  }

  setBetData(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp = 'back';
      $('#backpopup').modal('show');
    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp = 'lay';
      $('#backpopup').modal('show');
    }

    this.bets = bets;
    this.slectedIDteams = [];
    this.teamLastPosition = [];
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name });
                this.teamLastPosition.push({ winloss: element.win_loss });
                // console.log('====================================');
                // console.log(this.teamLastPosition);
                // console.log('====================================');
              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName;
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataOdds(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp = 'back';

      $('#backpopup').modal('show');
    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp = 'lay';

      $('#backpopup').modal('show');
    }

    // console.log('setBetDataOdds',betDetail)
    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    // console.log(marketId)
    // console.log(market_name)
    if (market_name == 'total card' || market_name == 'total point') {
      marketId = marketId.slice(0, -4);
    }
    betDetail.market_id = marketId;
    this.bets = bets;
    this.slectedIDteams = [];
    this.teamLastPosition = [];
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name });
                this.teamLastPosition.push({ winloss: element.win_loss });
                // console.log('====================================');
                // console.log(this.teamLastPosition);
                // console.log('====================================');
              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName;
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataTotalCards(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp = 'back';

      $('#backpopup').modal('show');
    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp = 'lay';

      $('#backpopup').modal('show');
    }

    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    if (market_name == 'total point') {
      let marketIdnew = marketId.slice(0, -4);
      marketId = marketIdnew + 2222;
    }
    if (market_name == 'match odds') {
      marketId = marketId + 2222;
    }
    if (market_name == 'total card') {
      marketId = marketId;
    }
    betDetail.market_id = marketId;

    this.bets = bets;
    this.slectedIDteams = [];
    this.teamLastPosition = [];
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name });
                this.teamLastPosition.push({ winloss: element.win_loss });
                // console.log('====================================');
                // console.log(this.teamLastPosition);
                // console.log('====================================');
              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName;
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.run);
    }
  }
  setBetDataTotalPoint(betDetail: any, teamName: any, type: any, bets: any) {
    if (betDetail.odds == '--') {
      return;
    }
    if (betDetail.is_back == '1') {
      this.isBetPopUp = 'back';

      $('#backpopup').modal('show');
    }
    if (betDetail.is_back == '0') {
      this.isBetPopUp = 'lay';

      $('#backpopup').modal('show');
    }

    let market_name = betDetail.maketName.toLowerCase();
    let marketId = betDetail.market_id;
    if (market_name == 'total card') {
      let marketIdnew = marketId.slice(0, -4);
      marketId = marketIdnew + 1111;
    }
    if (market_name == 'match odds') {
      marketId = marketId + 1111;
    }
    if (market_name == 'total point') {
      marketId = marketId;
    }
    betDetail.market_id = marketId;

    this.bets = bets;
    this.slectedIDteams = [];
    this.teamLastPosition = [];
    if (this.matchDetails && this.matchDetails?.markets) {
      if (Array.isArray(this.matchDetails?.markets)) {
        this.matchDetails.markets.forEach((element: any) => {
          if (betDetail?.market_id == element?.market_id) {
            if (Array.isArray(element?.runner_json)) {
              element?.runner_json.forEach((element: any, index: any) => {
                this.slectedIDteams.push({ index: element.name });
                this.teamLastPosition.push({ winloss: element.win_loss });
                // console.log('====================================');
                // console.log(this.teamLastPosition);
                // console.log('====================================');
              });
            }
          }
        });
      }
    }
    this.stackValue = 0;
    this.teamName = teamName;
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === 'M') {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.odds);
    } else {
      this.betdetails = betDetail;
      this.odds = Number(this.betdetails?.run);
    }
  }

  placeBetData() {
    if (this.betplaceType === 'M') {
      this.placeMarketBet();
    } else {
      this.placeFancyBet();
    }
    // betplaceType == 'M' ? placeMarketBet(): placeFancyBet()
  }
  placeMarketBet() {
    this.closeModal();
    var dateIST = new Date(this.betdetails.market_start_time);
    let currentTime:any =  new Date;
    let matchDate:any= new Date(dateIST.getTime());
      var matchDateTime = Date.parse(matchDate);
      var datum = Date.parse(currentTime);
      let matchTimeZone= matchDateTime/1000;
      let CurrentTimeZone= datum/1000 + 300;
     
      if(CurrentTimeZone < matchTimeZone)
      {
        this.toaster.warning('Bet Will Be Start Before 5 Minutes!')
         return 
      }
    this.betdetails.user_id = Number(this.userInfo?.user_id);
    this.betdetails.stack = Number(this.stackValue);
    this.betdetails.odds = Number(this.odds);
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
        this.toaster.error(res?.message);
      }
    });
  }
  placeFancyBet() {
    this.closeModal();
    this.betdetails.stack = Number(this.stackValue);
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
        this.toaster.error(res?.message);
      }
    });
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
    this.odds = Number(this.odds.toFixed(2));
    return;
    // }
  }

  checkNumberPositvie(values: any) {
    if (values >= 0) {
      return true;
    } else {
      return false;
    }
  }
  // }

  setFancyPosition(data: any, index: number) {
    this.fancyPostion = [];

    if (data) this.fancyPostion = JSON.parse(data);
  }

  showLastResultsFiveCricket(result: any) {
    let self = this;
    let marketData = {
      //  market_id: '41.2114091208400'
      market_id: result.mid,
      match_id: self.matchDetails.match_id,
    };
    this.matchService.marketResultDetailsByMarketId(marketData).subscribe(
      (response) => {
        if (!response.error) {
          self.fiveCricketArray = response.data.data[0];
          self.fiveCricet_data = JSON.parse(response.data.data[0].card_data);
          // $('#exampleModal').show();
          // console.log('modalFiveCricket',this.fiveCricketArray)
          // console.log('modalFiveCricket',this.fiveCricet_data)
        }
      },
      (error) => {}
    );
  }
  closeModalPopup() {
    return;
  }
  closeModal1(data: string) {}

  getMatchOdds() {
    let payload = {
      match_id: this.matchId,
      is_show_100_percent: 0,
      user_id: Number(this.userInfo.user_id),
      user_type_id: Number(this.userInfo.user_type_id),
      is_live_sport: '0',
    };

    this.matchService.getMatchOdds(payload).subscribe(
      (res) => {
        if (res?.status) {
          this.matchDetailsSocketData = res?.data;

          if (
            this.matchDetails &&
            this.matchDetails?.fancies &&
            this.matchDetailsSocketData &&
            this.matchDetailsSocketData?.fancies
          ) {
            this.matchDetails['fancies'].forEach((ele: any, index: number) => {
              (ele.display_message =
                this.matchDetailsSocketData?.fancies[index].display_message),
                (ele.session_size_no =
                  this.matchDetailsSocketData?.fancies[index].session_size_no),
                (ele.session_size_yes =
                  this.matchDetailsSocketData?.fancies[index].session_size_yes),
                (ele.session_value_no =
                  this.matchDetailsSocketData?.fancies[index].session_value_no),
                (ele.session_value_yes =
                  this.matchDetailsSocketData?.fancies[
                    index
                  ].session_value_yes);
            });
          }

          if (
            this.matchDetails &&
            this.matchDetails?.markets &&
            this.matchDetailsSocketData &&
            this.matchDetailsSocketData?.markets
          ) {
            this.matchDetails?.markets?.forEach(
              (element: any, index: number) => {
                element.status =
                  this.matchDetailsSocketData?.markets[index]?.status;

                if (
                  element?.runner_json &&
                  this.matchDetailsSocketData?.markets[index]?.runner_json
                ) {
                  element?.runner_json.forEach((ele: any, index1: number) => {
                    ele.back =
                      this.matchDetailsSocketData?.markets[index]?.runner_json[
                        index1
                      ].back;
                    ele.lay =
                      this.matchDetailsSocketData?.markets[index]?.runner_json[
                        index1
                      ].lay;
                    ele.status =
                      this.matchDetailsSocketData?.markets[index]?.runner_json[
                        index1
                      ].status;
                  });
                }
              }
            );
          }
        }
      },
      (err) => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      },
      () => {
        if (this.location?.path().split('/')[2] === 'racingdetails') {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      }
    );
  }

  openBookmarkerModal(market: any) {
    // console.log('====================================');
    // console.log(market);
    // console.log('====================================');
    let marketName = market.name.toLowerCase();
    if (marketName == 'bookmaker' || marketName == 'book maker') {
      $('#modalBookmarker').modal('show');
    } else {
      $('#otherModal').modal('show');
    }
    //$('#modalBookmarker').modal('show');
  }

  openFancyModal() {
    $('#modalFacy').modal('show');
  }

  onOpenRules(matchId: any) {
    // console.log("onOpenRules", matchId);
    $('#modalGmaeRules').modal('show');
  }
  closeRulesModal() {
    $('#modalGmaeRules').modal('hide');
  }

  suspendedClass(selectionStatus: any, marketStatus: any) {
    if (
      selectionStatus == 'ACTIVE' ||
      selectionStatus == 'OPEN' ||
      selectionStatus == '1' ||
      selectionStatus == 'True' ||
      marketStatus == 'ACTIVE' ||
      marketStatus == 'OPEN' ||
      marketStatus == '1' ||
      marketStatus == 'True'
    ) {
      return '';
    } else {
      return 'suspended';
    }
  }
  NotclickAbleClass(selectionStatus: any, marketStatus: any) {
    if (
      selectionStatus == 'ACTIVE' ||
      selectionStatus == 'OPEN' ||
      selectionStatus == '1' ||
      selectionStatus == 'True' ||
      marketStatus == 'ACTIVE' ||
      marketStatus == 'OPEN' ||
      marketStatus == '1' ||
      marketStatus == 'True'
    ) {
      return '';
    } else {
      return 'NotclickAble';
    }
  }
  suspendedText(selectionStatus: any, marketStatus: any) {
    if (
      selectionStatus == 'ACTIVE' ||
      selectionStatus == 'OPEN' ||
      selectionStatus == '1' ||
      selectionStatus == 'True' ||
      marketStatus == 'ACTIVE' ||
      marketStatus == 'OPEN' ||
      marketStatus == '1' ||
      marketStatus == 'True'
    ) {
      return false;
    } else {
      return true;
    }
  }
  ShowTextStatus(value: any) {
    if (value == 'CLOSED') {
      return 'CLOSED';
    } else {
      return 'SUSPENDED';
    }
  }

  public minMaxDetails: any;
  showMinMax(matchDetail: any) {
    // console.log('minMaxDetails?.session_min_stack',matchDetail)
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

  showResults(result: any) {
    let marketData = {
      market_id: result.mid,
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          this.card_dataArray = response.data;
          this.card_data = JSON.parse(response.data.card_data);
          $('#modalpokerresult').show();
        }
      },
      (error) => {}
    );
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
  show32Results(result: any) {
    // $('#modal32Cardresult').show();
    let marketData = {
      market_id: result.mid,
      // market_id: '29.211907135331'
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          this.card_data32Array = response.data;
          this.card_data32 = JSON.parse(response.data.card_data);
          this.oddEven = Object.entries(this.card_data32[0].odd_even);
          // console.log(this.oddEven);

          // console.log('card_data32', this.card_data32[0].cardsTotal)
          $('#modal32Cardresult').show();
        }
      },
      (error) => {}
    );
  }

  closeInstanceWorliPopupResult() {
    $('#modalInstanceWorliresult').hide();
  }
  close32PopupResult() {
    $('#modal32Cardresult').hide();
  }
  closeLuckyPopup() {
    $('#modalLucky').hide();
  }
  closePopupResult() {
    $('#modalpokerresult').hide();
    $('#modalDragonTiger2020result').hide();
    $('#modalDragonTiger1Dayresult').hide();
  }
  showAAAResultText(value: any) {
    return value;
  }
  showPlayerNumber(value: any) {
    return value.replace('Player', '');
  }
  getNameSingle(value: any) {
    return value.replace('Single', '');
  }
  getNameSingleWorli(value: any) {
    return value.replace('Single', '');
  }

  showResults1(result: any) {
    let marketData = {
      market_id: result.market_id,
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          this.card_dataArray1 = response.data;
          this.card_data = JSON.parse(response.data.card_data);
          this.aall = this.card_data.aall.split(',');
          this.ball = this.card_data.ball.split(',');
          $('#modalandarbaharresult').show();
        }
      },
      (error) => {}
    );
  }
  closePopupAndarResult() {
    $('#modalandarbaharresult').hide();
  }
  covertToDigits(a: any, b: any) {
    let totalVal;
    totalVal = parseFloat(a) + parseFloat(b);
    return totalVal.toFixed(2);
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

  showDragonTiger1DayResults(result: any) {
    // $('#modalDragonTiger1Dayresult').show();
    // return
    let marketData = {
      market_id: result.mid,
      //market_id: "28.210508112115"
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          this.card_dataArray = response.data;
          this.card_data = JSON.parse(response.data.card_data);
          console.log(this.card_data);

          $('#modalDragonTiger1Dayresult').show();
        }
      },
      (error) => {}
    );
  }
  showDragonTiger2020Results(result: any) {
    let marketData = {
      market_id: result.mid,
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          this.card_dataArray = response.data;
          this.card_data = JSON.parse(response.data.card_data);
          // console.log(this.card_dataArray);
          // console.log(this.card_data);
          $('#modalDragonTiger2020result').show();
        }
      },
      (error) => {}
    );
  }

  showInstanceWorliResults(result: any) {
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      //market_id: '23.210508115314'
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          if (response.data != null) {
            $('#modalInstanceWorliresult').show();
            this.instanceWorliArray = response.data;
            this.instanceWorli = JSON.parse(response.data.card_data);
            // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
            //     console.log(this.oddEven);

            // console.log('card_data32', this.instanceWorli[0].cardsTotal)
          } else {
            console.log('No Data Found');
          }
        }
      },
      (error) => {}
    );
  }
  showBollyWoodLastResults(result: any) {
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      //  market_id: "33.210908160402"
    };
    this.matchService.getCasinoResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          if (response.data != null) {
            $('#modalBollyWoodLastResults').show();
            this.bollywoodArray = response.data;
            this.instanceWorli = JSON.parse(response.data.card_data);
            // console.log(this.instanceWorli);
          } else {
            console.log('No Data Found');
          }
        }
      },
      (error) => {}
    );
  }
  closeBollyWoodTablePopupResult() {
    $('#modalBollyWoodLastResults').hide();
  }
  closeResultModal() {
    $('#modalLastResults').modal('hide');
  }

  openResult(result: any) {
    // console.log(this.matchDetails.match_id);
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id,
    };
    this.matchService.getMatchResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          if (response.data != null) {
            //  $('#modalLastResults').show();
            $('#modalLastResults').modal('show');
            this.cardResult = response.data.data[0];
            this.cardResultArray = JSON.parse(response.data.data[0].card_data);
            // console.log(this.cardResultArray, 'jklkjklk');
            // console.log(this.cardResultArray, this.cardResult, 'jklkjklk');
          } else {
            console.log('No Data Found');
          }
        }
      },
      (error) => {}
    );
  }
  openResult1019(result: any) {
    // console.log(this.matchDetails.match_id);
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id,
    };
    this.matchService.getMatchResult(marketData).subscribe(
      (response) => {
        if (!response.error) {
          if (response.data != null) {
            //  $('#modalLastResults').show();
            $('#modalLastResults1019').modal('show');
            this.cardResult = response.data.data[0];
            this.cardResultArray = JSON.parse(response.data.data[0].card_data);
          } else {
            console.log('No Data Found');
          }
        }
      },
      (error) => {}
    );
  }
}
