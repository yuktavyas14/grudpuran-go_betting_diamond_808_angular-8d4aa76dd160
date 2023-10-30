// import { Injectable  ,EventEmitter} from '@angular/core';
// import { Socket } from 'ngx-socket-io';
// import { map } from 'rxjs/operators';
// import {Observable, Subject} from 'rxjs';
// import  io from 'socket.io-client';
// import * as Rx from 'rxjs';
// import { environment } from './../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketServiceService {



//   // Our socket connection
//   private socket;

//   constructor() { 
//     this.connect()
//   }

//   connect(): Subject<MessageEvent> {
//     // If you aren't familiar with environment variables then
//     // you can hard code `environment.ws_url` as `http://localhost:5000`
//     



//      this.socket.on('connect', function () {

//           console.log('socket connected');
      
//           //send something
//           this.socket.emit('send2', { name: "my name", message: "hello" }, function (result) {
      
//               console.log('sended successfully');
//               console.log(result);
//           });
//       });

//     // We define our observable which will observe any incoming messages
//     // from our socket.io server.
//     let observable = new Observable(observer => {
//         this.socket.on('bet_place', (data) => {
//           console.log("Received message from Websocket Server")
//           observer.next(data);
//         })
//         return () => {
//           // this.socket.disconnect();
//         }
//     });

//     // We define our Observer which will listen to messages
//     // from our other components and send messages back to our
//     // socket server whenever the `next()` method is called.
//     let observer = {
//         next: (data: Object) => {
//             this.socket.emit('message', JSON.stringify(data));
//         },
//     };

//     // we return our Rx.Subject which is a combination
//     // of both an observer and observable.
//     return Subject.create(observer, observable);
//   }
// }



























//   //   private socketgo: WebSocket;
// //   private listener: EventEmitter<any> = new EventEmitter();

// //   constructor(private socket: Socket) { 
// //   

// //     // this.conection()
// //     this.socketgo.onopen = event => {
// //       this.listener.emit({"type": "open", "data": event});
// //   }
// //   this.socketgo.onclose = event => {
// //       this.listener.emit({"type": "close", "data": event});
// //   }
// //   this.socketgo.onmessage = event => {
// //       this.listener.emit({"type": "bet_place", "data": JSON.parse(event.data)});
// //   }
// //   }


// //   // socket function
// // sendMessage(msg: string) {
// //   console.log("socket call")
// //   this.socket.emit('message', msg);
// // }

// // public getMessages = () => {
// //   return new Observable ((observer) => {
// //           this.socket.on('bet_place', (message) => {
// //               observer.next(message);
// //           });
// //   });
// // }

// // conection(){
// //   this.socket.on('connect', function () {

// //     console.log('socket connected');

// //     //send something
// //     this.socket.emit('send2', { name: "my name", message: "hello" }, function (result) {

// //         console.log('sended successfully');
// //         console.log(result);
// //     });
// // });
// // }
// // public getEventListener() {
// //   return this.listener;
// // }
// // }





// import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

// // import { map } from 'rxjs/operators';
// import  socketio from 'socket.io-client';
// import {environment} from '../../../environments/environment';
// // import {Observable} from 'rxjs/Observable';
// import {BehaviorSubject, Subject} from 'rxjs'
// import {Observable} from 'rxjs';
// import { EMPTY } from 'rxjs';

// import { catchError, tap, switchAll } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketServiceService {
//   private socket$: WebSocketSubject<any>;

//   private socket: any;
//   connected$ = new BehaviorSubject<boolean>(false);
//   messages: Subject<any>;

//   constructor() {
//   //   this.socket = socketio(environment.socket.baseUrl, {transports: ['websocket']});
//   //   this.socket.on('connect', () => this.connected$.next(true));
//   //   this.socket.on('disconnect', () => this.connected$.next(false));


//   //  this.socket.on('bet_place', function (message) {

//   //     console.log('new message');
//   //     console.log(message);
//   // });

//   // this.messages = <Subject<any>>
//   //     .connect()
//   //     .map((response: any): any => {
//   //       return response;
//   //     })
// // this.connect()
//   }

//   private messagesSubject$ = new Subject();
//   public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
  
//   public connect(): void {
  
//     if (!this.socket$ || this.socket$.closed) {
//       this.socket$ = this.getNewWebSocket();
//       const messages = this.socket$.pipe(
//         tap({
//           error: error => console.log(error),
//         }), catchError(_ => EMPTY));
//       this.messagesSubject$.next(messages);
//     }
//   }
  
//   private getNewWebSocket() {
//     return webSocket(environment.socket.baseUrl);
//   }
//   sendMessage(msg: any) {
//     this.socket$.next(msg);
//   }
//   close() {
//     this.socket$.complete(); }
  


  // connect(): Subject<MessageEvent> {
  //   // If you aren't familiar with environment variables then
  //   // you can hard code `environment.ws_url` as `http://localhost:5000`
  //   this.socket = socketio(environment.socket.baseUrl, {transports: ['websocket']});

  //   // We define our observable which will observe any incoming messages
  //   // from our socket.io server.
  //   let observable = new Observable(observer => {
  //       this.socket.on('bet_place', (data) => {
  //         console.log("Received message from Websocket Server")
  //         observer.next(data);
  //       })
  //       return () => {
  //         this.socket.disconnect();
  //       }
  //   });

  //   // We define our Observer which will listen to messages
  //   // from our other components and send messages back to our
  //   // socket server whenever the `next()` method is called.
  //   let observer = {
  //       next: (data: Object) => {
  //           this.socket.emit('message', JSON.stringify(data));
  //       },
  //   };

  //   // we return our Rx.Subject which is a combination
  //   // of both an observer and observable.
  //   return Subject.create(observer, observable);
  // }


  // join(room: string) {
  //   // auto rejoin after reconnect mechanism
  //   this.connected$.subscribe(connected => {
  //     if (connected) {
  //       this.socket.on('bet_place', () => {

  //       });
  //     }
  //   });
  // }

  // disconnect() {
  //   this.socket.disconnect();
  //   this.connected$.next(false);
  // }

  // emit(event: string, data?: any) {

  //   console.group();
  //     console.log('----- SOCKET OUTGOING -----');
  //     console.log('Action: ', event);
  //     console.log('Payload: ', data);
  //   console.groupEnd();

  //   this.socket.emit(event, data);
  // }

  // listen(event: string): Observable<any> {
  //   return new Observable( observer => {

  //     this.socket.on(event, data => {

  //       console.group();
  //         console.log('----- SOCKET INBOUND -----');
  //         console.log('Action: ', event);
  //         console.log('Payload: ', data);
  //       console.groupEnd();

  //       observer.next(data);
  //     });
  //     // dispose of the event listener when unsubscribed
  //     // return () => this.socket.off(event);
  //   });
  // }

// }
//   constructor(private socket: Socket) { 
//   }


//   // socket function
// sendMessage(msg: string) {
//   console.log("socket call")
//   this.socket.emit('message', msg);
// }

// public getMessages = () => {
//   return new Observable ((observer) => {
//           this.socket.on('bet_place', (message) => {
//               observer.next(message);
//           });
//   });
// }



// }

