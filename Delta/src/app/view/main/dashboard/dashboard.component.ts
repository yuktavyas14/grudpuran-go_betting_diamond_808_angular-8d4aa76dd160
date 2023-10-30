import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDetails     : any      = JSON.parse(localStorage.getItem('userinfo') || 'null');

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.navigate(['/main/change-'])
    // if(this.userDetails?.is_change_password =='0'){
    //   this.router.navigate(['/main/chage-password'])  

    // }
  }

}
