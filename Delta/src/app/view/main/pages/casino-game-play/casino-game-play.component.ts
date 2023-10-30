import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatchService } from 'src/app/core/services/match.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { environment as env } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-casino-game-play',
  templateUrl: './casino-game-play.component.html',
  styleUrls: ['./casino-game-play.component.scss']
})
export class CasinoGamePlayComponent implements OnInit  , OnDestroy{
  token = localStorage.getItem('token')
  lobbyURL : any
  url : any
  opratorId : any = 4136
  websiteUrl : any
  id  :any
  constructor(public ngxSpinner : NgxSpinnerService, public ac : ActivatedRoute, public sanatizer : DomSanitizer, public socketSerive : SocketService , public sanitized : DomSanitizer, public service : MatchService) {

  }

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
          this.id = param.get('id')?.toLocaleLowerCase();

    })
    this.ac.params.subscribe((val) => {
      this.ngxSpinner.show()

      this.url = null
      this.lobbyURL = null
      this.getSupernowaData()


    });
  }


  ngOnDestroy(){

  }



getSupernowaData() {
  if(history.state && history.state.id == 1)
  $('#casinoGameModal').modal('show');
if(this.id == 'supernowa'){
  this.service.getSupernowaLoginToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.Data.lobbyURL;
       console.log(response , "test");
       (this.lobbyURL)
      self.url = this.sanatizer.bypassSecurityTrustResourceUrl(this.lobbyURL);
    }, (error) => {
      console.error(error)
    }
  )
 } else if (this.id == 'tvbet'){
  this.service.getTvBetLoginToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.data;
       this.url = this.sanatizer.bypassSecurityTrustResourceUrl(`${response.data.base_url}?tokenAuth=${response.data.token}&clientId=${response.data.client_id}`);

      // this.url = this.sanatizer.bypassSecurityTrustResourceUrl('https://tvbetframe13.com?tokenAuth=' + this.lobbyURL + '&clientId=' + '4136');

      // self.url = this.sanatizer.bypassSecurityTrustResourceUrl(this.lobbyURL);
    }, (error) => {
      console.error(error)
    }
  )
 }  else if (this.id == 'fawk'){
  //  alert()
  let payload = {
    operatorId:"9328",
    token : localStorage.getItem('token')
  }

  this.service.getFawkoginToken(payload).subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.playerTokenAtLaunch;
      self.url = this.sanatizer.bypassSecurityTrustResourceUrl(`https://m2.fawk.app/#/splash-screen/${this.lobbyURL}/9328` );
    }, (error) => {
      console.error(error)
    }
  )
 }
 else if(this.id == 'matka'){
  this.service.getMatkaLoginToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.data.base_url;
       console.log(self.lobbyURL)
      self.url = this.sanatizer.bypassSecurityTrustResourceUrl(this.lobbyURL);
    }, (error) => {
      console.error(error)
    }
  )}
 else if (this.id == 'ezugi'){
  //  alert()
  let payload = {
    operatorId:"9328",
    token : localStorage.getItem('token')
  }

  this.service.getEzugiToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.data.url;
      self.url = this.sanatizer.bypassSecurityTrustResourceUrl(this.lobbyURL );
    }, (error) => {
      console.error(error)
    }
  )
 }
 else if(this.id == 'super spade'){
  this.service.getSuperSpadeToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      this.url =  this.sanatizer.bypassSecurityTrustResourceUrl(response.data.base_url + '/signin/viewer/walletGameLogin.jsp?token=' + response.data.response.response.token + '&lang=en&lobby=true');

      //  this.url =  this.sanatizer.bypassSecurityTrustResourceUrl(env.SSPBASE_PATH + 'signin/viewer/walletGameLogin.jsp?token=' + response.data.response.token + '&lang=en&lobby=true');


    }, (error) => {
      console.error(error)
    }
  )
 }

}



}
