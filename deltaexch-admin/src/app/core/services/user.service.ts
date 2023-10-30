import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserList } from '../model/userlist';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }

  getUserByParentId(data):Observable<UserList>{
    return this.api.post('/api/user/getUsersByParentId',data)
  }
  chipInOut(data):Observable<any>{
    return this.api.post('/api/accountStatement/chipInOut',data);
  }
  getUserBalance(data):Observable<any>{
    return this.api.post('/api/user/getUserBalance',data);
  }
  getGGRReport(data):Observable<any>{
    return this.api.post('/api/report/getGGR',data);
  }

  updateLimitEx(data):Observable<any>{
    return this.api.post('/api/user/updateExposureLimit',data);
  }
  updateCreditRef(data):Observable<any>{
    return this.api.post('/api/user/updateCreditReferance',data);
  }

  updatePasswored(data):Observable<any>{
    return this.api.post('/api/user/updateChildPassword',data);
  }
  updateUserBetLock(data):Observable<any>{
    return this.api.post('/api/user/updateUserAndBetStatus',data);
  }
  getUserDetailsById(data):Observable<any>{
    return this.api.post('/api/user/getUserDetailsByUserId',data);
  }
  createUser(data):Observable<any>{
    return this.api.post('/api/user/createUser',data)
  }

  checkUserExists(data):Observable<any>{
    return this.api.post('/api/user/checkExistUser',data)
  }

  getAccountStatement(data):Observable<any>{
    return this.api.post('/api/accountStatement/getUserAccountStatementHistory',data)
  }

  getExposure(data):Observable<any>{
    return this.api.post('/api/user/getExposure',data)
  }
  deletedBetHistory(data):Observable<any>{
    return this.api.post('/api/bet/deletedBetHistory',data)
  }
  getUserLoginHistory(data):Observable<any>{
    return this.api.post('/api/user/getUserLoginHistory',data)
  }
  getPaymentDepositList(data):Observable<any>{
    return this.api.post('/api/payment/getPaymentDepositList',data)
  }
  acceptDepositRequest(data):Observable<any>{
    return this.api.post('/api/payment/acceptDepositRequest',data)
  }
  getPaymentWithdrawList(data:any):Observable<any>{
    return this.api.post('/api/payment/getPaymentWithdrawList',data);
  }
  rejectWithdrawRequest(data:any):Observable<any>{
    return this.api.post('/api/payment/rejectWithdrawRequest',data);
  }
  acceptWithdrawRequest(data:any):Observable<any>{
    return this.api.post('/api/payment/acceptWithdrawRequest',data);
  }
  manualWithdrawRequest(data:any):Observable<any>{
    return this.api.post('/api/payment/manualWithdrawRequest',data);
  }
  getBetsByMatchId(data):Observable<any>{
    return this.api.post('/api/bet/getBetsByMatchId',data);
  }

  changePassword(data):Observable<any>{
    return this.api.post('/api/user/updatePassword',data);
  }

  updatePassword(data):Observable<any>{
    return this.api.post('/api/user/changePassword',data);

  }

  getUserDetailsbyName(data):Observable<any>{
    return this.api.post('/api/user/userDetail',data)
  }
}
