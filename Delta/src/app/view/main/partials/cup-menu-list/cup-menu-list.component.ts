import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-cup-menu-list',
  templateUrl: './cup-menu-list.component.html',
  styleUrls: ['./cup-menu-list.component.scss']
})
export class CupMenuListComponent implements OnInit, AfterViewInit {
  cupList:any;

  constructor(private matchService : MatchService, public _router: Router) {

  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.getCupsForMenu();
  }
  getCupsForMenu() {

    let payload = {
      // sport_id: -1,
      is_sidebar_call : 0
    }
    
    this.matchService.getCupsForMenu().subscribe((res) => {
      if (res.status) {
        this.cupList = res.data;
        let isElection= this.cupList.filter((x:any) => x.match_name == ('ELECTION 2022' || 'election 2022'));
        
        if(isElection.length>0){
          let findIndex=  this.cupList.findIndex((x:any) => x.match_name.includes('ELECTION' || 'election'));
          this.cupList=  this.arraymove(res.data,findIndex,0)
        }
       
      } else {
       // this.toaster.error(res?.message)
      }
    })

  }
  arraymove(arr:any, fromIndex:any, toIndex:any) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
    console.log(arr,'arrrrrr');
    
}
  getCupMatch(matchId: any,cupName:string){
    localStorage.setItem('isCup',cupName)
    this._router.navigate(['/main/cupdetails',matchId], { queryParams: { cup: 'cup' } })

  }
  getClass(value:any){
    let item = value?.toLowerCase();
    let isElection= item.includes("election")
    let isFifa= item.includes("fifa")
    if(isElection){
      return 'election22'
    }else if(isFifa){
      return 'fifacup'
    }
     
    else{
    return ''
  }

  }
}
