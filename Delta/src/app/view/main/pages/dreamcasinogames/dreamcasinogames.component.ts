import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-dreamcasinogames',
  templateUrl: './dreamcasinogames.component.html',
  styleUrls: ['./dreamcasinogames.component.scss']
})
export class DreamcasinogamesComponent implements OnInit {


  dreamProductCategoryList : any
  product : any
  url : any
  category :any
  dreamCasinoflag : any
  origin : any
  constructor (public sanatizer : DomSanitizer, public socketSerive : SocketService, public ac : ActivatedRoute, public service : MatchService) {
    this.origin = document.location.origin; 
  }

  ngOnInit(): void {

    this.test()
    this.ac.paramMap.subscribe((param) => {
      // this.product = param.get('category')
      // alert(category)

    })


    this.ac.params.subscribe(val => {
      this.url = null
      this.category = val['product'] ;
      this.product = val['category'] ;

      this.getGameList()
    });
  }

  test(){

  }
  ngOnDestroy(){

  }

  getCategoryList(product : any) {
    this.dreamProductCategoryList = []
    // this.productName = product
    let payload = {
      product:product ,
      // is_active: '1',
      // search: ''

    }
    this.service.getCategoryList(payload).subscribe((res) => {
      if (res?.status) {

        this.dreamProductCategoryList = res?.data;
      //   if(this.dreamProductCategoryList.length > 0 && this.category != null && this.category && this.product != null && this.product)
      //   this.getGameList(this.category , this.product)
      //  else if(this.dreamProductCategoryList.length > 0 && this.product != null && !this.category    ){
      // //  console.log(this.category , "categroy");

      //   this.getGameList(this.dreamProductCategoryList[0]?.category,this.product)
      //   }
      }
    })
  }


  dreamCasinoProductList : any
  getGameList() {
    let payload = {
      provider_code : this.product,
    }
    this.service.worldCasinoGetGameList(payload).subscribe((res) => {
      if (res?.status) {
        this.dreamCasinoProductList = res?.data?.games;

      }
    })
  }

  activeClass : any
  addActiveClass(i : any){
    this.activeClass = i;
  }



  getdreamcasinoGamesUrl(code : any, providerCode : any){
    let payload = {
      back_url : `${this.origin}/main/inPlay`,
      game_code  : code,
      provider_code : providerCode
    }
    this.service.userAuthentication(payload).subscribe(
      (response:any) => {
        this.dreamCasinoflag = false;
        // this.ngxSpinner.hide()
        // let data  = response.data.response.url;
        // sessionStorage.setItem("gameurl",data)
        // window.open(`main/game/casino/Dreamcasino`,'_blank').focus();
        // createUrlTree
        // this.router.createUrlTree([`/main/game/casino/Dreamcasino/:${response.data.response.url}`])
        this.url = this.sanatizer  .bypassSecurityTrustResourceUrl(response.data.launchURL);

      }, (error:any) => {
        console.error(error)
      }
    )
  }
}
