import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
declare var $;
import { Location } from '@angular/common'
import { resolve } from 'q';
@Component({
  selector: 'app-indianfancy',
  templateUrl: './indianfancy.component.html',
  styleUrls: ['./indianfancy.component.css']
})
export class IndianfancyComponent implements OnInit {

  fancyList: any = [];
  sportId: any;
  sereiesId: any;
  mgs = [];
  matchId: any;
  amountFormControl = new FormControl('');
  marketData:any;


  constructor(private service: MatchService, private toaster: ToastrService, private ac: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.ac.params.subscribe((param) => {
      this.sereiesId = param.seriesId,
        this.sportId = param.sportId,
        this.matchId = param.matchId
    })
    this.getFancyList();
  }

  getFancyList() {
    let payload = {
      sport_id: this.sportId,
      series_id: this.sereiesId,
      match_id: this.matchId
    }
    this.service.getfancyList(payload).subscribe((res) => {
      if (res.status) {
        this.fancyList = res.data;
      } else {
        this.toaster.error(res?.message)
      }
    },
    (err)=>{
      if (this.location?.path().split('/')[2] === 'indianfancy') {
        setTimeout(() => resolve(this.getFancyList()), 120000);
      }
    },
    () =>{
      if (this.location?.path().split('/')[2] === 'indianfancy') {
        setTimeout(() => resolve(this.getFancyList()), 120000);
      }
    })

  }


  Savefancy(fancy) {
    let payload = {
      series_id: fancy.series_id,
      sport_id: fancy.sport_id,
      name: fancy.runner_name,
      match_id: fancy.match_id,
      selection_id: fancy.selection_id,
      session_size_no: Number(fancy.lay_size1),
      session_size_yes: Number(fancy.back_size1)
    }
    this.service.createFancy(payload).subscribe((res) => {
      if (res.status) {
        this.toaster.success(res?.message)
        this.getFancyList()
      } else {
        this.toaster.error(res?.message);
      }
    })
  }
  updateFancyStatus(id,status){
    let payload = {
     fancy_id:id,
     status : status
    }
    this.service.updateFancyStatus(payload).subscribe(res=>{
      if(res?.status){
        this.toaster.success(res?.message);
        this.getFancyList();
      }else{
        this.toaster.error(res?.message)
      }
    })
  }
  
  updateFancymessage(fancyId,i){
    let mgs = (<HTMLInputElement>document.getElementById(i)).value; 
    let payload = {
      fancy_id:fancyId,
       message:mgs
    }
    this.service.updateFancyMessage(payload).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message);
        this.getFancyList();
      }else{

        this.toaster.error(res?.message);
      }
    })
  }
  fancyAbandon(fancy) {

    let payload = {
      market_name: fancy?.market_name,
      match_id: fancy?.match_id,
      match_name: fancy?.match_name,
      series_id: fancy?.series_id,
      series_name: fancy?.series_name,
      sport_id: fancy?.sport_id,
      sport_name: fancy?.sport_name,
      fancy_id: fancy?.fancy_id,
      is_rollback: 0,
      fancy_name: fancy?.runner_name


    }
    if (confirm("Are you sure you want to Abandoned Fancy ?")) {

      this.service.fancyAbandon(payload).subscribe((res) => {
        if (res?.status) {
          this.getFancyList();
          this.toaster.success(res?.message);
        } else {
          this.toaster.error(res?.message);
        }
      })
    }
  }


  
  resultDeclare(fancy,i) {
    let value = (<HTMLInputElement>document.getElementById('result'+i)).value; 
    let obj = {
      sport_id: fancy.sport_id,
      series_id: fancy.series_id, 
      match_id: fancy.match_id,
      sport_name: fancy.sport_name,
      series_name: fancy.series_name,
      match_name: fancy.match_name,
      fancy_id: fancy?.fancy_id,
      result: value,
      fancy_name: fancy?.runner_name

    }
    this.service.declareFancy(obj).subscribe((res) => {
      if (res?.status) {

        $('#declareFancy').modal('hide')

        this.getFancyList();
        this.amountFormControl.reset();
        this.toaster.success(res?.message);


      } else {
        $('#declareFancy').modal('hide')

        this.toaster.error(res?.message)
      }
    }
    )
  }
}
