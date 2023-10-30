import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
declare var $: any;

@Component({
  selector: 'app-live-casion-slot',
  templateUrl: './live-casion-slot.component.html',
  styleUrls: ['./live-casion-slot.component.scss'],
})
export class LiveCasionSlotComponent implements OnInit {
  public casinoSports: any;
  public flagCasino: any = 'Live Casino';
  isActiveLiveCasino = true;
  dreamCasinoflagispopupshow = false;
  casinoSportsList:any;
  token = localStorage.getItem('token');
  url:any;
  url1:any;
  dreamCasinoflag:any;
id:any;
  private origin = document.location.origin;
  
  constructor(public _router: Router, private service: MatchService, public sanatizer : DomSanitizer,public ac : ActivatedRoute) {}

  ngOnInit(): void {
    this.getCasinoSports();
    this.getProductList();
    this.url = this.sanatizer.bypassSecurityTrustResourceUrl('https://diamond99.xyz/m/?auth=' + this.token + '&origin=' + this.origin);
    this.url1 = this.sanatizer.bypassSecurityTrustResourceUrl('https://phasergm1.diamond99.xyz/?auth=' + this.token + '&origin=' + this.origin);
    console.log(this.url,"urllllllllll")
    this.ac.paramMap.subscribe((param) => {
          this.id = param.get('id');
          console.log(this.id,"id")
          if(this.id== 'brinocasino'){
            this.dreamCasinoflag = true
          } else {
            this.dreamCasinoflag = false
          }
    })
  }
  gotoMatchDetails(matchId: any) {
    this._router.navigate(['/main/matchdetails', matchId]);
  }
  gotoCasinoMatchDetails(matchId: any) {
    this._router.navigate(['/main/matchdetail', matchId]);
  }

  openmodal() {
    this.dreamCasinoflagispopupshow = this.casinoSports.some((ele: any) => {
      if (ele.sport_id.toLowerCase() == 'worldcasino') {
        return ele.show_chip_value_popup == 1 ? true : false;
      }
      return;
    });
    console.log(this.dreamCasinoflagispopupshow);
    if (this.dreamCasinoflagispopupshow) {
      $('#casinoGameModal').modal('show');
    } else {
      $('#casinoGameModal').modal('hide');
    }
  }
  openmodal1() {
    this.dreamCasinoflagispopupshow = this.casinoSports.some((ele: any) => {
      if (ele.sport_id.toLowerCase() == 'brinocasino') {
        return ele.show_chip_value_popup == 1 ? true : false;
      }
      return;
    });
    console.log(this.dreamCasinoflagispopupshow);
    if (this.dreamCasinoflagispopupshow) {
      $('#casinoGameModal').modal('show');
    } else {
      $('#casinoGameModal').modal('hide');
    }
  }
  getCasinoSports() {
    this.service.getCasinoSport().subscribe((res) => {
      if (res?.status) {
        this.casinoSports = res?.data;
        let casinoSport: any = this.casinoSports.filter(
          (item: any) => item.sport_id == 'worldcasino' || item.sport_id=='brinocasino'
        );
        this.casinoSportsList=casinoSport
        if (casinoSport.length > 0) {
          this.isActiveLiveCasino =
            casinoSport[0].is_active == 1 ? true : false;
        } else {
          this.isActiveLiveCasino = false;
        }
        // console.log(this.casinoSports , "casinoSports")
      }
    });
  }

  navigateToGame(gameName: any, popup: any) {
    if (gameName)
      this._router.navigateByUrl(`/main/game/${gameName}`, {
        state: { id: popup, name: 'Angular' },
      });
  }

  dreamCasinoProductList: any;
  getProductList() {
    let payload = {};
    this.service.getProvidersList().subscribe((res) => {
      if (res?.status) {
        this.dreamCasinoProductList = res?.data;
        console.log(this.dreamCasinoProductList, 'dream');
      }
    });
  }

  navigateTocategory(product: any) {
    this._router.navigateByUrl(`/main/games/gamesdream/${product}`);
  }
}
