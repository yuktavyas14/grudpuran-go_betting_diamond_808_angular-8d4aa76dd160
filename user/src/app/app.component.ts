import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // static soket:any;
    // BASE_URL = env.socket.baseUrl;
    // soket= io(this.BASE_URL, { transports: ['websocket'] })
   
  ngOnInit():void{
     
    // this.soket.on('connect', function () {
    //   console.log("connect")
    // });
  }
}
