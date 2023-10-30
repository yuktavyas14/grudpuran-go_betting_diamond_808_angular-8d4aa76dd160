import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MatchService } from "src/app/core/services/match.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-account-setting",
  templateUrl: "./account-setting.component.html",
  styleUrls: ["./account-setting.component.css"],
})
export class AccountSettingComponent implements OnInit {
  favurl;
  urlUpi: any;
  urlGpay: any;
  urlPpay: any;
  gloabalData;
  upiUpload: File = null;
  gPayUpload: File = null;
  pPayUpload: File = null;
  masterPassword: any = "";
  constructor(
    private service: MatchService,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {}
  globalSetting: FormGroup;
  ngOnInit(): void {
    this.globalSetting = this.fb.group({
      account_number: new FormControl("", Validators.required),
      bank_name: new FormControl("", Validators.required),
      ifsc: new FormControl("", Validators.required),
      holder_name: new FormControl("", Validators.required),
      upi: new FormControl("", Validators.required),
      phone_pay: new FormControl("", Validators.required),
      gpay: new FormControl("", Validators.required),
      master_password: new FormControl("", Validators.required),
    });
    this.getGlobalSetting();
  }
  getGlobalSetting() {
    this.service.getAccountDetails().subscribe((res) => {
      if (res?.status) {
        console.log("res", res);
        this.setValues(res?.data);
        this.gloabalData = res?.data;
        this.urlUpi =
          environment.APIEndpoint +
          "/api/upload/image/" +
          this.gloabalData.upi_qr_url;
        this.urlGpay =
          environment.APIEndpoint +
          "/api/upload/image/" +
          this.gloabalData.gpay_url;
        this.urlPpay =
          environment.APIEndpoint +
          "/api/upload/image/" +
          this.gloabalData.phone_pay_url;
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
  setValues(data) {
    this.globalSetting.patchValue({
      account_number: data?.account_number,
      bank_name: data?.bank_name,
      ifsc: data?.ifsc,
      holder_name: data?.holder_name,
      upi: data?.upi,
      phone_pay: data?.phone_pay,
      gpay: data?.gpay,
    });
  }

  updateAccountDetails() {
    let requestData = {
      account_number: this.globalSetting.value.account_number.toString(),
      bank_name: this.globalSetting.value.bank_name.toString(),
      ifsc: this.globalSetting.value.ifsc.toString(),
      holder_name: this.globalSetting.value.holder_name.toString(),
      upi: this.globalSetting.value.upi.toString(),
      phone_pay: this.globalSetting.value.phone_pay.toString(),
      gpay: this.globalSetting.value.gpay.toString(),
      master_password: this.globalSetting.value.master_password.toString(),
    };
    console.log(requestData, "requestData");
    this.service.updateAccountDetails(requestData).subscribe((res) => {
      if (res?.status) {
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
  uploadQRCode() {
    const formData = new FormData();
    formData.append("upiqr", this.upiUpload);
    formData.append("gpay", this.gPayUpload);
    formData.append("phonepay", this.pPayUpload);
    // formData.append("master_password", this.masterPassword);
    this.service.uploadQRCode(formData).subscribe((res) => {
      if (res?.status) {
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
  onFileSelectedUpi(event: any) {
    this.upiUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.urlUpi = event.target.result;
    };
  }
  onFileSelectedGpay(event: any) {
    this.gPayUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.urlGpay = event.target.result;
    };
  }
  onFileSelectedPpay(event: any) {
    this.pPayUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.urlPpay = event.target.result;
    };
  }
}
