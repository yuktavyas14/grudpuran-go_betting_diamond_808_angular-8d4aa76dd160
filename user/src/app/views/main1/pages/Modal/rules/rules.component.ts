import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { Subscription } from 'rxjs';
declare var $;

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  matchDetails: any;
  subscription: Subscription;

  constructor(private service: MatchService) { 
    this.subscription = this.service.matchRulesModalData.subscribe(res => {
      if (res) {
        $('#modalGmaeRules').modal('show');
        this.matchDetails= res;
      } else {
          // clear messages when empty message received
      }
  });
  }

  ngOnInit(): void {
  }
  closeRulesModal() {
    $('#modalGmaeRules').modal('hide');

  }
}
