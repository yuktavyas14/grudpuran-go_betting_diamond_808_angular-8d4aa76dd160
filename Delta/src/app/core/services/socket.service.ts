import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import * as io from 'socket.io-client';


import { environment as env } from './../../../environments/environment';
const BASE_URL = env.socket.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  soket:any = io(BASE_URL, { transports: ['websocket'] })

  constructor() {
    this.soket.on('disconnection',  function (){
      console.log('disconnection');
    });
    this.soket.on('connect', function () {
    console.log("connect")
  });
   }
  



   public getMessages = () => {
  return new Observable ((observer) => {
          this.soket.on('bet_place', (message : any) => {
              observer.next(message);
          });
  });
}


public getSports = () => {
  return new Observable ((observer) => {
          this.soket.on('sports', (message: any) => {
              observer.next(message);
          });
  });
}

public match_details = () => {
  return new Observable ((observer) => {
          this.soket.on('match_details', (message : any) => {
              observer.next(message);
          });
  });
}

public getMenucup = () => {
  return new Observable ((observer) => {
          this.soket.on('get_cup', (message : any) => {
              observer.next(message);
          });
  });
}


}