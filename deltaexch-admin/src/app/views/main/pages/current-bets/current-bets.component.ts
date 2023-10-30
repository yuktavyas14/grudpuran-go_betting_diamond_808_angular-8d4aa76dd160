import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { User } from 'src/app/core/model/user';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormControl } from '@angular/forms';
import { ToastRef, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-current-bets',
  templateUrl: './current-bets.component.html',
  styleUrls: ['./current-bets.component.css']
})
export class CurrentBetsComponent implements OnInit {
  useradmininfo = new User().getData();
  limit=10;
  page = 1;
  bet_type = 'M';
  totalrecored;
  searchKey = new FormControl('');
  config;
  offset = 0
itemsPerPage=10;
userlist=[];

gloabalData:any;
  constructor(private service:MatchService ,private toster: ToastrService) {
    this.getGlobalSetting();
   }
  betList:any= [];
  ngOnInit(): void {

    this.searchKey.valueChanges.subscribe(value => {
      // this.searchUserList(value)
      this.getBetData()
});
this.getBetData()
this.page = 1
this.getAcType(this.useradmininfo?.user_id)
  }


  getBetData(){
    this.getCurrentbets('',1);

  }

  getCurrentbets(user, page){
    // this.betList = []
    // console.log("..............sdfsd.........",user)
    let payload = {
      user_id: Number(this.useradmininfo?.user_id),
      user_type_id : Number(this.useradmininfo?.user_type_id),
      page:page,
      bet_type : this.bet_type,
      limit: Number(this.limit),
      search: this.searchKey.value,
      offset : this.offset,
      // search : this.searchKey.value
    }
    console.log(payload);

    this.service.getCurrentBets(payload).subscribe((res)=>{
      if(res?.status){
        this.betList = res?.data?.data
        //  console.log(".................hell",res?.total)
         if(res?.data.total?.total_count > 0 && page == 1)
         this.totalrecored = res?.data.total?.total_count;
         this.itemsPerPage = res?.data?.limit;
        //  console.log(this.totalrecored)
         this.config = {
          currentPage: page,
          itemsPerPage: this.itemsPerPage,
          totalItems: this.totalrecored
      };
      }else{

      }
    })
  }
  getGlobalSetting(){
    this.service.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
        this.gloabalData = res?.data

      }
      else{
        this.toster.error(res?.message)
      }
    })
  }

  pageChange(newPage: number) {
    if(this.page < newPage){
      this.offset = this.offset + Number(this.limit)
      } else {

        this.offset = this.offset - Number(this.limit)
        if(this.offset < 0){
          this.offset = 0
        }
      }
    this.page = newPage;



    this.getCurrentbets('', this.page);

  }


  trackByFn(index, item) {
    return index; // or item.id
}

searchUserList(value){
  let payload = {
    user_name : value
  }
  this.service.searchUser(payload).subscribe((res)=>{
    if(res?.status){
      this.userlist = res?.data;
    }
  })

}

deleteBetFancy(bet_id, marketID,location ){
  let payload= {
    bet_id    : bet_id,
    market_id : marketID,
    is_void   : 0,
    location    : location 
  }

  this.service.deleteBetFancy(payload).subscribe(res=>{
    if(res?.status){
      this.getCurrentbets('',this.page);
      this.toster.success(res?.message)
    } else {
      this.toster.error(res?.message)
    }
  })
}


deletePermanentDeleteBet(bet_id, marketID,betType,location ){
  let payload= {
    bet_id    : bet_id,
    market_id : marketID,
    bet_type   : betType,
    location :location 
  }

  this.service.deletePermanentDeleteBet(payload).subscribe(res=>{
    if(res?.status){
      this.getCurrentbets('',this.page);
      this.toster.success(res?.message)
    } else {
      this.toster.error(res?.message)
    }
  })
}
deleteOddsBet(bet_id, marketID,location ){
  let payload= {
    bet_id    : bet_id,
    market_id : marketID,
    is_void   : 0,
    location :location 
  }

  this.service.deleteOddsBet(payload).subscribe(res=>{
    if(res?.status){
      this.getCurrentbets('',this.page);
      this.toster.success(res?.message)
    } else {
      this.toster.error(res?.message)
    }
  })
}
 

confirmBox(bet_id, marketID, betype){
  debugger;
  let currentPosition:any =  localStorage.getItem('getCurrentLocation')
  debugger
  if(currentPosition == "undefined" || currentPosition == null || currentPosition=='' ||  currentPosition == 'null'){
    alert('Please allow location access ')
    return;
  }else{
  console.log(currentPosition)
  // navigator.geolocation.getCurrentPosition(function(position) {  
    
  //        console.log("data", position)
  // })
  if(this.bet_type =='D'){
    Swal.fire({
      title: 'Are you sure want to delete?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        if(betype == '1')
        this.deletePermanentDeleteBet(bet_id, marketID,betype,currentPosition)
        if(betype == '2')
        this.deletePermanentDeleteBet(bet_id, marketID,betype,currentPosition)

        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }
    else{
      Swal.fire({
        title: 'Are you sure want to delete?',
        // text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          if(betype == '1')
          this.deleteOddsBet(bet_id, marketID,currentPosition)
          if(betype == '2')
          this.deleteBetFancy(bet_id,marketID,currentPosition)
          // Swal.fire(
          //   'Deleted!',
          //   'Your imaginary file has been deleted.',
          //   'success'
          // )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Swal.fire(
          //   'Cancelled',
          //   'Your imaginary file is safe :)',
          //   'error'
          // )
        }
      })
    } 
  
  }

}

getAcType(id) {
  if (id == '1') {
    return 'Tech Admin'
  } else if (id == '2') {
    return 'Admin'
  } else if (id == '3') {
    return 'Master'
  } else if (id == '4') {
    return 'Super Agent'
  } else if (id == '5') {
    return 'Agent'
  }
}
}
