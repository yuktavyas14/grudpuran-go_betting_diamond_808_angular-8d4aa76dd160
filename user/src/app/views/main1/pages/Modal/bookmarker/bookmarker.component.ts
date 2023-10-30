import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatchService } from 'src/app/core/services/match.service';
declare var $;

@Component({
  selector: 'app-bookmarker',
  templateUrl: './bookmarker.component.html',
  styleUrls: ['./bookmarker.component.scss']
})
export class BookmarkerComponent implements OnInit {
  matchDetails: any;
  subscription: Subscription;
  marketname;
  constructor(private service: MatchService) {
    this.subscription = this.service.bookmarkerModal.subscribe(res => {
      if (res) {
        let marketName = res.name.toLowerCase();
        if (marketName == 'bookmaker' || marketName == 'book maker') {
          $('#modalBookmarker').modal('show');
        } else {
          this.marketname = res.name
          $('#modalBookmarker1').modal('show');
    
        }
        $('#modalGmaeRules').modal('show');
      } else {
          // clear messages when empty message received
      }
  });
   }

  ngOnInit(): void {
  }

}
