import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatchService } from 'src/app/core/services/match.service';
import { SocketService } from 'src/app/core/services/socket.service';
declare var $;
@Component({
  selector: 'app-brino-casino',
  templateUrl: './brino-casino.component.html',
  styleUrls: ['./brino-casino.component.scss']
})
export class BrinoCasinoComponent implements OnInit {

  dreamCasinoProductList
  token = localStorage.getItem('tokenUser').replace(/['"]+/g, '')
  lobbyURL
  dreamCasinoGames
  url
  opratorId : any = 4136
  websiteUrl : any
  id  :any
  dreamCasinoflag;
  dreamCasinoflagispopupshow= false;
  casinoSports:any;
 // private token = localStorage.getItem('TokenId').replace(/['"]+/g, '');
  private origin = document.location.origin;
  constructor(public router : Router, public ngxSpinner : NgxSpinnerService, 
    public ac : ActivatedRoute, public sanatizer : DomSanitizer,
     public socketSerive : SocketService , public sanitized : DomSanitizer, 
     public service : MatchService) {
      this.service.getCasinoSport().subscribe((res)=>{
        if(res?.status){
        this.casinoSports = res?.data;
      
        this.dreamCasinoflagispopupshow = this.casinoSports.some((ele) => {
          if(ele.sport_id.toLowerCase() == 'brinocasino'){
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
    debugger
    console.log(this.token)
    this.url = this.sanatizer.bypassSecurityTrustResourceUrl('https://diamond99.xyz/?auth=' + this.token + '&origin=' + this.origin);
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

 
  






}

