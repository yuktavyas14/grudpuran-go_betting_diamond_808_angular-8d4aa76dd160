import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  public chartData = new Subject<any>();

  constructor(private api:ApiService) { }

  dreamCasinogetUrl(data:any): Observable<any> {
    return this.api.post('dreamcasino/getUrl',data);
  }
  userAuthentication(data:any): Observable<any> {
    return this.api.post('worldCasino/userAuthentication',data);
  }

  getCategoryList(data :any): Observable<any> {
    return this.api.post('dreamcasino/getCategoryList', data)
  }

  dreamcasinogetGameList(data : any): Observable<any> {
    return this.api.post('dreamcasino/getGameList',data);
  }
  worldCasinoGetGameList(data : any): Observable<any> {
    return this.api.post('worldCasino/getGameList',data);
  }


  getProductList(data : any) : Observable<any> {
    return this.api.post('dreamcasino/getProductList', data)
  }
  
  getProvidersList() : Observable<any> {
    return this.api.get('worldCasino/getProvidersList')
  }
  setPieChartData(data: any) {
    this.chartData.next({ chartDataShow: data });
  }
  getPieChartData(): Observable<any> {
    return this.chartData.asObservable();
  }
  scoreBoard(data : any):Observable<any>{
    return this.api.post('match/scoreBoard',data)
  }
  getCasinoSport() :Observable<any>{
    return this.api.get('casino/getCasinoSport')
  }
  getMenuList():Observable<any>{
    return this.api.get('match/getSportsListForMenu')
  }
  getBetHistory(data : any):Observable<any>{
    return this.api.post('bet/getUserBetHistory',data)
  }
  getSportList(data : any):Observable<any>{
    return this.api.post('sport/getSport',data)
  }
  getSetting():Observable<any>{
    return this.api.get('globalSetting/getSetting')
  }
  getAccountStatement(data : any):Observable<any>{
    return this.api.post('accountStatement/getUserAccountStatementHistory',data)
  }
  getBetsByMatchId(data:any):Observable<any>{
    return this.api.post('bet/getBetsByMatchId',data);
  }
  getProfitLossList(data : any):Observable<any>{
    return this.api.post('report/getProfitLoss',data)
  }
  getUnsettaledBetList(data : any):Observable<any>{
    return this.api.post('bet/getCurrentBets',data)
  }
  getMarketAndfancyBet(data : any):Observable<any>{
    return this.api.post('bet/getMarketAndFancyBet',data);
  }
  getMatchOdds(data : any):Observable<any>{
    return this.api.post('match/getMatchOdds',data);
  }
  getMatchDetails(data : any):Observable<any>{
    return this.api.post('match/getMatchDetail',data);
  }
  placeMarketBet(data : any):Observable<any>{
    return this.api.post('bet/placeMarketBet',data)
  }
  placeFancyBet(data : any):Observable<any>{
    return this.api.post('bet/placeFancyBet',data)
  }

  getbuttonValue():Observable<any>{
    return this.api.get('user/getButtionValue');
  }

  setbuttonValue(data : any):Observable<any>{
    return this.api.post('user/setButtionValue',data)
  }
  getUserBalance(data : any):Observable<any>{
    return this.api.post('user/getUserBalance',data)
  }
  searchMatchList(reportData: any): Observable<any> {
    return this.api.get( 'searchMatches?search=' + reportData);
}
searchByMatchNameHeader(data:any):Observable<any>{
  return this.api.post('match/searchByMatchNameHeader',data)
}
  getMarketWatch(data : any):Observable<any>{
    return this.api.post('match/marketWatch',data)
  }

  getKeyTextSetting():Observable<any>{
    return this.api.get('globalSetting/getSetting')
  }
  getCupsForMenu():Observable<any>{
    return this.api.get('match/getCupsForMenu')
  }
  getSeriesList(data:any):Observable<any>{
    return this.api.post('series/getSeriesForHeader',data)
  }
  getCasinoResult(data:any):Observable<any>{
    return this.api.post('series/getCasinoResult',data)
  }
  getCasinoResultbet(data:any):Observable<any>{
    return this.api.post('casino/getCasinoResult',data)
  }
  getMatchCasinoResult(data:any):Observable<any>{
    return this.api.post('casino/getCasinoResult',data)
  }
  marketResultDetailsByMarketId(data:any):Observable<any>{
    return this.api.post('betResult/marketResultDetailsByMarketId',data)
  }
  getCasinoSportList():Observable<any>{
    return this.api.get('match/getCasinoMatches')
  }
  getMatchResult(data:any):Observable<any>{
    return this.api.post('betResult/marketResultDetailsByMarketId',data);
  }
  globalConstant(): Observable<any> {
    return this.api.get('globalSetting/getSetting')
  }
  getMatchCountryListBySportId(data:any):Observable<any>{
    return this.api.post('match/getMatchCountryListBySportId',data);
  }
  getMatchVenueListByCountryCodeSportId(data:any):Observable<any>{
    return this.api.post('match/getMatchVenueListByCountryCodeSportId',data);
  }
  payInGetPaymentUrl(data:any):Observable<any>{
    return this.api.post('payment/payInGetPaymentUrl',data);
  }
  sendWithdrawRequest(data:any):Observable<any>{
    return this.api.post('payment/sendWithdrawRequest',data);
  }
  userDetailForUser(data:any):Observable<any>{
    return this.api.post('user/userDetailForUser ',data)
  }
  getPaymentWithdrawList(data:any):Observable<any>{
    return this.api.post('payment/getPaymentWithdrawList',data);
  }

  createWallet(data:any):Observable<any>{
    return this.api.post('crypto/createWallet',data)
  }
  getCryptoWallet(data:any):Observable<any>{
    return this.api.post('crypto/getCryptoWallet',data)
  }
  getWalletBalance(data:any):Observable<any>{
    return this.api.post('crypto/getWalletBalance',data)
  }
  depositCrypto(data:any):Observable<any>{
    return this.api.post('crypto/deposit',data)
  }
  getUserWalletByUserName(data:any):Observable<any>{
    return this.api.post('user/getUserWalletByUserName',data)
  }





  getSupernowaLoginToken(): Observable<any> {
    return this.api.post('supernowa/Login');
  }
  getTvBetLoginToken(): Observable<any> {
    return this.api.post('tvbet/AuthToken');
  }
  // getTvBetLoginToken()
  getFawkoginToken(data:any): Observable<any> {
    // alert("apie")
    return this.api.fawrk('poker/auth',data);
  }
  getMatkaLoginToken(): Observable<any> {
    return this.api.get('matka/login');
  }
  getSuperSpadeToken(): Observable<any> {
    // alert("apie")
    return this.api.get('superSpade/registration');
  }

  getEzugiToken(): Observable<any>{
    return this.api.get('ezugi/ezugiLogin')
  }
  requestDisable():Observable<any>{
    return this.api.post('telegram/requestDisable')
  }
  verifyDisableOtp(data:any):Observable<any>{
    return this.api.post('telegram/verifyDisableOtp',data)
  }
  getTelegramEnable(data:any):Observable<any>{
    return this.api.post('telegram/enable',data)
  }
