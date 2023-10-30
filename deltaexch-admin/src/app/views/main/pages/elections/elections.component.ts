import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

import { resolve } from 'q';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {

  useradmininfo = new User().getData();
  betList: any = [];
  constructor(private service: MatchService, private userservie: UserService, private location: Location,private toaster:ToastrService) { }
  userBooklist: any = [];
  betListHistory: any = [];
  page = 1;
  code: any;
  fromAmt: any = 0;
  toAmt: any = 0;
  ipAdd: any = ''
  type: any = 'all';
  betType = 'M';

  userList: any = [];
  ngOnInit(): void {
    // this.getBetHistory('M')
    this.getMarketnFancyBet(this.betType);
  }


  /**
   * Get List of user according to the user parent id
   * @param id - Parent Id
   */
  // getUserList() {
  //   let payload = {
  //     parent_id: this.useradmininfo?.user_id,
  //     page: 1

  //   }
  //   this.userservie.getUserByParentId(payload).subscribe((res) => {
  //     if (res?.status) {
  //       this.userList = res?.data?.data;
  //     } else {

  //     }
  //   })
  // }

  getBetLockUsers(type) {
    this.userList = [];
    let payload = {
      match_id: '30363774',
      lock_type: type
    }
    this.service.getListbettingUsers(payload).subscribe((res) => {
      if (res?.status) {
        this.userList = res?.data
      }
    })
  }
  getBetHistory(type) {
    let payload = {
      user_id: Number(this.useradmininfo?.user_id),
      user_type_id: Number(this.useradmininfo?.user_type_id),
      bet_type: type,
      user_code: this.code,
      ip_address: this.ipAdd,
      from_amount: this.fromAmt,
      to_amount: this.toAmt,
      type: this.type,
      page: this.page
    }
    this.service.getBetHistory(payload).subscribe((res) => {
      if (res?.status) {
        this.betListHistory = res?.data?.data;
      } else {

      }
    })
  }


  getMarketnFancyBet(type) {
    this.betType = type;
    let payload = {
      bet_type: type,
      match_id: '30363774'

    }
    this.service.getMarketAndfancyBet(payload).subscribe((res) => {
      if (res?.status) {
        this.betList = res?.data;
      }
    }, (err) => {
      if (this.location?.path().split('/')[2] === 'elections') {
        setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 5000);
      }
    },
      () => {
        if (this.location?.path().split('/')[2] === 'elections') {
          setTimeout(() => resolve(this.getMarketnFancyBet(this.betType)), 5000);
        }
      }
    )
  }



  lockUnlockBet(user) {
    let type;
    if (user?.bet_lock) {
      type = 'U'
    } else {
      type = 'L'
    }
    let payload = {
      user_id: user?.user_id,
      user_type_id: user?.user_type_id,
      match_id: '30363774',
      type : type

    }
    this.service.lockBetuserWise(payload).subscribe((res)=>{
      if (res?.status) {
        this.toaster.success(res?.message);
        this.getBetLockUsers('B')
   }else{
     this.toaster.error(res?.message)
   }
    })
  }


  lockUnlockFancy(user) {
    let type;
    if (user?.fancy_lock) {
      type = 'U'
    } else {
      type = 'L'
    }
    let payload = {
      user_id: user?.user_id,
      user_type_id: user?.user_type_id,
      match_id: '30363774',
      type : type

    }
    this.service.lockFancyuserWise(payload).subscribe((res)=>{
      if (res?.status) {
        this.toaster.success(res?.message);
        this.getBetLockUsers('F')
   }else{
     this.toaster.error(res?.message)
   }
    })
  }
  getUserBookList() {
    let payload = {
      match_id: "30363774",
      market_id: "1.180787860"
    }
    this.service.getUserBook(payload).subscribe((res) => {
      if (res?.status) {
        this.userBooklist = res?.data;
      }
    })
  }
}
