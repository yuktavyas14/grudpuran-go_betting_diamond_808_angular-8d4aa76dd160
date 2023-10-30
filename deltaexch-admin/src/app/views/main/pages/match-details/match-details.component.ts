import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatchService } from "src/app/core/services/match.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/core/model/user";
import { Location } from "@angular/common";
import { resolve } from "q";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { SocketServiceService } from "src/app/core/services/socket-service.service";
// import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

import { Observable, of, from } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { DomSanitizer } from "@angular/platform-browser";
declare var $;

@Component({
  selector: "app-match-details",
  templateUrl: "./match-details.component.html",
  styleUrls: ["./match-details.component.css"],
  providers: [SocketServiceService, UserService],
})
export class MatchDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UserService,
    private socketSerive: SocketServiceService,
    private service: MatchService,
    private ac: ActivatedRoute,
    private location: Location,
    private toaster: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    //  this.socketSerive.connect()
    //   this.socketSerive.messages$.subscribe(msg => {
    //     console.log(msg, "message");
    //   })
  }
  win_loss = [];
  betName;
  useradmininfo = new User().getData();
  matchId;
  max_stack: number = 0;
  marketId;
  matchDetailsSocketData;
  matach_max_stack;
  matach_name;
  betType = "M";
  betListHistory: any = [];
  userDetails: any;
  betList: any = [];
  type: any = "all";
  page = 1;
  code: any;
  fromAmt: any = 0;
  toAmt: any = 0;
  ipAdd: any = "";
  fancyPostion: any;
  userBooklist: any = [];
  userBookmakerlist: any = [];
  home: any;
  away: any;
  documents: any;
  displayScore: boolean = false;
  ballByBallScore: any;
  scoreType: any = "1";
  scoreKey = "0";
  is_active_parent: any;
  userList: any = [];
  matchDetails: any;
  bettype$: any;
  betlistsocket: any;
  sport_id: any;
  userlist: any;
  tvUrlCricket: any;
  flagUser: any = "Active";
  searchKey = new FormControl("");
  id: any;
  is_bet_lock: any;
  is_fancy_lock: any;
  fancyName: any;
  public safeSrc: any;
  classFlag: Boolean;
  public callType = 1;
  public scoreCallType = 1;
  isTvScoreBoard;
  tvScoreBoard;
  public tvUrl: any;
  isShowTv: boolean = false;
  cardResult: any;
  cardResultArray: any;
  sessionMarketFancy: any;
  overByOverFancy: any;
  ballByBallFancy: any;

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
      this.matchId = param.get("matchId");
      this.marketId = param.get("marketId");
      if (this.matchId && this.marketId) {
        this.classFlag = true;
      }
      this.getMatchDetails(this.matchId, this.marketId);
    });

    this.ac.params.subscribe((val) => {
      // put the code from `ngOnInit` here
      // if(localStorage.getItem("marketID")){
      // localStorage.removeItem("marketID")
      // }

      if (history?.state?.id) {
        localStorage.setItem("marketID", history.state.id);
      }
      if (localStorage.getItem("marketID")) {
        this.id = true;
      } else {
        this.id = false;
      }
    });
    // if(history.state.id){
    //   localStorage.setItem("marketID", history.state.id)
    // }
    // if(localStorage.getItem("marketID")){
    //   this.id = true;
    // }else {
    //   this.id = false;
    // }
    this.getMarketnFancyBet(this.betType);

    // this.getMatchDetails(this.matchId,this.marketId)
    this.getScoreBoard();
    this.searchKey.valueChanges.subscribe((value) => {
      this.searchUserList(value);
    });
    this.socketSerive.getMessages().subscribe(
      (res) => {
        if (res?.["data"] && res?.["ids"]) {
          if (
            res?.["ids"]
              ?.split(",")
              .includes(this.useradmininfo.user_id.toString())
          ) {
            if (this.betList?.length > 0) {
              if (res?.["data"].match_id == this.matchId) {
                // if(this.betList[0].match_id == )
                this.betList.unshift(res?.["data"]);
              }
            } else {
              // console.log(this.betList, "test")
              if (res?.["data"].match_id == this.matchId) {
                if (!this.betList && res?.["data"]) {
                  this.betList = [];
                  this.betList.push(res?.["data"]);
                }
              }
            }
            //this.getMatchDetails(this.matchId , this.marketId)
          }
        } else {
          this.getMarketnFancyBet("M");
        }
      },
      (error: any) => {
        console.log("error");
      }
    );

    this.socketSerive.match_details().subscribe((res) => {
      //this.getMatchDetails(this.matchId , this.marketId)
    });

    // this.getMatchDetails(this.matchId , this.marketId)
    //this.getMatchOdds()
  }
  ngAfterViewInit() {
    // this.pageScroll()
    this.checkBetActvieDeactive();
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
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            5000
          );
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(
            () => resolve(this.getMarketnFancyBet(this.betType)),
            5000
          );
        }
      }
    );
  }
  ngOnDestroy() {
    localStorage.removeItem("marketID");
  }
  getMatchDetails(matchId, marketId) {
    let self = this;
    // this.matchDetails = {}
    var payload;
    if (marketId == "cup") {
      payload = {
        match_id: matchId,
        user_id: Number(this.useradmininfo.user_id),
        user_type_id: Number(this.useradmininfo.user_type_id),
      };
    } else {
      payload = {
        match_id: matchId,
        is_show_100_percent: 0,
        user_id: Number(this.useradmininfo.user_id),
        user_type_id: Number(this.useradmininfo.user_type_id),
        market_id: this.id ? marketId : "",
      };
    }
    // let payload = {
    //   match_id :matchId,
    //   is_show_100_percent : 0,
    //   user_id :Number(this.useradmininfo.user_id),
    //   user_type_id :Number(this.useradmininfo.user_type_id),
    //   market_id:  history.state.id ? '' : marketId

    // }
    this.service.getMatchDetails(payload).subscribe(
      (res) => {
        if (res?.status) {
          this.matchDetails = res?.data;
          // console.log(this.matchDetails, "test")
          this.matchDetails.markets.forEach((market) => {
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
          this.sessionMarketFancy = this.matchDetails.fancies.filter(
            (item: any) =>
              (item.fancy_type_id == 1 || item.fancy_type_id == 2) &&
              item.ball_sess == "1" &&
              item.display_message != "Result Awaiting"
          );
          this.overByOverFancy = this.matchDetails.fancies.filter(
            (item: any) =>
              (item.fancy_type_id == 1 || item.fancy_type_id == 2) &&
              item.ball_sess == "2" &&
              item.display_message != "Result Awaiting"
          );
          this.ballByBallFancy = this.matchDetails.fancies.filter(
            (item: any) =>
              (item.fancy_type_id == 1 || item.fancy_type_id == 2) &&
              item.ball_sess == "3" &&
              item.display_message != "Result Awaiting"
          );
          this.scoreType = this.matchDetails?.score_type;
          this.scoreKey = this.matchDetails?.score_key;
          this.sport_id = this.matchDetails?.sport_id;
          if (this.matchDetails?.match_name) {
            this.matach_name = this.matchDetails?.match_name;
          }
          if (this.matchDetails?.max_stack) {
            this.matach_max_stack = this.matchDetails?.max_stack;
          }
          // if(!this.tvUrlCricket){
          //   // console.log("tvulr")
          //     this.tvUrlCricket = this.matchDetails?.tv_url;
          // }

          if (self.callType == 1) {
            if (self.matchDetails.sport_id == "-1") {
              self.tvUrl = self.matchDetails?.live_sport_tv_url;
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
            }
            this.getDataUrl(self.tvUrl);
          }
          this.callType = 2;
        }
        if (this.matchDetails?.is_active_parent)
          this.is_active_parent = this.matchDetails?.is_active_parent;

        if (this.matchDetails?.self_active) {
          this.flagUser = "Active";
        } else {
          this.flagUser = "Deactive";
        }
      },
      (err) => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(
            () => resolve(this.getMatchDetails(this.matchId, this.marketId)),
            1000
          );
        }
      }
    );
  }
  getColor(value) {
    if (value > 0) {
      return "#4caf50";
    } else if (value < 0) {
      return "#dc3545";
    } else {
      return "black";
    }
  }
  getDataUrl(url) {
    let self = this;
    self.safeSrc = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getBetHistory(type) {
    if (type == "MV") {
      type = "M";
      this.toAmt = 0;
      (this.fromAmt = 0),
        (this.code = ""),
        (this.ipAdd = ""),
        (this.type = "all");
      this.searchKey.reset();
    }
    let payload = {
      user_id: Number(this.useradmininfo?.user_id),
      user_type_id: Number(this.useradmininfo?.user_type_id),
      bet_type: type,
      user_code: this.searchKey.value,
      ip_address: this.ipAdd,
      from_amount: Number(this.fromAmt),
      to_amount: Number(this.toAmt),
      type: this.type == "all" ? "" : this.type,
      page: 1,
      match_id: this.matchId,
      is_back: this.type,
      // user_code : use2rcode
    };
    this.service.getBetHistory(payload).subscribe((res) => {
      if (res?.status) {
        this.betListHistory = res?.data?.data;
      } else {
      }
    });
  }
  getBetLockUsers(type) {
    this.userList = [];
    let payload = {
      match_id: this.matchId,
      lock_type: type,
    };
    this.service.getListbettingUsers(payload).subscribe((res) => {
      if (res?.status) {
        this.userList = res?.data;
      }
    });
  }

  // this function is uset to reset view more bet form
  closeViewmorebet() {
    this.ipAdd = "";
    this.fromAmt = 0;
    this.toAmt = 0;
    this.type = "all";
    this.searchKey.reset();
  }

  pageScroll() {
    $(document).ready(function () {
      var s = $(".sticker");
      var pos = s.position();
      var sHeight = s.height();

      $(window).scroll(function () {
        var windowpos = $(window).scrollTop();
        if (windowpos >= sHeight / 2 + pos.top) {
          s.addClass("stick");
        } else {
          $("body").css("paddingTop", "0");
          s.removeClass("stick");
        }
      });
    });
  }

  lockUnlockBet(user) {
    let type;
    if (user?.bet_lock) {
      type = "U";
    } else {
      type = "L";
    }
    let payload = {
      user_id: user?.user_id,
      user_type_id: user?.user_type_id,
      match_id: this.matchId,
      type: type,
    };
    this.service.lockBetuserWise(payload).subscribe((res) => {
      if (res?.status) {
        this.toaster.success(res?.message);
        this.getBetLockUsers("B");
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  lockUnlockFancy(user) {
    // alert()
    let type;
    if (user?.fancy_lock) {
      type = "U";
    } else {
      type = "L";
    }
    let payload = {
      user_id: user?.user_id,
      user_type_id: user?.user_type_id,
      match_id: this.matchId,
      type: type,
    };
    this.service.lockFancyuserWise(payload).subscribe((res) => {
      if (res?.status) {
        // debugger;
        // alert()
        // debugger
        this.getBetLockUsers("F");
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
  getUserBookList() {
    let payload = {
      match_id: this.matchId,
      market_id: this.marketId,
    };
    this.service.getUserBook(payload).subscribe((res) => {
      if (res?.status) {
        this.userBooklist = res?.data;
      }
    });
  }
  getUserBookMarkList() {
    let bookmarkData = [];
    bookmarkData = this.matchDetails.markets.filter(
      (market) => market.name == "Bookmaker"
    );
    let payload = {
      match_id: this.matchId,
      market_id: bookmarkData[0].market_id,
    };
    this.service.getUserBook(payload).subscribe((res) => {
      if (res?.status) {
        this.userBookmakerlist = res?.data;
      }
    });
  }
  getUserBookCasinoList() {
    let payload = {
      match_id: this.matchId,
      market_id: this.matchDetails.markets[0].market_id,
    };
    this.service.getUserBook(payload).subscribe((res) => {
      if (res?.status) {
        this.userBooklist = res?.data;
      }
    });
  }

  setFancyPosition(data: any, index: number) {
    this.fancyPostion = [];
    if (data) this.fancyPostion = JSON.parse(data);
  }

  checkNumberPositvie(values: any) {
    if (values == 0) {
      return "text-black";
    } else {
      if (values >= 0) {
        return "text-success";
      } else {
        return "text-danger";
      }
    }
  }

  getScoreBoard() {
    let payload = {
      match_id: this.matchId,
      score_type: this.scoreType,
      score_key: this.scoreKey,
      sport_id: this.sport_id,
    };
    this.service.scoreBoard(payload).subscribe(
      (response) => {
        if (response.status) {
          if (this.scoreType == "0" && this.scoreKey != "0") {
            if (response.data.url) {
              if (this.scoreCallType === 1) {
                this.isTvScoreBoard = response.data.url;
                this.getScoreBordUrl(response.data.url);
                console.log("addnew", response.data.url);
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
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(() => resolve(this.getScoreBoard()), 5000);
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(() => resolve(this.getScoreBoard()), 5000);
        }
      }
    );
  }

  deleteBetFancy(bet_id, marketID) {
    // alert()
    let payload = {
      bet_id: bet_id,
      market_id: marketID,
      is_void: 0,
    };

    this.service.deleteBetFancy(payload).subscribe((res) => {
      if (res?.status) {
        this.getBetHistory("M");
        this.getMarketnFancyBet("M");
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  getScoreBordUrl(url) {
    let self = this;
    self.tvScoreBoard = self.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  deleteOddsBet(bet_id, marketID) {
    // alert()
    let payload = {
      bet_id: bet_id,
      market_id: marketID,
      is_void: 0,
    };

    this.service.deleteOddsBet(payload).subscribe((res) => {
      if (res?.status) {
        this.getBetHistory("M");
        this.getMarketnFancyBet("M");

        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  checkBetActvieDeactive() {
    let payload = {
      match_id: this.matchId,
    };

    this.service.checkBetActvieDeactive(payload).subscribe((res) => {
      if (res?.status) {
        // console.log(res, "res")
        this.is_bet_lock = res?.data?.is_bet_lock;
        this.is_fancy_lock = res?.data?.is_fancy_lock;

        if (!this.is_bet_lock) {
          this.betName = "All Deactivate";
        } else {
          this.betName = "All Activate";
        }
        if (!this.is_fancy_lock) {
          this.fancyName = "All Deactivate";
        } else {
          this.fancyName = "All Activate";
        }
      } else {
        // this.toaster.error(res?.message)
      }
    });
  }

  deactiveBets() {
    let payload = {
      user_id: 0,
      user_type_id: 0,
      match_id: this.matchId,
      type: this.is_bet_lock ? "U" : "L",
    };
    this.service.lockBetuserWise(payload).subscribe((res) => {
      if (res?.status) {
        // console.log("reasdfs", res)
        // this.is_bet_lock =
        this.checkBetActvieDeactive();
        this.toaster.success(res?.data);
        // this.getBetLockUsers('B')
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  deactiveFancy() {
    let payload = {
      user_id: 0,
      user_type_id: 0,
      match_id: this.matchId,
      type: this.is_fancy_lock ? "U" : "L",
    };
    this.service.lockFancyuserWise(payload).subscribe((res) => {
      if (res?.status) {
        // console.log("reasdfs", res)
        // this.fancyName = ''
        this.checkBetActvieDeactive();

        this.toaster.success(res?.data);
        // this.getBetLockUsers('B')
      } else {
        //  this.toaster.error(res?.message)
      }
    });
  }
  parmentDeleteBet(bet_id, marketID, betType) {
    let payload = {
      bet_id: bet_id,
      market_id: marketID,
      bet_type: betType,
    };

    this.service.permanentDeleteBet(payload).subscribe((res) => {
      if (res?.status) {
        this.getBetHistory("D");
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  confirmBox(bet_id, marketID, betype, delete_status) {
    // console.log("bet_id, marketID, betype, delete_status", bet_id, marketID, betype, delete_status)
    Swal.fire({
      title: "Are you sure want to delete?",
      // text: 'You will not be able to recover this file!',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        if (betype == "1" && delete_status == "0")
          this.deleteOddsBet(bet_id, marketID);
        if (betype == "2" && delete_status == "0")
          this.deleteBetFancy(bet_id, marketID);
        if (delete_status == "1")
          this.parmentDeleteBet(bet_id, marketID, betype);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  gloabalData: any;
  getGlobalSetting() {
    this.service.getGlobalSettings().subscribe((res) => {
      if (res?.status) {
        console.log("res", res);
        this.gloabalData = res?.data;
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  updateMaxStackUserWise() {
    let payload = {
      max_stack: this.max_stack,
      match_id: this.matchId,
      sport_id: this.sport_id,
    };
    this.service.updateMaxStackUserWise(payload).subscribe((res) => {
      // console.log(res, "upde maz")
      if (res?.status) {
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  changeMatchStatusUserWise() {
    let active;
    if (this.flagUser == "Active") {
      active = 0;
    } else if (this.flagUser == "Deactive") {
      active = 1;
    }
    let payload = {
      is_active: active.toString(),
      match_id: this.matchId,
    };
    this.service.changeMatchStatusUserWise(payload).subscribe((res) => {
      // console.log(res, "upde maz")
      if (res?.status) {
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  searchUserList(value) {
    this.userList = [];
    let payload = {
      user_name: value,
      is_search_only_user: 1,
    };
    this.service.searchUser(payload).subscribe((res) => {
      if (res?.status) {
        this.userlist = res?.data;
      }
    });
  }

  getUserDetails() {
    let payload = {
      user_name: this.searchKey.value,
    };

    this.userService.getUserDetailsbyName(payload).subscribe((res) => {
      if (res?.status) {
        this.userDetails = res?.data;
      }
    });
  }

  getMatchOdds() {
    // this.matchDetails = {}
    var payload;
    if (this.marketId == "cup") {
      payload = {
        match_id: this.matchId,
        user_id: Number(this.useradmininfo.user_id),
        user_type_id: Number(this.useradmininfo.user_type_id),
        is_live_sport: "0",
      };
    } else {
      payload = {
        match_id: this.matchId,
        is_show_100_percent: 0,
        user_id: Number(this.useradmininfo.user_id),
        user_type_id: Number(this.useradmininfo.user_type_id),
        market_id: this.id ? this.marketId : "",
        is_live_sport: "0",
      };
    }
    // let payload = {
    //   match_id :   this.matchId,
    //   user_id: Number(this.useradmininfo.user_id),
    //   user_type_id: Number(this.useradmininfo.user_type_id),
    //   is_live_sport: "0",
    //   market_id: this.id ?  '' : this.marketId,
    // }

    this.service.getMatchOdds(payload).subscribe(
      (res) => {
        if (res?.status) {
          this.matchDetailsSocketData = res?.data;

          if (
            this.matchDetails &&
            this.matchDetails?.fancies &&
            this.matchDetailsSocketData &&
            this.matchDetailsSocketData?.fancies
          ) {
            this.matchDetails["fancies"].forEach((ele, index) => {
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
            this.matchDetails?.markets?.forEach((element, index) => {
              // element.status = this.matchDetailsSocketData?.markets[index]?.status
              element.status =
                this.matchDetailsSocketData?.markets[index]?.status;

              if (
                element?.runner_json &&
                this.matchDetailsSocketData?.markets[index]?.runner_json
              ) {
                element?.runner_json.forEach((ele, index1) => {
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
            });
          }
        }
      },
      (err) => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      },
      () => {
        if (this.location?.path().split("/")[2] === "matchdetails") {
          setTimeout(() => resolve(this.getMatchOdds()), 1000);
        }
      }
    );
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
  showAAAResultText(value) {
    return value;
  }
  showPlayerNumber(value) {
    return value.replace("Player", "");
  }

  getNameSingle(value) {
    return value.replace("Single", "");
  }
  getNameSingleWorli(value) {
    return value.replace("Single", "");
  }
  onOpenRules() {
    // console.log("onOpenRules", matchId);
    $("#modalGmaeRules").modal("show");
  }
  closeRulesModal() {
    $("#modalGmaeRules").modal("hide");
  }
  openResult(result) {
    //$('#modalInstanceWorliresult').show();
    let marketData = {
      market_id: result.mid,
      match_id: this.matchDetails.match_id,
    };
    // this.service.getMatchResult(marketData).subscribe(
    //   (response) => {
    //     if (!response.error) {
    //       if (response.data != null) {
    //         //  $('#modalLastResults').show();
    //         $("#modalLastResults").modal("show");

    //         this.cardResult = response.data.data[0];
    //         this.cardResultArray = JSON.parse(response.data.data[0].card_data);
    //         console.log(this.cardResultArray, this.cardResult, "jklkjklk");
    //         // this.oddEven = Object.entries(this.instanceWorli[0].odd_even);
    //         //     console.log(this.oddEven);
    //       } else {
    //         console.log("No Data Found");
    //       }
    //     }
    //   },
    //   (error) => {}
    // );
  }
  closeResultModal() {
    $("#modalLastResults").modal("hide");
  }

  minMaxDetails: any;
  showMinMax(matchDetail) {
    this.minMaxDetails = matchDetail;
    $("#minMaxPopUp").modal("show");
  }
  closeMinMax() {
    $("#minMaxPopUp").modal("hide");
  }
  getMarket(market: any) {
    let marketName = market.name.toLowerCase();
    if (marketName == "bookmaker" || marketName == "book maker") {
      return true;
    } else {
      return false;
    }
  }
}
