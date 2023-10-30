import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatchService } from "src/app/core/services/match.service";
import { resolve } from "q";
import { User } from "src/app/core/model/user";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { SocketService } from "src/app/core/services/socket.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NgZone } from "@angular/core";
import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
  query,
  group,
  stagger,
} from "@angular/animations";

declare var $;

@Component({
  selector: "app-racing-details",
  templateUrl: "./racing-details.component.html",
  styleUrls: ["./racing-details.component.scss"],
  animations: [
    trigger("flip", [
      transition("*=>*", [
        animate(
          ".6s",
          keyframes([
            style({ transform: "rotateX(0deg)", offset: 0 }),
            style({ transform: "rotateX(-90deg)", offset: 0.5 }),
            style({ transform: "rotateX(-180deg)", offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class RacingDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  sportId;

  selectedIndex2: number = -1;

  selectedIndex: any = "Fancy1";

  constructor(
    public router: Router,
    public socketService: SocketService,
    public loader: NgxSpinnerService,
    private service: MatchService,
    private ac: ActivatedRoute,
    private location: Location,
    public toaster: ToastrService,
    private sanitizer: DomSanitizer,
    private _ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    this.sportId = sessionStorage.getItem("sportId");
  }
  cardResult: any;
  cardResultArray: any;
  marketname: any;
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
  slotDateTime;
  betType = "M";
  bets: any;
  betList: any = [];
  type: any = "all";
  page = 1;
  public safeSrc: any;
  public callType = 1;
  public scoreCallType = 1;
  public tvUrl: any;

  code: any;
  matchDetailsSocketData;
  fromAmt: any = 0;
  toAmt: any = 0;
  ipAdd: any = "";
  showBetslip = false;
  odds = 0;
  scoreKey = "0";
  betplaceType;
  stackValue = 0;
  betdetails: any = {};
  teamName: any;
  stackList: any;
  tvUrlCricket: any;
  scoreType: any = "1";
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
  racingWinMarket: any;
  racingPlaceMarket: any;

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.matchId = param.get("matchId");
      this.marketId = param.get("marketId");
      this.slotDateTime = param.get("slotDateTime");
      this.getMatchDetails(this.matchId, this.marketId);
      //alert(this.matchId)
    });

    // this.ac.params.subscribe((val) => {
    //   if (localStorage.getItem("marketID")) {
    //     localStorage.removeItem("marketID");
    //   }
    //   if (history.state.id) {
    //     localStorage.setItem("marketIDuser", history.state.id);
    //   }
    //   if (localStorage.getItem("marketIDuser")) {
    //     this.id = true;
    //   } else {
    //     this.id = false;
    //   }

    //   this.getMatchDetails(this.matchId, this.marketId);
    // });

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
    this.socketService.getMessages().subscribe(
      (res) => {
        if (res?.["data"] && res?.["ids"]) {
          if (
            res?.["ids"]?.split(",").includes(this.userInfo.user_id.toString())
          ) {
            this.getMarketnFancyBet("M");
          }
        } else {
          // this.getMarketnFancyBet('M')
        }
      },
      (error: any) => {
        console.log("error");
      }
    );
  }

  showMinMax32(value, isValid) {
    this.isMinMax = !this.isMinMax;
    if (this.isMinMax) {
      this.minMaxShow = value;
    } else {
      this.minMaxShow = -1;
    }
  }

  ngAfterViewInit() {
    //this.ref.detach()
    // this.pageScroll()
  }
  ngOnDestroy() {
    // console.log('Service destroy')
    localStorage.removeItem("marketID");
    this.socketService.socketDisconnect();

    // localStorage.getItem("marketID")
  }
  getScoreBoard() {
    let payload = {
      match_id: this.matchId,
      sport_id: this.sportId,
      score_type: this.scoreType,
      score_key: this.scoreKey,
    };
    this.service.scoreBoard(payload).subscribe(
      (response) => {
        if (response.status) {
          if (this.scoreType == "0" && this.scoreKey != "0") {
            if (response.data.url) {
              if (this.scoreCallType === 1) {
                this.isTvScoreBoard = response.data.url;
                this.getScoreBordUrl(response.data.url);
                // console.log('addnew', response.data.url)
              }
            }
            this.scoreCallType = 2;
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
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(() => resolve(this.getScoreBoard()), 3000);
        }
      }
    );
  }
  getbuttonValue() {
    this.service.getbuttonValue().subscribe((res) => {
      if (res?.status) {
        this.stackList = res?.data;
      }
    });
  }
  setStack(value: any) {
    this.stackValue = value;
  }
  setBetData(betDetail, teamName, type, bets) {
    if (betDetail.odds == "--") {
      return;
    }
    this.bets = bets;
    this.stackValue = 0;
    this.teamName = teamName;
    this.showBetslip = true;
    this.betplaceType = type;
    if (type === "M") {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.odds;
    } else {
      this.betdetails = betDetail;
      this.odds = this.betdetails?.run;
    }
    this.oldOdds = this.odds;
  }

  placeMarketBet() {
    var dateIST = new Date(this.betdetails.market_start_time);
    let currentTime: any = new Date();
    let matchDate: any = new Date(dateIST.getTime());
    var matchDateTime = Date.parse(matchDate);
    var datum = Date.parse(currentTime);
    let matchTimeZone = matchDateTime / 1000;
    let CurrentTimeZone = datum / 1000 + 300;
    if (CurrentTimeZone < matchTimeZone) {
      this.toaster.warning("Bet Will Be Start Before 5 Minutes!");
      return;
    }

    this.betdetails.user_id = Number(this.userInfo?.user_id);
    this.betdetails.stack = Number(this.stackValue);
    this.betdetails.odds = Number(this.odds);
    this.loader.show();
    this.service.placeMarketBet(this.betdetails).subscribe((res) => {
      this.loader.hide();

      if (res.status) {
        this.toaster.success(res?.message);
        this.stackValue = 0;
        this.odds = 0;
        this.showBetslip = false;
      } else {
        // alert()
        // this.toaster.error("error")
        this.toaster.error(res?.message);
      }
    });
  }

  placeFancyBet() {
    this.betdetails.stack = Number(this.stackValue);
    this.odds = this.betdetails.run;
    this.loader.show();
    this.service.placeFancyBet(this.betdetails).subscribe((res) => {
      this.loader.hide();
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

  getMarketnFancyBet(type) {
    this.betType = type;
    let payload = {
      bet_type: type,
      match_id: this.matchId,
    };
    this.service.getMarketAndfancyBet(payload).subscribe(
      (res) => {
        if (res?.status) {
          this.betList = res?.data;
        }
      },
      (err) => {
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            5000
          );
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            5000
          );
        }
      }
    );
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
  getMatchDetails(matchId, marketId) {
    var payload;
    if (marketId == "cup") {
      payload = {
        match_id: matchId,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
      };
    } else {
      payload = {
        match_id: matchId,
        start_date_time:this.slotDateTime,
        is_show_100_percent: 0,
        user_id: Number(this.userInfo.user_id),
        user_type_id: Number(this.userInfo.user_type_id),
        market_id: this.id ? "" : marketId,
      };
    }

    this.service.getMatchDetails(payload).subscribe(
      (res) => {
        let self = this;

        if (res?.status) {
          this.matchDetails = res?.data;
          console.log(self.matchDetails.markets)
          const WinArray = self.matchDetails.markets.map((item: any) => {
            return item.market_type == "WIN";
          });
          const PlaceArray = self.matchDetails.markets.map((item: any) => {
            return item.market_type == "PLACE";
          });
          this.racingWinMarket = WinArray[0];
          this.racingPlaceMarket = PlaceArray[0];
       
          
        
          if (this.racingWinMarket && this.racingPlaceMarket) {
            if (self.callType == 1){
            this.showtabMarket(1);
          }
          } else {
            if (this.racingWinMarket) {
            if (self.callType == 1){

              this.showtabMarket(1);
            }
            } else {
            if (self.callType == 1){

              this.showtabMarket(2);
            }
            }
          }

          if (this.matchDetails.markets[0].cardsTotal != undefined) {
            this.indexofMax(this.matchDetails.markets[0].cardsTotal);
          }
          this.matchDetails.markets.forEach((market) => {
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
              market.name.toLowerCase() === "match odds" ||
              market.name.toLowerCase() === "matchodds"
            ) {
              const matchOddIndex = this.matchDetails.markets.indexOf(market);
              this.matchDetails.markets.unshift(
                this.matchDetails.markets.splice(matchOddIndex, 1)[0]
              );
            }
          });
          this.isLiveSport = res?.data.is_live_sport;
          this.scoreType = this.matchDetails?.score_type;
          this.scoreKey = this.matchDetails?.score_key;

          if (self.callType == 1) {
            if (self.matchDetails.sport_id == "-1") {
              self.tvUrl = self.matchDetails?.live_sport_tv_url;
            }
            if (self.matchDetails.sport_id == "-17") {
              self.tvUrl = self.matchDetails?.tv_url;
              this.getScoreBoard();
            }
            if (self.matchDetails.sport_id > "0") {
              if (
                self.matchDetails?.tv_url != undefined &&
                self.matchDetails?.tv_url != null &&
                self.matchDetails?.tv_url != "null" &&
                self.matchDetails?.tv_url != ""
              ) {
                this.isShowTv = true;
                let url = self.matchDetails?.tv_url;
                self.tvUrlCricket =
                  self.sanitizer.bypassSecurityTrustResourceUrl(url);
              }
              this.getScoreBoard();
            }
            this.getDataUrl(self.tvUrl);
          }

          this.callType = 2;
        }
      },
      (err) => {
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "racingdetails") {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      }
    );
  }
  showtabWinMarket: any;
  showtabPlaceMarket: any;
  showtabMarket(tab: any) {
    if (tab == 1) {
      this.showtabWinMarket = true;
      this.showtabPlaceMarket = false;
    } else {
      this.showtabWinMarket = false;
      this.showtabPlaceMarket = true;
    }
  }
  showActiveClass1() {
    if (this.showtabWinMarket == true) {
      return "show active";
    } else {
      return "";
    }
  }
  showActiveClass() {
    if (this.showtabPlaceMarket == true) {
      return "show active";
    } else {
      return "";
    }
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
        max = array[i];
      }
    }
    this.maxIndexWinner = maxIndex;
    return maxIndex;
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
        if (windowpos >= sHeight / 2 + pos.top) {
          s.addClass("sticky1");
        } else {
          $("body").css("paddingTop", "0");
          s.removeClass("sticky1");
        }
      });
    });
  }

  setFancyPosition(data: any, index: number) {
    this.fancyPostion = [];
    if (data) this.fancyPostion = JSON.parse(data);
  }

  changeOdssValue(data: any) {
    this.odds = Number(this.odds);

    if (this.bets == "bets") {
      if (data == "-") {
        this.odds = this.odds - 0.01;
      } else if (data == "+") {
        this.odds = this.odds + 0.01;
      }
      this.odds = Number(this.odds.toFixed(2));
    }
  }

  openBookmarkerModal(market: any) {
    let marketName = market.name.toLowerCase();
    if (marketName == "bookmaker" || marketName == "book maker") {
      $("#modalBookmarker").modal("show");
    } else {
      this.marketname = market.name;
      $("#modalBookmarker1").modal("show");
    }
  }

  openFancyModal() {
    $("#modalFacy").modal("show");
  }

  checkNumberPositvie(values: any) {
    if (values >= 0) {
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.showBetslip= false;
    this.stackValue = 0;
    this.odds = Number(this.oldOdds);
  }

  onOpenRules(matchId) {
    $("#modalGmaeRules").modal("show");
  }
  closeRulesModal() {
    $("#modalGmaeRules").modal("hide");
  }

  suspendedClass(selectionStatus, marketStatus) {
    if (
      selectionStatus == "ACTIVE" ||
      selectionStatus == "OPEN" ||
      selectionStatus == "1" ||
      selectionStatus == "True" ||
      marketStatus == "ACTIVE" ||
      marketStatus == "OPEN" ||
      marketStatus == "1" ||
      marketStatus == "True"
    ) {
      return "";
    } else {
      return "suspended";
    }
  }
  NotclickAbleClass(selectionStatus, marketStatus) {
    if (
      selectionStatus == "ACTIVE" ||
      selectionStatus == "OPEN" ||
      selectionStatus == "1" ||
      selectionStatus == "True" ||
      marketStatus == "ACTIVE" ||
      marketStatus == "OPEN" ||
      marketStatus == "1" ||
      marketStatus == "True"
    ) {
      return "";
    } else {
      return "NotclickAble";
    }
  }
  suspendedText(selectionStatus, marketStatus) {
    if (
      selectionStatus == "ACTIVE" ||
      selectionStatus == "OPEN" ||
      selectionStatus == "1" ||
      selectionStatus == "True" ||
      marketStatus == "ACTIVE" ||
      marketStatus == "OPEN" ||
      marketStatus == "1" ||
      marketStatus == "True"
    ) {
      return false;
    } else {
      return true;
    }
  }
  ShowTextStatus(value) {
    if (value == "CLOSED") {
      return "CLOSED";
    } else {
      return "SUSPENDED";
    }
  }

  public minMaxDetails;
  showMinMax(matchDetail) {
    this.minMaxDetails = matchDetail;
    $("#minMaxPopUp").modal("show");
  }
  closeMinMax() {
    $("#minMaxPopUp").modal("hide");
  }
  closePopup() {
    $("#modalrulesteenpatti").hide();
  }

  navigateTo(id) {
    // alert()
    // this.router.navigate(['/main/casinoresult/1'])
    this.router.navigate(["/main/casinoresult", id]);
  }

  closeLuckyPopup() {
    $("#modalLucky").hide();
  }
  closePopupResult() {
    $("#modalpokerresult").hide();
    $("#modalDragonTiger2020result").hide();
    $("#modalDragonTiger1Dayresult").hide();
  }

  covertToDigits(a, b) {
    let totalVal;
    totalVal = parseFloat(a) + parseFloat(b);
    return totalVal.toFixed("2");
  }

  setIndex(index: number) {
    this.selectedIndex2 = index;
  }
  getCategrey(activlassId: any) {
    this.selectedIndex = activlassId;
  }
}
