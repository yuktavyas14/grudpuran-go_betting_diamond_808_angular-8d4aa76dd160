import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
@Component({
  selector: 'app-other-casion-slot',
  templateUrl: './other-casion-slot.component.html',
  styleUrls: ['./other-casion-slot.component.scss']
})
export class OtherCasionSlotComponent implements OnInit {
  public casinoSports : any
  public flagCasino : any = 'matka'

  constructor(public _router: Router, private service : MatchService) { }

  ngOnInit(): void {
    this.getCasinoSports()
    this.getProductList()
  }
  gotoMatchDetails(matchId:any){
    this._router.navigate(['/main/matchdetails',matchId])
  }
  gotoCasinoMatchDetails(matchId:any){
    this._router.navigate(['/main/matchdetail',matchId])
  }


  getCasinoSports(){
    this.service.getCasinoSport().subscribe((res)=>{
      if(res?.status){
      this.casinoSports = res?.data;
      // console.log(this.casinoSports , "casinoSports")
      }
    })
  }

  navigateToGame(gameName: any, popup: any){
    if(gameName)
    this._router.navigateByUrl(`/main/game/${gameName}`, { state: { id:popup , name:'Angular' } })
  }

  dreamCasinoProductList : any
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

  navigateTocategory(product : any){
    this._router.navigateByUrl(`/main/games/gamesdream/${product}`)
  }
}
