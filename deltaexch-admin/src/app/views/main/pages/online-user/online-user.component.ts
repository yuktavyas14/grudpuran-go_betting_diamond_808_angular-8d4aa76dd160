import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/core/services/match.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-online-user',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.css']
})
export  class OnlineUserComponent implements OnInit {
  onlineUserList:any;
  searchKey ;
  
  constructor( private service: MatchService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getOnlineUsers();
  }

  getOnlineUsers(){
    let payload ={
      search:this.searchKey
    }
    this.service.getOnlineUsers(payload).subscribe((res)=>{
      if(res?.status){
        this.onlineUserList = res?.data;
      }
    })
    
  }

  logoutAll(){
    this.service.logoutallUsers().subscribe(res=>{
      if(res?.status){
        this.toaster.success(res?.message);
        this.getOnlineUsers()
      }else{
        this.toaster.error(res?.message);
      }
    })
  }

}
