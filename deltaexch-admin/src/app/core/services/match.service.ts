import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable ,Subject} from 'rxjs';
// import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { SocketServiceService } from './socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  messages: Subject<any>;

  constructor(private api:ApiService) {
    // this.messages = <Subject<any>>socketservie
    // .connect()

  }
  getCasinoSportList(){
    // /api/match/getCasinoMatches
    return this.api.get('/api/match/getCasinoMatches')
  }

  getCasinoSport() :Observable<any>{
    return this.api.get('/api/casino/getCasinoSport')
  }

  updateCasinoSports(data):Observable<any>{
    return this.api.post("/api/casino/updateCasinoSports",data)
  }

  getCasinoResult1(data):Observable<any>{
    return this.api.post('/api/casino/getCasinoResult',data)
  }

  getCasinoResult(data):Observable<any>{
    // return this.api.post('/api/getCasinoResult/getCasinoResult',data)
        return this.api.post('/api/betResult/marketResultDetailsByMarketId',data)
  }
  getfancyList(data):Observable<any>{
    return this.api.post('/api/fancy/getOnlineFancyList',data)
  }

  getfancyListsetting(data):Observable<any>{
    return this.api.post('/api/fancy/fancyList',data)
  }
  getTelegramEnable(data:any):Observable<any>{
    return this.api.post('/api/telegram/enable',data)
  }
  createMarket(data):Observable<any>{
    return this.api.post('/api/market/createMarket',data)
  }

  getfancyListOffline(data):Observable<any>{
    return this.api.post('/api/fancy/fancyList',data)
  }
  getfancyListOfflinedropdown(data):Observable<any>{
    return this.api.post('/api/fancy/fancyListSessionDropDown',data)
  }
  updateSportStatus(data):Observable<any>{
    return this.api.post("/api/sport/updateSportStatus",data)
  }
  updateSprotsForUser(data):Observable<any>{
    return this.api.post("/api/user/updateSprotsForUser",data)
  }
  updateSeriesStatus(data):Observable<any>{
    return this.api.post("/api/series/updateSeriesStatus",data)
  }

  getCurrentBets(data):Observable<any>{
    return this.api.post('/api/bet/getCurrentBets',data);
  }
  requestDisable():Observable<any>{
    return this.api.post('/api/telegram/requestDisable')
  }
  verifyDisableOtp(data):Observable<any>{
    return this.api.post('/api/telegram/verifyDisableOtp',data)
  }
  // getCurrency(data):Observable<any>{
  //   return this.api.get('/api/user/getCurrency');
  // }

  // updateCurrency(data):Observable<any>{
  //   return this.api.post('/api/user/updateCurrency',data);
  // }

  // addCurrency(data):Observable<any>{
  //   return this.api.post('/api/user/addCurrency',data);
  // }

  getUserBook(data):Observable<any>{
    return this.api.post('/api/user/userBook',data);
  }

  lockBetuserWise(data):Observable<any>{
    return this.api.post('/api/user/lockUnlockBetMatchWise',data);
  }

  getBetHistory(data):Observable<any>{
    return this.api.post('/api/bet/getBetHistory',data);
  }

  getMarketAndfancyBet(data):Observable<any>{
    return this.api.post('/api/bet/getMarketAndFancyBet',data);
  }

  updateMaxStackUserWise(data):Observable<any>{
    return this.api.post('/api/match/updateMaxStackUserWise',data);
  }
  changeMatchStatusUserWise(data):Observable<any>{
    return this.api.post('/api/match/changeMatchStatusUserWise',data);
  }

  getMatchOdds(data):Observable<any>{
    return this.api.post('/api/match/getMatchOdds',data);
  }
  getMatchResult(data):Observable<any>{
    return this.api.post('/api/betResult/marketResultDetailsByMarketId',data);
  }

  getListbettingUsers(data):Observable<any>{
    return this.api.post('/api/user/bettingLockedUsers',data);
  }
  updateMatchStatus(data):Observable<any>{
    return this.api.post("/api/match/updateMatchStatus",data);
  }
  updateCupName(data):Observable<any>{
    return this.api.post("/api/match/updateCupName",data);
  }

  updateMatchCupStatus(data):Observable<any>{
    return this.api.post("/api/match/updateMatchCupStatus",data);
  }

  getScoreMatches():Observable<any>{
    return this.api.get("/api/match/getScoreMatches");
  }

  lockFancyuserWise(data):Observable<any>{
    return this.api.post('/api/user/lockUnlockFancyBetMatchWise',data);
  }

  searchUser(data):Observable<any>{
    return this.api.post('/api/user/searchUser',data)
  }

  getGeneralReport(data):Observable<any>{
    return this.api.post('/api/report/generalCreditReport',data);
  }
  getSportList(data):Observable<any>{
    return this.api.post('/api/sport/getSport',data)
  }
  userDetailForUser(data):Observable<any>{
    return this.api.post('/api/user/userDetailForUser ',data);
  }
  getSprotsForUser (data):Observable<any>{
    return this.api.post('/api/user/getSprotsForUser',data)
  }
  getSeriesList(data):Observable<any>{
    return this.api.post('/api/series/getOnlineSeriesList',data)
  }

  getSeriesList1(data):Observable<any>{
    return this.api.post('/api/series/getSeries',data)
  }
  getSeriesListHeader(data:any):Observable<any>{
    return this.api.post('/api/series/getSeriesForHeader',data)
  }
  getMarketWatch(data):Observable<any>{
    return this.api.post('/api/match/marketWatch',data)
  }

  getMatchList(data):Observable<any>{
    return this.api.post('/api/match/getOnlineMatchList',data)
  }

  deleteOddsBet(data):Observable<any>{
    return this.api.post('/api/bet/deleteOddsBet',data)
  }
  deletePermanentDeleteBet(data):Observable<any>{
    return this.api.post('/api/bet/permanentDeleteBet',data)
  }
  permanentDeleteBet(data):Observable<any>{
    return this.api.post('/api/bet/permanentDeleteBet',data)
  }
  checkBetActvieDeactive(data):Observable<any>{
    return this.api.post('/api/user/checkBetActvieDeactive',data)
  }

  deleteBetFancy(data):Observable<any>{
    return this.api.post('/api/bet/deleteBetFancy',data)
  }

  scoreBoard(data):Observable<any>{
    return this.api.post('/api/match/scoreBoard',data)
  }

  getMenuList():Observable<any>{
    return this.api.get('/api/match/getSportsListForMenu')
  }
  getMatchDetails(data):Observable<any>{
    return this.api.post('/api/match/getMatchDetail',data);
  }
  getMarketWatchInplay():Observable<any>{
    return this.api.get('/api/match/marketWatchInPlay');
  }

  getProfitLossReport(data):Observable<any>{
    return this.api.post('/api/report/getProfitLoss',data);
  }

  getCupsForMenu():Observable<any>{
    return this.api.get('/api/match/getCupsForMenu')
  }
  getSignupUserList(data):Observable<any>{
    return this.api.post('/api/user/getSignupUserList',data);
  }

  getMatchListAdded(data):Observable<any>{
    return this.api.post("/api/match/getMatches",data);
  }

