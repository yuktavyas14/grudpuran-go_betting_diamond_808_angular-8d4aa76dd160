import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserService{
 constructor(private api:ApiService){}
updatePassword(data):Observable<any>{
  return this.api.post('/api/user/changePassword',data)
}

checkExistUser(data):Observable<any>{
  return this.api.post('/api/user/checkExistUser',data)
}

getSetting():Observable<any>{
  return this.api.get('/api/globalSetting/getSetting')
}


}

// getSetting(data)
// /api/globalSetting/getSetting
// }

