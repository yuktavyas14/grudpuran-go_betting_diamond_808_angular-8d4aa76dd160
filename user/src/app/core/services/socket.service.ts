import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { AppComponent } from 'src/app/app.component';
import { environment as env } from './../../../environments/environment';

const BASE_URL = env.socket.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  //soket:any= AppComponent.soket;
  soket:any = io(BASE_URL, { transports: ['websocket'] })
  private socket;
  constructor() {
  console.log(BASE_URL,"BSSSSSSSSSS")

    this.soket.on('disconnection',  function (){
      console.log('disconnection');
    });
  //   this.soket = io(BASE_URL, { transports: ['websocket'] })
     this.soket.on('connect', function () {
     console.log("connect")
     });
   }

   public getMessages = () => {
  
  return new Observable ((observer) => {
          this.soket.on('bet_place', (message) => {
              observer.next(message);
          });
  });
}


public getSports = () => {
  
  return new Observable ((observer) => {
          this.soket.on('sports', (message) => {
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

public getMenucup = () => {
  return new Observable ((observer) => {
          this.soket.on('get_cup', (message) => {
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