autoResultDeclare(data):Observable<any>{
  return this.api.post('/api/betResult/autoDeclareMarketResult',data);
}

declareMarket(data):Observable<any>{
  return this.api.post("/api/betResult/declareMarketResult",data);
}
declareFancy(data):Observable<any>{
  return this.api.post("/api/betResult/declareFancyResult",data);
}
marketRollback(path,data):Observable<any>{
  return this.api.post(path,data);
}
marketAbandon(data):Observable<any>{
  return this.api.post("/api/betResult/abandonedMarket",data);
}
fancyAbandon(data):Observable<any>{
  return this.api.post("/api/fancy/abandonedFancy",data);
}

getMarketList(data):Observable<any>{
  // marketList
  // getOnlineMarketList
  return this.api.post('/api/market/getOnlineMarketList',data)
}
getMarketListSetting(data):Observable<any>{
  // marketList
  // getOnlineMarketList
  return this.api.post('/api/market/marketList',data)
}
getDeclaredMarket(data):Observable<any>{
  return this.api.post("/api/betResult/getDeclaredMarkets",data)
}
getSeries(data):Observable<any>{
  return this.api.post("/api/series/getSeries",data);
}
getSelectionMarket(data):Observable<any>{
  return this.api.post("/api/market/marketSelectionList",data)
}
updateFancyMessage(data):Observable<any>{
  return this.api.post("/api/fancy/updateFancyMessage",data)
}
updateFancyStatus(data):Observable<any>{
  return this.api.post("/api/fancy/updateFancyStatus",data);
}
updateMarketStatus(data):Observable<any>{
  return this.api.post("/api/market/updateMarketStatus",data)
}
updateMatchSettting(data):Observable<any>{
  return this.api.post("/api/match/updateMatchSetting",data);
}
createSeries(data):Observable<any>{
  return this.api.post("/api/series/createSeries",data);
}
createFancy(data):Observable<any>{
  return this.api.post("/api/fancy/createFancy",data);
}
createMatch(data):Observable<any>{
  return this.api.post("/api/match/createMatch",data);
}
getOnlineUsers(data):Observable<any>{
  return this.api.post('/api/user/getOnlineUser',data)
}
logoutallUsers():Observable<any>{
  return this.api.get('/api/user/logoutAllUser');
}
getGlobalSettings():Observable<any>{
  return this.api.get('/api/globalSetting/getSetting')
}
getAccountDetails() :Observable<any>{
  return this.api.get('/api/payment/getAccountDetails')
}
setGlobalSettings(data):Observable<any>{
  return this.api.post('/api/globalSetting/updateBySuperAdmin',data)
}
getPaymentDepositList(data):Observable<any>{
  return this.api.post('/api/payment/getPaymentDepositList',data)
}
updateAccountDetails(data):Observable<any>{
  return this.api.post('/api/payment/updateAccountDetails',data)
}
uploadQRCode(data):Observable<any>{
  return this.api.imageupload('/api/payment/uploadQRCode',data)
}
getUserGlobalSetting(data):Observable<any>{
  return this.api.post('/api/globalSetting/getUserGlobalSetting',data)
}
updateUserGlobalSetting(data):Observable<any>{
  return this.api.post('/api/globalSetting/updateUserGlobalSetting',data)
}


