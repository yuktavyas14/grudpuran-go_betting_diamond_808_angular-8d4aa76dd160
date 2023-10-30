import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-online-matches',
  templateUrl: './online-matches.component.html',
  styleUrls: ['./online-matches.component.css']
})
export class OnlineMatchesComponent implements OnInit {

  constructor(private ac:ActivatedRoute,private service:MatchService,private toaster:ToastrService) { }
  sportId:any;
  seriesId:any;
  matchList:any=[];
  isExpend:any;
  hideme= [];
  ngOnInit(): void {
    this.ac.params.subscribe((param) => {
      this.sportId = param.sportId;
      this.seriesId = param.seriesId;
    })
  this.getMatchList()
  } 

  getMatchList() {
    let payload = {
      series_id: this.seriesId,
      sport_id: this.sportId
    }
    this.service.getMatchList(payload).subscribe((res) => {
      if (res.status) {
         this.matchList = res.data;
      } else {
        this.toaster.error(res?.message);
      }
    })
  }


  /**
   * Saving Match
   * @match- this is the match
   */
  createMatch(match){
    let payload = {
      series_id: match.series_id,
      sport_id: match.sport_id,
      match_id:match.match_id,
      match_date:match.openDate,
      name: match.match_name,
      liability_type: "0"
    }
    this.service.createMatch(payload).subscribe((res) => {
      if (res.status) {
        this.toaster.success(res?.message)
        this.getMatchList();
      } else {
        this.toaster.error(res?.message);
      }
    })
  
  }
}
