import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserService{
 constructor(private api:ApiService){}
updatePassword(data :any):Observable<any>{
  return this.api.post('user/changePassword',data)
}
checkExistUser(data: any):Observable<any>{
  return this.api.post('user/checkExistUser',data)
}
}

