import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {
  profitandLossSearchForm : FormGroup
  page                    : number = 1;
  accountList             : any = []; 
  totalrecored            : any =  0;
  itemsPerPage            : any;
  config                  : any
  limit                   = 10;
  constructor(private fb: FormBuilder, private matchService : MatchService, private toaster : ToastrService) {
    this.profitandLossSearchForm =  this.fb.group({
      from_date   : [new Date()],
      to_date     : [new Date()],
      search      : []
  })
  }

  ngOnInit(): void {
  }


  getProfiletLoss(data : any){

    data['page'] = this.page;

    this.matchService.getProfitLossList(data).subscribe((res)=>{
      if(res?.status){
        this.accountList = res?.data.data;
         console.log(this.accountList , "cooa")
      }else{
        this.toaster.error(res?.message)
      }
    })
   }
  

   trackByFn(index :any, item :any) {
    return index; // or item.id
}
  pageChange(newPage: number) {
    this.page = newPage;
    this.getProfiletLoss(this.profitandLossSearchForm.value)
  }
 
}
