import { Injectable } from '@angular/core';
import { environment as env } from './../../../environments/environment';
const BASE_URL = env.socket.baseUrl;

import {Observable,Subject} from 'rxjs';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  soket:any = io(BASE_URL, { transports: ['websocket'] })

  constructor() {
    this.soket.on('disconnection',  function (){
      console.log('disconnection');
    });
    this.soket.on('connect', function () {
      console.log('socket connected');
  });
   }
   listen(eventName:string):any{
    this.soket.on(eventName, function (message) {

      // console.log("test",message);

      return message;
  });
   }

   public getMenucup = () => {
    return new Observable ((observer) => {
            this.soket.on('get_cup', (message) => {
                observer.next(message);
            });
    });
  }

   public getMessages = () => {
  return new Observable ((observer) => {
          this.soket.on('bet_place', (message) => {
            console.log(message, "bet_place");
              observer.next(message);
          });
  });
}

public match_details = () => {
  return new Observable ((observer) => {
          this.soket.on('match_details', (message) => {
            // console.log(message, "match_details");
              observer.next(message);
          });
  });
}
public socketDisconnect = () => {
  return new Observable ((observer) => {
          this.soket.on('disconnection', (message) => {
              observer.next(message);
          });
  });
}
}
