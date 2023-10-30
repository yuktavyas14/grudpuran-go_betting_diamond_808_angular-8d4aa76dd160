import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/model/user";
import { UserService } from "src/app/core/services/user.service";
import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatchService } from "src/app/core/services/match.service";

@Component({
  selector: 'app-add-affiliate',
  templateUrl: './add-affiliate.component.html',
  styleUrls: ['./add-affiliate.component.css']
})
export class AddAffiliateComponent implements OnInit {
  userInfo = new User().getData();
  Ourmatch_commission: number = 0;
  CurrencyList: any = [];
  flagExits = false;
  constructor(
    private matchService: MatchService,
    private service: UserService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private ac: ActivatedRoute
  ) {}
  userDetails: any;
  parent_id: any;
  createForm: FormGroup;
  currency: any;
  rate: any;
  Ourpartnership: any = 0;
  default_rate: number = 0;
  currency_rate: number = 1;
  bounsType: any = [];
  ngOnInit(): void {
    // this.createForm.get('match_commission')

    // this.parent_id = this.ac.snapshot.params?.parent_id;
    this.createForm = this.fb.group({
      referral_name: new FormControl("", Validators.required),
      referral_percentage: new FormControl(0, Validators.required),
      range_from: new FormControl(0, Validators.required),
      range_to: new FormControl(0, Validators.required),
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  createUser() {
    if (this.createForm.invalid) {
      console.log(this.createForm.value);
      // this.toaster.error("Please check the form")
      return true;
    }

    console.log(this.createForm.value);
    this.createForm.patchValue({
      referral_percentage: +this.createForm.value.referral_percentage,
      range_from: +this.createForm.value.range_from,
      range_to: +this.createForm.value.range_to,
    });

    this.matchService
      .addAffiliateRangeTypesBySuperAdmin(this.createForm.value)
      .subscribe((res) => {
        if (res?.status) {
          this.toaster.success(res?.message);
          this.createForm.reset();
        } else {
          this.toaster.error(res?.message);
        }
      });
  }
}
