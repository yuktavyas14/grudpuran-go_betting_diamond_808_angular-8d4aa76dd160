import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-live-casino',
  templateUrl: './live-casino.component.html',
  styleUrls: ['./live-casino.component.scss']
})
export class LiveCasinoComponent implements OnInit {
  isShowComingShow: boolean = false;
  isShowComingShowGods: boolean = false;
  casinoSportList:any;
  dreamCasinoProductList : any
isRRR= false;
  constructor(public _router: Router,private service:MatchService,private toaster:ToastrService ) {
    this.getProductList();
  }

  ngOnInit(): void {
    this.getCasinoSportList();
  }
  gotoMatchDetails(matchId:any){
    this._router.navigate(['/main/matchdetails',matchId])
  }
  gotoCasinoMatchDetails(matchId:any){
    this._router.navigate(['/main/matchdetail',matchId])
  }
  gotoCasinoWarDetails(matchId:any){
    this._router.navigate(['/main/matchdetail',matchId])
  }
  getCasinoSportList(){
    this.service.getCasinoSportList().subscribe((res)=>{
      if(res?.status){
        this.casinoSportList = res?.data;
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  gotoCasinoByMatchId(id:any){
    if(id =='-1' || id =='-2' || id =='-3' || id =='-4' || id =='-5' || id =='-7' || id =='-145' || id =='-1010' || id =='-1011'
    || id =='-1012' || id =='-1013' || id =='-1014' || id =='-1015'|| id =='-1016'   || id =='-1018' || id =='-1020'){
      this._router.navigate(['/main/matchdetails',id])

    }else{
      this._router.navigate(['/main/matchdetail',id])

    }
  }
  getProductList() {
    let payload = {
    }
    this.service.getProvidersList().subscribe((res) => {
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
