import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/core/services/match.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  useradmininfo = new User().getData();
  flagExits = false;
    
    constructor(private matchService: MatchService, private validationService:ValidationService, private service: UserService, private toaster: ToastrService, private fb: FormBuilder, private ac :ActivatedRoute) { }
  userDetails: any;
  parent_id:any;
  creatUserForm: FormGroup
  ourCommionCricket=0;
  ourCommionSoccer=0;
  ourCommionTannies=0;
  ourPartnershipCricket=0;
  ourPartnershipSoccer=0;
  ourPartnershipTannies=0;
  private userNameRegex = new RegExp('^[A-Za-z0-9_-]{4,20}$');
  ngOnInit(): void {

    this.parent_id = this.ac.snapshot.params?.parent_id;
    this.getUserDetails(this.useradmininfo?.user_id)
    this.creatUserForm = this.fb.group({
      'client_name': new FormControl('', [Validators.required, Validators.pattern(this.userNameRegex)]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
      'confirm_pass': new FormControl('', Validators.required),
      'full_name': new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      'city': new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      'phone': new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      'account_type': new FormControl("", Validators.required),
      'cricket_comm': new FormControl("", Validators.required),
      'cricket_partnership': new FormControl("", Validators.required),
      'soccer_comm': new FormControl("", Validators.required),
      'soccer_partnership': new FormControl("", Validators.required),
      'tennis_comm': new FormControl("", Validators.required),
      'tennis_partnership': new FormControl("", Validators.required),
      'cricket_min_bet':  new FormControl("", Validators.required),
      'soccer_min_bet':  new FormControl("", Validators.required),

      'tennis_min_bet':  new FormControl("", Validators.required),

      'cricket_max_bet':  new FormControl("", Validators.required),

      'soccer_max_bet':  new FormControl("", Validators.required),

      'tennis_max_bet':  new FormControl("", Validators.required),

      'cricket_delay':  new FormControl("", Validators.required),

      'soccer_delay':  new FormControl("", Validators.required),

      'tennis_delay':  new FormControl("", Validators.required),
      'trans_pass': new FormControl("",Validators.required),
      'exposer_limit': new FormControl('',Validators.required),
      "credit_reff": new FormControl('',Validators.required),

    },{validator: this.passwordConfirming})

    this.creatUserForm.get("client_name").valueChanges.subscribe(x => {
      if( this.creatUserForm.controls['client_name'].value == ''){
        this.flagExits = false;
      }
   })
  }
  onCricketComm(value){
    this.ourCommionCricket = this.userDetails?.cricket_commission - value
  }
  onSoccerComm(value){
    this.ourCommionSoccer = this.userDetails?.soccer_commission - value
  }
  onTennisComm(value){
    this.ourCommionTannies = this.userDetails?.tennis_commission - value

  }
  onCricketPartnership(value){
    this.ourPartnershipCricket = this.userDetails?.cricket_partnership - value

  }
  onSoccerPartnership(value){
    this.ourPartnershipSoccer = this.userDetails?.soccer_partnership - value

  }
  onTennisPartnership(value){
    this.ourPartnershipTannies = this.userDetails?.tennis_partnership - value

  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_pass').value) {
        return {invalid: true};
    }
}




  changeType() {
    if(this.creatUserForm.controls.account_type.value != 7){
      if(this.creatUserForm.controls.hasOwnProperty('cricket_min_bet')){
        // alert("cricket in bet")
        this.creatUserForm.removeControl('soccer_min_bet');
        this.creatUserForm.removeControl('tennis_min_bet');
        this.creatUserForm.removeControl('cricket_min_bet');

        this.creatUserForm.removeControl('soccer_max_bet');
        this.creatUserForm.removeControl('tennis_max_bet');
        this.creatUserForm.removeControl('cricket_max_bet');

        this.creatUserForm.removeControl('soccer_delay');
        this.creatUserForm.removeControl('tennis_delay');
        this.creatUserForm.removeControl('cricket_delay');
        this.creatUserForm.removeControl('exposer_limit');


      }
    }else{

      this.creatUserForm.patchValue({
        "tennis_partnership": 0,
        "cricket_partnership":0,
        "soccer_partnership" :0,
        "cricket_comm":0,
        "tennis_comm":0,
        "soccer_comm":0,
        soccer_min_bet: this.userDetails?.soccer_min_bet,
        tennis_min_bet: this.userDetails?.tennis_min_bet,
        cricket_min_bet: this.userDetails?.cricket_min_bet,
        soccer_max_bet :   this.userDetails?.soccer_max_bet,
        tennis_max_bet: this.userDetails?.tennis_max_bet,
        cricket_max_bet: this.userDetails?.cricket_max_bet,
        soccer_delay:    this.userDetails?.soccer_delay,
        tennis_delay: this.userDetails?.tennis_delay,
        cricket_delay: this.userDetails?.cricket_delay,
        exposer_limit: this.userDetails?.exposer_limit,
        user_rate : 1
        });

      if(!this.creatUserForm.controls.hasOwnProperty('cricket_min_bet')){

      this.creatUserForm.addControl('soccer_min_bet',new FormControl(this.userDetails?.soccer_min_bet, Validators.required))
      this.creatUserForm.addControl('tennis_min_bet',new FormControl(this.userDetails?.tennis_min_bet, Validators.required))
      this.creatUserForm.addControl('cricket_min_bet',new FormControl(this.userDetails?.cricket_min_bet, Validators.required))

      this.creatUserForm.addControl('soccer_max_bet',new FormControl(this.userDetails?.soccer_max_bet, Validators.required))
      this.creatUserForm.addControl('tennis_max_bet',new FormControl(this.userDetails?.tennis_max_bet, Validators.required))
      this.creatUserForm.addControl('cricket_max_bet',new FormControl(this.userDetails?.cricket_max_bet, Validators.required))

      this.creatUserForm.addControl('soccer_delay',new FormControl(this.userDetails?.soccer_delay, Validators.required))
      this.creatUserForm.addControl('tennis_delay',new FormControl(this.userDetails?.tennis_delay, Validators.required))
      this.creatUserForm.addControl('cricket_delay',new FormControl(this.userDetails?.cricket_delay, Validators.required))

      this.creatUserForm.addControl('exposer_limit',new FormControl('', Validators.required))


      }

    }





  }
  checkUserExist(){
   let payload ={
     user_name: this.creatUserForm.controls['client_name'].value
   }
   if(this.creatUserForm.controls['client_name'].value){
   this.service.checkUserExists(payload).subscribe((res)=>{
     if(!res?.status){
     this.flagExits = true;
     }
   })
  }
  }
  getUserDetails(id) {
    let payload = {
      id: Number(id)
    }
    this.service.getUserDetailsById(payload).subscribe((res) => {
      if (res?.status) {
        this.userDetails = res?.data;
        this.ourCommionCricket=this.userDetails?.cricket_commission;
        this.ourCommionSoccer=this.userDetails?.soccer_commission;
        this.ourCommionTannies=this.userDetails?.tennis_commission;
        this.ourPartnershipCricket=this.userDetails?.cricket_partnership;
        this.ourPartnershipSoccer=this.userDetails?.soccer_partnership;
        this.ourPartnershipTannies=this.userDetails?.tennis_partnership;
      } else {

      }
    })

  }

  createUser() {
    // debugger;
    if(this.creatUserForm.invalid){
      console.log(this.creatUserForm.value)
      this.toaster.error("Please check the form")
      return true;
    }
    // if(this.creatUserForm.valid){
    //   console.log(this.creatUserForm.value)
    //   this.toaster.error("valid  form")
    //   return true;
    // }

  let data =   this.creatUserForm.controls['password'].value
     let payload
     if(this.creatUserForm.controls.account_type.value != 7){
      payload = {
      user_name: this.creatUserForm.controls['client_name'].value,
      name: this.creatUserForm.controls['full_name'].value,
      mobile: String(this.creatUserForm.controls['phone'].value),
      parent_id: Number(this.parent_id),
      user_type_id: Number(this.creatUserForm.controls['account_type'].value),
      password: this.creatUserForm.controls['password'].value,
      liability_limit: 0,
      cricket_partnership: this.creatUserForm.controls['cricket_partnership'].value,
      soccer_partnership: this.creatUserForm.controls['soccer_partnership'].value,
      tennis_partnership: this.creatUserForm.controls['tennis_partnership'].value,
      cricket_commission: this.creatUserForm.controls['cricket_comm'].value,
      soccer_commission: this.creatUserForm.controls['soccer_comm'].value,
      tennis_commission: this.creatUserForm.controls['tennis_comm'].value,
      master_password: this.creatUserForm.controls['trans_pass'].value,
      credit_referance: this.creatUserForm.controls['credit_reff'].value,

    }
    // console.log(this.creatUserForm.value);
  }else{
    payload = {
      user_name: this.creatUserForm.controls['client_name'].value,
      name: this.creatUserForm.controls['full_name'].value,
      mobile: String(this.creatUserForm.controls['phone'].value),
      parent_id: Number(this.parent_id),
      user_type_id: Number(this.creatUserForm.controls['account_type'].value),
      password: this.creatUserForm.controls['password'].value,
      cricket_partnership: this.creatUserForm.controls['cricket_partnership'].value,
      soccer_partnership: this.creatUserForm.controls['soccer_partnership'].value,
      tennis_partnership: this.creatUserForm.controls['tennis_partnership'].value,
      cricket_commission: this.creatUserForm.controls['cricket_comm'].value,
      soccer_commission: this.creatUserForm.controls['soccer_comm'].value,
      tennis_commission: this.creatUserForm.controls['tennis_comm'].value,
      cricket_min_bet: this.creatUserForm.controls['cricket_min_bet'].value,
      soccer_min_bet: this.creatUserForm.controls['soccer_min_bet'].value,
      tennis_min_bet: this.creatUserForm.controls['tennis_min_bet'].value,
      cricket_max_bet: this.creatUserForm.controls['cricket_max_bet'].value,
      soccer_max_bet: this.creatUserForm.controls['soccer_max_bet'].value,
      tennis_max_bet: this.creatUserForm.controls['tennis_max_bet'].value,
      cricket_delay: this.creatUserForm.controls['cricket_delay'].value,
      soccer_delay: this.creatUserForm.controls['soccer_delay'].value,
      tennis_delay: this.creatUserForm.controls['tennis_delay'].value,
      master_password: this.creatUserForm.controls['trans_pass'].value,
      credit_referance: this.creatUserForm.controls['credit_reff'].value,
      liability_limit: this.creatUserForm.controls['exposer_limit'].value,
  }
}
    this.service.createUser(payload).subscribe((res)=>{
      if(res?.status){
          this.toaster.success(res?.message);
          this.creatUserForm.reset();
      }else{
          this.toaster.error(res?.message);
      }
    })
  }



}
