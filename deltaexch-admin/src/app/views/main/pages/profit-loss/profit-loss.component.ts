import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
  date = new Date()
  userlist: any = [];
  profitlossreport:any = []
  page = 1;
  search_client = new FormControl('')

  constructor(private fb: FormBuilder , private service: MatchService) { }
  profitLossForm: FormGroup
  ngOnInit(): void {
    this.search_client.valueChanges.subscribe(change => {
      // console.log(change); // Value inside the input field as soon as it changes
            this.searchUserList(change)

    });

    this.profitLossForm = this.fb.group({
      // search_client : new FormControl(''),

      'from_date': new FormControl(this.date),
      'to_date': new FormControl(new Date())
    })
    // this.getProfitLoss()
  }
  getProfitLoss() {
    console.log(this.profitLossForm.value , "value")
    let payload = {
      page :this.page,
      from_date :this.profitLossForm.controls.from_date.value,
      to_date :this.profitLossForm.controls.to_date.value,
      search : this.search_client.value

    }
    this.service.getProfitLossReport(payload).subscribe((res =>{
      if(res?.status){
       this.profitlossreport= res?.data;
      //  console.log(res, "resd")
      }
    }))

  }

  searchUserList(value) {
    this.userlist = []
    let payload = {
      user_name: value,
      is_search_only_user : 1
    }
    this.service.searchUser(payload).subscribe((res) => {
      if (res?.status) {
        this.userlist = res?.data;
      }
    })

  }
}
