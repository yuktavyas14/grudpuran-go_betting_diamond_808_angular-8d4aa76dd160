import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userInfo:any= new User();

  constructor(private myRoute: Router) {
    if (this.userInfo.getData() && this.userInfo.getData().is_change_password=='1'){
      this.myRoute.navigate(['/main/chage-password']);

    }
   }

  ngOnInit(): void {
  }

}
