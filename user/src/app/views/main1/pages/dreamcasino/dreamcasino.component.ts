import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-dreamcasino',
  templateUrl: './dreamcasino.component.html',
  styleUrls: ['./dreamcasino.component.scss']
})
export class DreamcasinoComponent implements OnInit {
  public dreamCasinoGames : any

  constructor(private matchService : MatchService) { }

  ngOnInit(): void {
    // this.getDreamCasinoGames()
    this.getProductList()
  }



  // getDreamCasinoGames(){
  //   this.matchService.getGameList().subscribe(
  //     (response) => {
  //       // this.ngxSpinner.hide()
  //       // this.url = this.sanatizer.bypassSecurityTrustResourceUrl(response.data.base_url + '/signin/viewer/walletGameLogin.jsp?token=' + response.data.response.response.token + '&lang=en&lobby=true');
  //       this.dreamCasinoGames = response?.data
  //     }, (error) => {
  //       console.error(error)
  //     }
  //   )
  // }


  getdreamcasinoGamesUrl(gameId, gameCode){
    let payload = {
      platform: "GPL_DESKTOP",
      // lobby_url: window.location.origin,
      lobby_url : 'https://diamond808.xyz/',
      game_id : gameId,
      game_code: gameCode
    }
    this.matchService.dreamCasinogetUrl(payload).subscribe(
      (response) => {
        // this.dreamCasinoflag = false;
        // this.ngxSpinner.hide()
        let data  = response.data.response.url;
        sessionStorage.setItem("gameurl",data)
        window.open(`main/game/casino/Dreamcasino`,'_blank').focus();
        // createUrlTree
        // this.router.createUrlTree([`/main/game/casino/Dreamcasino/:${response.data.response.url}`])
        // this.url = this.sanatizer  .bypassSecurityTrustResourceUrl(response.data.response.url);

      }, (error) => {
        console.error(error)
      }
    )
  }
  dreamCasinoProductList

  getProductList() {
    let payload = {
    }
    this.matchService.getProductList(payload).subscribe((res) => {
      if (res?.status) {
        this.dreamCasinoProductList = res?.data;
        console.log(this.dreamCasinoProductList, "dream");
        
  
      }
    })
  }

  navigateTocategory(product){
    // this.router.navigateByUrl(`/main/games/gamesdream/${product}`)
  }
}
