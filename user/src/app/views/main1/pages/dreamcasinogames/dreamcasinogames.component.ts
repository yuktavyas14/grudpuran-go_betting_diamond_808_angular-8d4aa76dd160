import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { MatchService } from "src/app/core/services/match.service";
import { SocketService } from "src/app/core/services/socket.service";

@Component({
  selector: "app-dreamcasinogames",
  templateUrl: "./dreamcasinogames.component.html",
  styleUrls: ["./dreamcasinogames.component.scss"],
})
export class DreamcasinogamesComponent implements OnInit {
  dreamProductCategoryList;
  product;
  url;
  category;
  dreamCasinoflag;
  origin;
  constructor(
    public sanatizer: DomSanitizer,
    public socketSerive: SocketService,
    public ac: ActivatedRoute,
    public service: MatchService
  ) {
    this.origin = document.location.origin;
    console.log(origin, "origin");
  }

  ngOnInit(): void {
    this.test();
    this.ac.paramMap.subscribe((param) => {
      // this.product = param.get('category')
      // alert(category)
    });

    this.ac.params.subscribe((val) => {
      this.url = null;
      this.category = val["product"];
      this.product = val["category"];
      this.getGameList();
      // this.getCategoryList(this.product)
    });
  }

  test() {}
  ngOnDestroy() {}

  getCategoryList(product) {
    this.dreamProductCategoryList = [];
    // this.productName = product
    let payload = {
      product: product,
      // is_active: '1',
      // search: ''
    };
    this.service.getCategoryList(payload).subscribe((res) => {
      if (res?.status) {
        this.dreamProductCategoryList = res?.data;
        // if(this.dreamProductCategoryList.length > 0 && this.category != null && this.category && this.product != null && this.product)
        // this.getGameList(this.category , this.product)
        //  else if(this.dreamProductCategoryList.length > 0 && this.product != null && !this.category    ){
        // //  console.log(this.category , "categroy");

        //   this.getGameList(this.dreamProductCategoryList[0]?.category,this.product)
        // }
      }
    });
  }

  dreamCasinoProductList;
  getGameList() {
    let payload = {
      provider_code: this.product,
    };
    this.service.getGameList(payload).subscribe((res) => {
      if (res?.status) {
        this.dreamCasinoProductList = res?.data.games;
      }
    });
  }

  activeClass;
  addActiveClass(i) {
    this.activeClass = i;
  }

  getdreamcasinoGamesUrl(code, gameCode) {
    let payload = {
      game_code: code,
      provider_code: gameCode,
      back_url: `${this.origin}/main/dashboard`,
    };
    this.service.userAuthentication(payload).subscribe(
      (response) => {
        this.dreamCasinoflag = false;
        let respponseData = response.data;
        // this.ngxSpinner.hide()
        // let data  = response.data.response.url;
        // sessionStorage.setItem("gameurl",data)
        // window.open(`main/game/casino/Dreamcasino`,'_blank').focus();
        // createUrlTree
        // this.router.createUrlTree([`/main/game/casino/Dreamcasino/:${response.data.response.url}`])
        this.url = this.sanatizer.bypassSecurityTrustResourceUrl(
          response.data.launchURL
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getdreamcasinoGamesUrl11(gameId, gameCode) {
    let payload = {
      platform: "GPL_DESKTOP",
      // lobby_url: window.location.origin,
      lobby_url: "https://even777.com/",
      game_id: gameId,
      game_code: gameCode,
    };
    this.service.dreamCasinogetUrl(payload).subscribe(
      (response) => {
        this.dreamCasinoflag = false;
        // this.ngxSpinner.hide()
        // let data  = response.data.response.url;
        // sessionStorage.setItem("gameurl",data)
        // window.open(`main/game/casino/Dreamcasino`,'_blank').focus();
        // createUrlTree
        // this.router.createUrlTree([`/main/game/casino/Dreamcasino/:${response.data.response.url}`])
        this.url = this.sanatizer.bypassSecurityTrustResourceUrl(
          response.data.response.url
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
