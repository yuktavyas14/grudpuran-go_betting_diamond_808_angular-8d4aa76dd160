import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-match-setting',
  templateUrl: './match-setting.component.html',
  styleUrls: ['./match-setting.component.css']
})
export class MatchSettingComponent implements OnInit {
  updateCupName : any;
  cupid         :any;
  sportList: any = [];
  sportId: any = 0;
  status: any = "";
  searchKeyword: any;
  MatchList:any=[];
  scoreMatchList:any = [];
  updateSet:FormGroup;
  matchId:any;
  constructor(private service: MatchService, private toaster: ToastrService,private fb :FormBuilder) { }

  ngOnInit(): void {
    this.getSportList();
    this.getScoreMatches();
    this.SearchMatch();
    this.updateSet = this.fb.group({
      score_key: ['',Validators.required],
      score_type:['',Validators.required],
      matchMax:['',Validators.required],
      matchMin:['',Validators.required],
      sessionMax:['',Validators.required],
      sessionMin:['',Validators.required],
      tv_url:['',Validators.required],
      bookmaker_max_stack:['',Validators.required],


    })
  }


  /**
   * for getting list of the sports
   */
  getSportList() {
    let payload = {
      is_active: "1"
    }
    this.service.getSportList(payload).subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
      }
      else {
        this.toaster.error(res?.message)
      }
    })

  }


  onChage(val) {

  }
  onTogalChange(id, val) {
    let payload = {
      match_id:id,
      is_active: val == true? "1":"0"

    }
    this.service.updateMatchStatus(payload).subscribe((res)=>{
      if(res.status){
       this.toaster.success(res?.message)
       this.SearchMatch();
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
  onTogalChange1(id, val) {
    // console.log(id ,val, "test")
    let payload = {
      match_id:id,
      is_cup: val == true? "1":"0"

    }
    this.service.updateMatchCupStatus(payload).subscribe((res)=>{
      if(res.status){
       this.toaster.success(res?.message)
       if(val){
       $('#modal-cup').modal('show');
      this.cupid = id;
      this.updateCupName = ''
      }
       this.SearchMatch();
      }else{
        this.toaster.error(res?.message);
      }
    })
  }

  SearchMatch() {
    this.MatchList = [];
    let payload = {
      sport_id: this.sportId == 0 ?"":this.sportId.toString(),
      is_active: this.status,
      search: this.searchKeyword,
      is_hide_declared_match: "1"

    }

    this.service.getMatchListAdded(payload).subscribe((res)=>{
      if(res?.status){
        this.MatchList = res?.data;
        // console.log(this.MatchList, "matchlist")
      }else{
        this.toaster.error(res?.message)
      }
    })
  }


  getScoreMatches(){
    this.scoreMatchList=[];
    this.service.getScoreMatches().subscribe((res)=>{
      if(res.status){
        this.scoreMatchList = res?.data.data;
      }else{
        // this.toaster.error(res?.message);
      }
    })
  }



  updateCupNamee(){
    let payload = {
      match_id:this.cupid,
      name    : this.updateCupName
      // is_active: val == true? "1":"0"

    }
    this.service.updateCupName(payload).subscribe((res)=>{
      if(res.status){
       this.toaster.success(res?.message)
       this.SearchMatch();
       $('#modal-cup').modal('hide');

      }else{
        this.toaster.error(res?.message);
      }
    })
  }

  scoreKeypop(match){
    // alert()
    // console.log(match , "matchdata")
    // debugger
    this.matchId = match?.match_id;
    this.updateSet.patchValue({
      score_key:match?.score_key,
      score_type:match?.score_type,
      matchMax:match?.max_stack,
      matchMin:match?.min_stack,
      bookmaker_max_stack:match?.bookmaker_max_stack,
      sessionMax:match?.session_max_stack,   
         sessionMin:match?.session_min_stack,
      tv_url:match?.tv_url
    })
    $('#scoreKeyupdate').modal('show');
  }

  updateSetting(){
//     match_id (required, string),
// min_stack (required, number),
// max_stack (required, number),
// score_key (required, string),
// score_type (required, string, "0"/"1"),
// tv_url (required, string),
// session_min_stack (required, number),
// session_max_stack (required, number),
   let obj = {
    match_id:this.matchId,
    score_key:this.updateSet.controls.score_key.value,
    score_type:this.updateSet.controls.score_type.value,
    max_stack:this.updateSet.controls.matchMax.value,
    bookmaker_max_stack:this.updateSet.controls.bookmaker_max_stack.value,
    min_stack:this.updateSet.controls.matchMin.value,
    session_max_stack:this.updateSet.controls.sessionMax.value,
    session_min_stack:this.updateSet.controls.sessionMin.value,
    tv_url:this.updateSet.controls.tv_url.value,
   }
     this.service.updateMatchSettting(obj).subscribe((res)=>{
       if(res?.status){
         this.toaster.success(res?.message);
         this.SearchMatch();
         $('#scoreKeyupdate').modal('hide')

       }else{
         this.toaster.error(res?.message);
       }
     })
  }

}
 