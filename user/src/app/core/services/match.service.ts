import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  public chartData = new Subject<any>();
  public matchRulesModalData = new Subject<any>();
  public bookmarkerModal = new Subject<any>();
  constructor(private api:ApiService) { }
  setPieChartData(data: any) {
    this.chartData.next({ chartDataShow: data });
  }

  getCategoryList(data): Observable<any> {
    return this.api.post('/api/dreamcasino/getCategoryList', data)
  }

  dreamcasinogetGameList(data): Observable<any> {
    return this.api.post('/api/dreamcasino/getGameList',data);
  }

  
  getProductList1(data) : Observable<any> {
    return this.api.post('/api/dreamcasino/getProductList', data)
  }
  getProductList(data) : Observable<any> {
    return this.api.get('/api/worldCasino/getProvidersList')
  }
  getGameList(data) : Observable<any> {
    return this.api.post('/api/worldCasino/getGameList', data)
  }
  getGameList1(): Observable<any> {
    return this.api.post('/api/dreamcasino/getGameList');
  }


  // dreamcasinogetGameList(data) : Observable<any> {
  //   return this.api.post('/api/dreamcasino/getProductList', data)
  // }


  getSlotCategoryList(data) : Observable<any> {
    return this.api.post('/api/dreamcasino/getSlotCategoryList', data)
  }
  getPieChartData(): Observable<any> {
    return this.chartData.asObservable();
  }
  scoreBoard(data):Observable<any>{
    return this.api.post('/api/match/scoreBoard',data)
  }
  searchByMatchNameHeader(data):Observable<any>{
    return this.api.post('/api/match/searchByMatchNameHeader',data)
  }
  getMenuList():Observable<any>{
    return this.api.get('/api/match/getSportsListForMenu')
  }
  getCupsForMenu():Observable<any>{
    return this.api.get('/api/match/getCupsForMenu')
  }
 
  getBetHistory(data):Observable<any>{
    return this.api.post('/api/bet/getUserBetHistory',data)
  }
  getTelegramEnable(data):Observable<any>{
    return this.api.post('/api/telegram/enable',data)
  }
  requestDisable():Observable<any>{
    return this.api.post('/api/telegram/requestDisable')
  }
  verifyDisableOtp(data):Observable<any>{
    return this.api.post('/api/telegram/verifyDisableOtp',data)
  }

  //  getCupsForMenu():Observable<any>{
  //   return this.api.get('/api/match/getCupsForMenu')
  // }

  getCasinoSportList(){
    // /api/match/getCasinoMatches
    return this.api.get('/api/match/getCasinoMatches')
  }

  getSportList(data):Observable<any>{
    return this.api.post('/api/sport/getSport',data)
  }
  getAccountStatement(data):Observable<any>{
    return this.api.post('/api/accountStatement/getUserAccountStatementHistory',data)
  }
  userDetailForUser(data):Observable<any>{
    return this.api.post('/api/user/userDetailForUser ',data)
  }
  getBetsByMatchId(data):Observable<any>{
    return this.api.post('/api/bet/getBetsByMatchId',data);
  }
  // getCasinoResult(data):Observable<any>{
  //   // return this.api.post('/api/getCasinoResult/getCasinoResult',data)
  //       return this.api.post('/api/betResult/marketResultDetailsByMarketId',data)
  // }

  getCasinoResult1(data):Observable<any>{
    return this.api.post('/api/casino/getCasinoResult',data)
  }
  getCasinoResult(data):Observable<any>{
    return this.api.post('/api/casino/getCasinoResult',data)
  }
  marketResultDetailsByMarketId(data):Observable<any>{
    return this.api.post('/api/betResult/marketResultDetailsByMarketId',data)
  }

  // /api/betResult/marketResultDetailsByMarketId

  getProfitLossList(data):Observable<any>{
    return this.api.post('/api/report/getProfitLoss',data)
  }
  getUnsettaledBetList(data):Observable<any>{
    return this.api.post('/api/bet/getCurrentBets',data)
  }
  getMarketAndfancyBet(data):Observable<any>{
    return this.api.post('/api/bet/getMarketAndFancyBet',data);
  }
  getMatchDetails(data):Observable<any>{
    return this.api.post('/api/match/getMatchDetail',data);
  }
  getMatchCountryListBySportId(data):Observable<any>{
    return this.api.post('/api/match/getMatchCountryListBySportId',data);
  }
  getMatchVenueListByCountryCodeSportId(data):Observable<any>{
    return this.api.post('/api/match/getMatchVenueListByCountryCodeSportId',data);
  }
  placeMarketBet(data):Observable<any>{
    return this.api.post('/api/bet/placeMarketBet',data)
  }
  placeFancyBet(data):Observable<any>{
    return this.api.post('/api/bet/placeFancyBet',data)
  }

  getMatchOdds(data):Observable<any>{
    return this.api.post('/api/match/getMatchOdds',data);
  }
  getbuttonValue():Observable<any>{
    return this.api.get('/api/user/getButtionValue');
  }

  setbuttonValue(data):Observable<any>{
    return this.api.post('/api/user/setButtionValue',data)
  }
  getUserBalance(data):Observable<any>{
    return this.api.post('/api/user/getUserBalance',data)
  }
  getMarketWatch(data):Observable<any>{
    return this.api.post('/api/match/marketWatch',data)
  }
  getSeriesList(data):Observable<any>{
    return this.api.post('/api/series/getSeriesForHeader',data)
  }
  getMatchVenuListbyCountryandSportId(data):Observable<any>{
    return this.api.post('/api/series/getSeriesForHeader',data)
  }
  getCountrylistBymatchId(data):Observable<any>{
    return this.api.post('/api/series/getSeriesForHeader',data)
  }


  getSupernowaLoginToken(): Observable<any> {
    return this.api.post('/api/supernowa/Login');
  }
  getMatkaLoginToken(): Observable<any> {
    return this.api.get('/api/matka/login');
  }
  getTvBetLoginToken(): Observable<any> {
    return this.api.post('/api/tvbet/AuthToken');
  }
  getFawkoginToken(data): Observable<any> {
    return this.api.get('/api/poker/getfawkDetails');

  }

  getSuperSpadeToken(): Observable<any> {
    return this.api.get('/api/superSpade/registration');
  }

  getEzugiToken(): Observable<any>{
    return this.api.get('/api/ezugi/ezugiLogin')
  }


  getCasinoSport() :Observable<any>{
    return this.api.get('/api/casino/getCasinoSport')
  }
  payInGetPaymentUrl(data:any):Observable<any>{
    return this.api.post('/api/payment/payInGetPaymentUrl',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
    
  }
  sendWithdrawRequest(data:any):Observable<any>{
    return this.api.post('/api/payment/sendWithdrawRequest',data);
  }
  getPaymentWithdrawList(data:any):Observable<any>{
    return this.api.post('/api/payment/getPaymentWithdrawList',data);
  }
 
  userAuthentication(data:any):Observable<any>{
    return this.api.post('/api/worldCasino/userAuthentication',data);
  }
 

  dreamCasinogetUrl(data:any): Observable<any> {
    return this.api.post('/api/dreamcasino/getUrl',data);
  }

  createWallet(data):Observable<any>{
    return this.api.post('/api/crypto/createWallet',data)
  }
  getCryptoWallet(data):Observable<any>{
    return this.api.post('/api/crypto/getCryptoWallet',data)
  }
  getWalletBalance(data):Observable<any>{
    return this.api.post('/api/crypto/getWalletBalance',data)
  }
  depositCrypto(data):Observable<any>{
    return this.api.post('/api/crypto/deposit',data)
  }
  getUserWalletByUserName(data):Observable<any>{
    return this.api.post('/api/user/getUserWalletByUserName',data)
  }
}
 