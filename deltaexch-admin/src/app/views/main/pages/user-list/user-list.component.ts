import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  search_client = new FormControl()
  signupUserList:any = []
  totalItems:any= 2;
  itemPerPage:any;
  page     : number =1;
  config:any;
  constructor(private fb: FormBuilder , private service: MatchService) { }
  profitLossForm: FormGroup
  ngOnInit(): void {
   
    this.getSignupUserList()
  }
  getSignupUserList() {
    let payload = {
      page :this.page,
      search : this.search_client.value

    }
    this.service.getSignupUserList(payload).subscribe((res =>{
      if(res?.status){
       this.signupUserList= res?.data?.data;
       if(this.page === 1){
        this.totalItems= res?.data?.total;

      }

      this.itemPerPage = res?.data?.limit;
      this.config = {
        itemsPerPage: this.itemPerPage,
        currentPage: this.page,
        totalItems: this.totalItems
       }
      }
    }))

  }
  pageChange(page) {
    // this.searchStatementObj.page = page;
    this.page = page
    // this.getUserAccountStatements(this.searchStatementObj);
    // thi()
    this.getSignupUserList()
  }

}