uploadlogo(data):Observable<any>{
  return this.api.imageupload('/api/globalSetting/uploadLogo',data)
}
uploadFavIcon(data):Observable<any>{
  return this.api.imageupload('/api/globalSetting/uploadFavicon',data)
}

// /api/globalSetting/getSetting

globalSetting():Observable<any>{
  return this.api.get('/api/user/logoutAllUser');
}
addBonusTypesBySuperAdmin(data):Observable<any>{
  return this.api.post('/api/user/addBonusTypesBySuperAdmin',data)
}
getAffiliateCode(data):Observable<any>{
  return this.api.post('/api/user/getAffiliateCode',data)
}

addAffiliateCode(data):Observable<any>{
  return this.api.post('/api/user/addAffiliateCode',data)
}
addAffiliateRangeTypesBySuperAdmin(data):Observable<any>{
  return this.api.post('/api/user/addAffiliateRangeTypesBySuperAdmin ',data)
}
getUserBonusTypes():Observable<any>{
  return this.api.get('/api/user/getUserBonusTypes')
}
getBonusName():Observable<any>{
  return this.api.get('/api/user/getBonusName')
}
getUserBonusHistory():Observable<any>{
  return this.api.get('/api/user/getUserBonusHistory')
}
getUserAffiliatedCommission(data):Observable<any>{
  return this.api.post('/api/user/getUserAffiliatedCommission',data)
}
getUserAffiliatedHistrory(data):Observable<any>{
  return this.api.post('/api/user/getUserAffiliatedHistrory',data)
}


}

