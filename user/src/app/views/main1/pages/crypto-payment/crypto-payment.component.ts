import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { User } from "src/app/core/model/user";
import { MatchService } from "./../../../../core/services/match.service";
declare const $: any;

@Component({
  selector: "app-crypto-payment",
  templateUrl: "./crypto-payment.component.html",
  styleUrls: ["./crypto-payment.component.scss"],
})
export class CryptoPaymentComponent implements OnInit {
  @ViewChild("myInput") myInput: ElementRef;
  userName: any;
  withDrawForm: FormGroup;
  userInfo = new User().getData();

  constructor(
    private service: MatchService,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {
    this.withDrawForm = this.fb.group({
      password: ["", [Validators.required]],
      wallet_id: ["", [Validators.required]],
      receiver_address: ["", Validators.required],
      amount: ["", Validators.required],
      // 'sender_user_id ': [this.userInfo.user_id, Validators.required],
      receiver_user_id: ["", Validators.required],
      coin_id: ["", Validators.required],
    });
  }
  fromDate = new Date();
  toDate = new Date();
  page = 1;

  limit = 10;
  totalrecored;
  config;
  accountReportList: any = [];
  openingList: any;
  type = "All";
  itemsPerPage: any;
  userListData: any;
  totalSum: any;
  match_id: any;
  market_id: any;
  walletPassword: any;
  walletBalance: any;
  coinId: any;
  userList: any = [];
  userValue = "";

  ngOnInit(): void {
    this.getAccountStatment();
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
  pageChange(newPage: number) {
    this.page = newPage;
  }
  getAccountStatment() {
    let payload = {};
    this.accountReportList = [];
    this.openingList = {};
    this.service.getCryptoWallet(payload).subscribe((res) => {
      if (res?.status) {
        this.accountReportList = res?.data;
        console.log(this.accountReportList, "accountReportList");

        // if(res?.data?.total?.total_count != 0){
        //   this.totalrecored = res?.data.total?.total_count;
        // }
        // this.itemsPerPage = res?.data?.limit;

        this.config = {
          currentPage: this.page,
          itemsPerPage: this.itemsPerPage,
          totalItems: this.totalrecored,
        };
      } else {
        // this.toaster.error(res?.message);
      }
    });
  }

  // getBetsByMatchId(match_id,market_id,bet_type){
  //   this.totalSum = 0
  //   this.match_id = match_id;
  //   this.market_id = market_id;
  //   let payload = {
  //     match_id:match_id,
  //     market_id:market_id,
  //     bet_type:bet_type
  //   }

  //   this.service.getBetsByMatchId(payload).subscribe((res)=>{
  //     if(res?.status){
  //       // console.log(res, "test")
  //       this.userListData = res?.data;
  //       if(this.userListData){
  //         this.userListData.forEach(element => {
  //           if(element?.profit_loss){
  //             this.totalSum = this.totalSum + element?.profit_loss;
  //           }
  //         });
  //       }
  //     }
  //   })
  // }
  checkNumberPositvie(values: any) {
    if (values >= 0) {
      return true;
    } else {
      return false;
    }
  }
  onCreateWallet() {
    let payload = {};
    this.service.createWallet(payload).subscribe((res) => {
      $("#showPassword").modal("show");

      if (res?.status) {
        if (res.data) {
          if (res.data.password) {
            this.walletPassword = res.data.password;
              $("#showPassword").modal("show");
          }
        }
        this.toaster.success(res?.message);
        this.getAccountStatment();
      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  viewBlance(item: any) {
    let payload = {
      coin_id: item.coin_id,
      wallet_id: item.wallet_id,
    };
    this.service.getWalletBalance(payload).subscribe((res) => {
      if (res?.status) {
        this.walletBalance = res?.data.data[0];
        console.log(this.walletBalance), "this.walletBalance";

        $("#ViewBlance").modal("show");
        this.toaster.success(res?.message);
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
  onSelectReceiverUser(user) {
    this.userValue = user.user_name;
    this.withDrawForm.patchValue({
      receiver_address: user.address,
      receiver_user_id: user.user_id,
    });
    this.userList = [];
  }
  onSendMoney(item: any) {
    this.coinId = item.coin_id;
    this.withDrawForm.patchValue({
      wallet_id: item.wallet_id,
      coin_id: item.coin_id,
    });
    $("#sendMoneyModal").modal("show");
  }
  onWithdraw() {
    this.service.depositCrypto(this.withDrawForm.value).subscribe((res) => {
      if (res?.status) {
        this.withDrawForm.reset();
        $("#sendMoneyModal").modal("hide");

      } else {
        this.toaster.error(res?.message);
      }
    });
  }

  ngAfterViewInit() {
    const searchTerm = fromEvent<any>(this.myInput.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged()
    );
    searchTerm.subscribe((res) => {
      this.userName = res;
      this.getUserWalletByUserName(this.userName);
    });
  }
  getUserWalletByUserName(user: any) {
    let payload = {
      coin_id: this.coinId,
      search: user,
    };
    this.service.getUserWalletByUserName(payload).subscribe((res) => {
      if (res?.status) {
        this.userList = res.data;
      } else {
        this.toaster.error(res?.message);
      }
    });
  }
}
