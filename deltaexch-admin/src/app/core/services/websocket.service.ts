import { Injectable } from '@angular/core';
// import  io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  private ws_url = environment.socket.baseUrl;

  constructor() {}

  connect(): Subject<MessageEvent> {
    // this.socket = io(this.ws_url, {transports: ['websocket']});
    let observable = new Observable(observer => {
      this.socket.on('bet_place', data => {
        console.log('Received a message from WebSocket: ', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };
    return Subject.create(observer, observable);
  }
} 