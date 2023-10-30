import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatchService } from 'src/app/core/services/match.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { environment as env } from 'src/environments/environment.prod';
declare var $;

@Component({
  selector: 'app-live-casino',
  templateUrl: './live-casino.component.html',
  styleUrls: ['./live-casino.component.scss']
})
export class LiveCasinoComponent implements OnInit  {
  dreamCasinoProductList
  token = localStorage.getItem('token')
  lobbyURL
  dreamCasinoGames
  url
  opratorId : any = 4136
  websiteUrl : any
  id  :any
  dreamCasinoflag;
  dreamCasinoflagispopupshow= false;
  casinoSports:any;
  
  constructor(public router : Router, public ngxSpinner : NgxSpinnerService, 
    public ac : ActivatedRoute, public sanatizer : DomSanitizer,
     public socketSerive : SocketService , public sanitized : DomSanitizer, 
     public service : MatchService) {
      this.service.getCasinoSport().subscribe((res)=>{
        if(res?.status){
        this.casinoSports = res?.data;
      
        this.dreamCasinoflagispopupshow = this.casinoSports.some((ele) => {
          if(ele.sport_id.toLowerCase() == 'worldcasino'){
            return ele.show_chip_value_popup ==1 ? true : false
          } 
        });
        console.log(this.dreamCasinoflagispopupshow)
    if(this.dreamCasinoflagispopupshow){
      $('#casinoGameModal').modal('show')
    }else{
      $('#casinoGameModal').modal('hide')
    }
        
    
        // istOfObjecs.some(item => JSON.stringify(item) === JSON.stringify(search1));
        }
      })

  }

  ngOnInit(): void {
    this.ac.paramMap.subscribe((param) => {
          this.id = param.get('id');
          if(this.id== 'dreamcasino'){
            this.dreamCasinoflag = true
          } else {
            this.dreamCasinoflag = false
          }
    })
    this.ac.params.subscribe((val) => {
      // this.ngxSpinner.show()
      this.url = null
      this.lobbyURL = null
      this.getSupernowaData()
    });
   

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
      self.url = this.sanatizer.bypassSecurityTrustResourceUrl(this.lobbyURL);
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
  )
 } else if (this.id == 'tvbet'){
  this.service.getTvBetLoginToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
      const self = this;
       this.lobbyURL = response.data;
      this.url = this.sanatizer.bypassSecurityTrustResourceUrl(`${response.data.base_url}?tokenAuth=${response.data.token}&clientId=${response.data.client_id}`);
    }, (error) => {
      console.error(error)
    }
  )
 } else if (this.id == 'fawk'){
        //  this.url = this.sanatizer.bypassSecurityTrustResourceUrl(`https://d2.fawk.app/#/splash-screen/${this.token}/4387` );
  
        let payload = {
          operatorId:"9328",
          token : localStorage.getItem('token')
        }
      
        this.service.getFawkoginToken(payload).subscribe(
          (response) => {
            this.ngxSpinner.hide()
            const self = this;
             this.lobbyURL = response.playerTokenAtLaunch;
            self.url = this.sanatizer.bypassSecurityTrustResourceUrl(`${response.data.base_url_destop}#/splash-screen/${this.token}/${response.data.client_id}` );
          }, (error) => {
            console.error(error)
          }
        )
 }
 else if (this.id == 'ezugi'){
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


 else if(this.id == 'superspade'){


  this.service.getSuperSpadeToken().subscribe(
    (response) => {
      this.ngxSpinner.hide()
       this.url =  this.sanatizer.bypassSecurityTrustResourceUrl(response.data.base_url + '/signin/viewer/walletGameLogin.jsp?token=' + response.data.response.response.token + '&lang=en&lobby=true');

    }, (error) => {
      console.error(error)
    }
  )
  // this.service.getSuperSpadeToken().subscribe(
  //   (response) => {
  //     this.ngxSpinner.hide()
  //      this.url =  this.sanatizer.bypassSecurityTrustResourceUrl(env.SSPBASE_PATH + 'signin/viewer/walletGameLogin.jsp?token=' + response.data.response.token + '&lang=en&lobby=true');

     
  //   }, (error) => {
  //     console.error(error)
  //   }
  // )
 }
  else if (this.id == 'dreamcasino'){
   this.getProductList()
  }
 
}




getdreamcasinoGamesUrl(gameId, gameCode){
  let payload = {
    platform: "GPL_DESKTOP",
    // lobby_url: window.location.origin,
    lobby_url : 'https://diamond808.xyz/',
    game_id : gameId,
    game_code: gameCode
  }
  this.service.dreamCasinogetUrl(payload).subscribe(
    (response) => {
      this.dreamCasinoflag = false;
      // this.ngxSpinner.hide()
      // let data  = response.data.response.url;
      // sessionStorage.setItem("gameurl",data)
      // window.open(`main/game/casino/Dreamcasino`,'_blank').focus();
      // createUrlTree
      // this.router.createUrlTree([`/main/game/casino/Dreamcasino/:${response.data.response.url}`])
      this.url = this.sanatizer  .bypassSecurityTrustResourceUrl(response.data.response.url);

    }, (error) => {
      console.error(error)
    }
  )
}




getProductList() {
  let payload = {
  }
  this.service.getProductList(payload).subscribe((res) => {
    if (res?.status) {
      this.dreamCasinoProductList = res?.data;
      console.log(this.dreamCasinoProductList, "dream");
      

    }
  })
}

navigateTocategory(product){
  this.router.navigateByUrl(`/main/games/gamesdream/${product}`)
}
}