lastResultClass(matchId:any,value:any){
  let result= value.toLowerCase();
  if(matchId == -1018){
    if(result =='a'){
     return 'playera'
    }
   
   if(result =='i'){
     return 'playerb'
   }
   return ''
  }
  if(matchId == -1 || matchId == -2){
    if(result =='a'){
     return 'playera'
    }
   
   if(result =='i'){
     return 'playerb'
   }
   return ''
  }
  if(matchId == -3){
    if(result =='t'){
     return 'playera'
    }
   
   if(result =='d'){
     return 'playerc'
   }
   if(result =='l'){
    return 'playertib'
  }
   return ''
  }
   if(matchId == -1025){
     if(result =='e'){
      return 'playera'
     }
     if(result =='t'){
      return 'playertie'
    }
    if(result =='r'){
      return 'playerb'
    }
    return ''
   }
 

  if(matchId == -1021){
    if(result =='a'){
     return 'playera'
    }
   
   if(result =='i'){
     return 'playerb'
   }
   return ''
  }
  if(matchId == -5){
    if(result =='a'){
     return 'playera'
    }
   
   if(result =='b'){
     return 'playerb'
   }
   if(result =='tie'){
    return 'playertie'
  }
   if(result =='t'){
    return 'playertie'
  }
   return ''
  }
  if(matchId == -4){
    if(result =='a'){
     return 'playera'
    }
   
   if(result =='b'){
     return 'playerb'
   }
   if(result =='tie'){
    return 'playertie'
  }
   if(result =='t'){
    return 'playertie'
  }
  if(result =='0' || result == 0){
    return 'playertie'
  }
   return ''
  }
  if(matchId == -1011 || matchId == -1014){
    if(result =='t'){
     return 'playerb'
    }
   
   if(result =='d'){
     return 'playera'
   }
   if(result =='t'){
    return 'playert'
  }
   if(result =='tie'){
    return 'playertie'
  }
   return ''
  }
  if(matchId == -145){
    if(result =='l'){
     return 'playera'
    }
   
   if(result =='h'){
     return 'playerb'
   }
   if(result =='t'){
    return 'playert'
  }
   if(result =='tie'){
    return 'playertie'
  }
   return ''
  }
  if(matchId == -1024){
    if(result =='t'){
     return 'playera'
    }
   
   if(result =='d'){
     return 'playerb'
   }
   if(result =='tie'){
    return 'playertie'
  }
   return ''
  }
  if(matchId == -1022){
    if(result =='h'){
     return 'playerb'
    }
   
   if(result =='l'){
     return 'playera'
   }
   if(result =='tie'){
    return 'playertie'
  }
   if(result =='t'){
    return 'playert'
  }
   return ''
  }
  if(matchId == -1026){
    if(result =='d'){
     return 'playera'
    }
   
   if(result =='l'){
     return 'playerc'
   }
   if(result =='tie'){
    return 'playertie'
  }
   if(result =='t'){
    return 'playerb'
  }
   return ''
  }
 return ''

}
getformat(number:any){
  if(number == 0) {
  return 0;
}
else
{        
// hundreds
if(number <= 999){
  return number ;
}
// thousands
else if(number >= 1000 && number <= 999999){
  return (number / 1000) + 'K';
}
// millions
else if(number >= 1000000 && number <= 999999999){
  return (number / 1000000) + 'M';
}
// billions
else if(number >= 1000000000 && number <= 999999999999){
  return (number / 1000000000) + 'B';
}
else
  return number ;
}
}
  

}
