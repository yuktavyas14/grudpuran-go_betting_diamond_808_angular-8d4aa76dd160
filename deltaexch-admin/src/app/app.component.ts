import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';
import { MatchService } from './core/services/match.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gloabalData;
  favurl:any
  latitude!: number;
  longitude!: number;
  favIcon: HTMLLinkElement |any = document.querySelector('#faviconIcon');
  getCurrentLocation:any;
   cacheBust = Date.now(); 
  isLoggedIn$: Observable<boolean>;
  constructor(private authservice: AuthService, public router: Router , public service : MatchService,
    private ngZone: NgZone) {
      this.getGlobalSetting();
    // Sets the current logged in status (user is currently logged-in or not).
    this.isLoggedIn$ = authservice.isLoggedIn;
    localStorage.setItem('getCurrentLocation',JSON.stringify(this.getCurrentLocation))


  }

  @HostListener('contextmenu', ['$event'])
   onRightClick(event) {
  event.preventDefault();
}
  onMapClicked(event: any){
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
  getGlobalSetting(){
    this.service.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
        this.gloabalData = res?.data

        //  this.url = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.logo ;
        this.favIcon.href  = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.favicon ;
        console.log(this.favIcon.href)
        this.favurl = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.favicon ;
      }
      else{
        // this.toaster.error(res?.message)
      }
    })
  }
  ngOnInit(){
    if(!navigator.geolocation){
      console.log('location not sopported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log('as',position.coords.latitude)
      console.log('as',position.coords.longitude)
      this.getCurrentLocation= {lat:position.coords.latitude, lon:position.coords.longitude};

      localStorage.setItem('getCurrentLocation',JSON.stringify(this.getCurrentLocation))

    })
    this.watchPosition();

  }
  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        this.getCurrentLocation= {lat:position.coords.latitude, lon:position.coords.longitude};
        localStorage.setItem('getCurrentLocation',JSON.stringify(this.getCurrentLocation))

        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
