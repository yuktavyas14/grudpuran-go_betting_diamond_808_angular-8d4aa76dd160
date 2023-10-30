import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-bonus',
  templateUrl: './add-bonus.component.html',
  styleUrls: ['./add-bonus.component.css'],
  providers: [DatePipe]
})
export class AddBonusComponent implements OnInit {

  userInfo = new User().getData();
  Ourmatch_commission: number = 0;
  CurrencyList: any = [];
  flagExits = false;
  constructor(private matchService: MatchService, private service: UserService, private toaster: ToastrService, 
    private fb: FormBuilder, private ac :ActivatedRoute,private datePipe: DatePipe) { 
      this.getBonusName();
      this.userBonusType();
    }
  userDetails: any;
  parent_id:any;
  createForm: FormGroup
  currency : any;
  rate : any;
  Ourpartnership : any = 0
  default_rate : number = 0;
  currency_rate : number = 1;
  bounsType:any=[]
  bounsName:any=[]
  ngOnInit(): void {

    // this.createForm.get('match_commission')



    // this.parent_id = this.ac.snapshot.params?.parent_id;
    this.createForm = this.fb.group({
      bonus_name: new FormControl('', Validators.required),
      event_name: new FormControl('', Validators.required),
      event_id: new FormControl('', Validators.required),
      event_min_bet_stack: new FormControl(0, Validators.required),
      sender_share: new FormControl(0, Validators.required),
      receiver_share: new FormControl(0, Validators.required ),
      bonus_percentage: new FormControl(0, Validators.required),
      bonus_amount:  new FormControl("", Validators.required),
      bonus_duration:  new FormControl("", Validators.required),
      bonus_type:  new FormControl("", Validators.required),
      coupons: new FormArray([])

    } )
  
  }
userBonusType(){
    
  this.matchService.getUserBonusTypes().subscribe((res)=>{
    if(res?.status){
      this.bounsType= res.data;
        this.toaster.success(res?.message);
    }else{
      this.bounsType=[]
        this.toaster.error(res?.message);
    }
  })
}
getBonusName(){
 
  this.matchService.getBonusName().subscribe((res)=>{
    if(res?.status){
      this.bounsName= res.data;
        this.toaster.success(res?.message);
    }else{
      this.bounsName=[]
        this.toaster.error(res?.message);
    }
  })
}
  get coupons(){
    return <FormArray>this.createForm.controls["coupons"]
  }
  
  
  onChangeType(type){
  console.log(type)
  const add = this.createForm.get('coupons') as FormArray;
  add.controls = [];

    if(type =='fixed'){
       
    }else{
    
      const couponForm= this.fb.group({
        coupon_name: [''],
        from: [0],
        to: [0],
        expired_at: ['']
      });
      this.coupons.push(couponForm)
    }

  }
  addCoupons(){
    const couponForm= this.fb.group({
      coupon_name: [''],
      from: ['0'],
      to: ['0'],
      expired_at: ['']
    });
    this.coupons.push(couponForm)
  }
  deleteAddressGroup(index: number) {
    const add = this.createForm.get('coupons') as FormArray;
    add.removeAt(index)
  }


 

  // this.searchKey.valueChanges.subscribe(value => {
  //   this.getAccountStatementReport()
  // });

  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
 
 

  createUser() {
    if(this.createForm.invalid){
      console.log(this.createForm.value)
      // this.toaster.error("Please check the form")
      return true;
    }
    //(this.createForm.get('controls') as FormArray).at(index) as FormGroup).get('coupons').patchValue(item.description)
 
    // this.datePipe.transform(this.acountGroup.controls.from_date.value , 'yyyy-MM-dd'),
console.log(this.createForm.value)
this.createForm.patchValue({ 
  event_min_bet_stack : +this.createForm.value.event_min_bet_stack,
  sender_share : +this.createForm.value.sender_share,
  receiver_share : +this.createForm.value.receiver_share,
  bonus_percentage : +this.createForm.value.bonus_percentage,
  bonus_amount  : +this.createForm.value.bonus_amount ,
  bonus_duration  : +this.createForm.value.bonus_duration ,
})
this.createForm.value.coupons.forEach(element => {
   element.expired_at = this.datePipe.transform(element.expired_at , 'yyyy-MM-dd h:mm:ss')
});
let payload={
  bonus_name: this.createForm.value.bonus_name,
  event_name: this.createForm.value.event_name,
  event_id: this.createForm.value.event_id,
  bonus_type:  this.createForm.value.bonus_type,
  coupons: this.createForm.value.coupons,
  event_min_bet_stack : +this.createForm.value.event_min_bet_stack,
  sender_share : +this.createForm.value.sender_share,
  receiver_share : +this.createForm.value.receiver_share,
  bonus_percentage : +this.createForm.value.bonus_percentage,
  bonus_amount  : +this.createForm.value.bonus_amount ,
  bonus_duration  : +this.createForm.value.bonus_duration ,
}

    this.matchService.addBonusTypesBySuperAdmin(this.createForm.value).subscribe((res)=>{
      if(res?.status){
          this.toaster.success(res?.message);
          this.createForm.reset();
      }else{
          this.toaster.error(res?.message);
      }
    })
  }
}
