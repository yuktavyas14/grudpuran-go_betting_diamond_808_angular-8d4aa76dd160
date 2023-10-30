import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/model/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var $;
@Component({
  selector: 'app-list-of-clients',
  templateUrl: './list-of-clients.component.html',
  styleUrls: ['./list-of-clients.component.css']
})
export class ListOfClientsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  userIdparms   :any;
  totalCount   :any;
  config     : any;
  page     : number =1;
  isDisabledSubmit : boolean = false;
  gloabalData
  favurl
  url
  // CurrencyList: any = [];
  parent_id:any;
  useradmininfo = new User().getData();
  userList: any = [];
  CreditdebitForm: FormGroup;
  creditDebitInfo: any;
  parentInfo: any;
  updateExposer: FormGroup;
  changePass: FormGroup;
  changeStatus: FormGroup;
  searchKey = new FormControl('')
  flag:boolean =false;
  parentAmount;
  childAmount;
  // currency: any = "1";
  type; //type is for update limit or credit reffrence
  sportList:any=[];
  globalSetting :FormGroup;

  sportId:any="4";
  userSettingData:any;
  constructor(private ac : ActivatedRoute, private excelService : ExcelServiceService,
    private matchService: MatchService, private service: UserService,
    private fb: FormBuilder, private toaster: ToastrService) {

      this.getSetting();
    }
  // seletedValue
  ngOnInit(): void {
    // location.reload();
    this.globalSetting = this.fb.group({
      session_min_bet : new FormControl(0,Validators.required),
      session_max_bet : new FormControl(0,Validators.required),
      cricket_odds_commission : new FormControl(0,Validators.required),
      cricket_fancy_commission : new FormControl(0,Validators.required),
      cricket_bookmaker_commission : new FormControl(0,Validators.required),
      soccer_odds_commission : new FormControl(0,Validators.required),
      soccer_fancy_commission: new FormControl(0,Validators.required),
      soccer_bookmaker_commission : new FormControl(0,Validators.required),
      tennis_odds_commission : new FormControl(0,Validators.required),
      tennis_fancy_commission: new FormControl(0,Validators.required),
      tennis_bookmaker_commission : new FormControl(0,Validators.required),
      soccer_min_bet: new FormControl(0,Validators.required),
      tennis_min_bet: new FormControl(0,Validators.required),
      cricket_max_bet : new FormControl(0,Validators.required),
      cricket_min_bet : new FormControl(0,Validators.required),
      soccer_max_bet : new FormControl(0,Validators.required),
      tennis_max_bet : new FormControl(0,Validators.required),
      bookmaker_max_bet  : new FormControl(0,Validators.required),
      cricket_odds_delay : new FormControl(0,Validators.required),
      soccer_odds_delay: new FormControl(0,Validators.required),
      tennis_odds_delay : new FormControl(0,Validators.required),
      cricket_fancy_delay: new FormControl(0,Validators.required),
      soccer_fancy_delay : new FormControl(0,Validators.required),
      tennis_fancy_delay : new FormControl(0,Validators.required),
      casino_delay : new FormControl(0,Validators.required),
      transaction_password : new FormControl(0,Validators.required),
    })
    this.ac.paramMap.subscribe((param)=>{
      this.userIdparms = param.get('id');
    })
    // this.getCurrency()
    // this.getUserBalance
    // console.log(this.useradmininfo ,"useradmininfo")
    this.searchKey.valueChanges.subscribe(value => {
      this.getUserList(Number(this.useradmininfo?.user_id))
    });
    if(this.userIdparms != 'undefined'){
      // alert(history?.state?.id)
      this.getUserList(Number(this.userIdparms))
    }
    else{
    // alert(this.useradmininfo?.user_id)
    // console.log(this.useradmininfo?.user_id,"userid")
    this.getUserList(Number(this.useradmininfo?.user_id))

    }
    this.CreditdebitForm = this.fb.group({

      'amount': new FormControl('', Validators.required),
      'remark': new FormControl(''),
      'master_pass': new FormControl('', Validators.required)

    })
    this.updateExposer = this.fb.group({
      'new_limit': new FormControl('', Validators.required),
      'master_pass': new FormControl('', Validators.required),
      'old_limit': new FormControl('', Validators.required)
    })
    this.changePass = this.fb.group({
      'new_pass': new FormControl('', Validators.required),
      'confirm_pass': new FormControl('', Validators.required),
      'master_pass': new FormControl('', Validators.required)

    })
    this.changeStatus = this.fb.group({
      'user_active': new FormControl('', Validators.required),
      'bet_active': new FormControl('', Validators.required),
      'master_pass': new FormControl('', Validators.required)

    })
  }

  getLibility(value:any){
    let str= value.toString().replace("-","");
    return str;

  }
  /**
   * Get List of user according to the user parent id
   * @param id - Parent Id
   */
  isLoader= false;
  getUserList(id) {
    console.log(history.state, "stae")
    // Number(history?.state?.id)
    this.parent_id=  id;
    let payload = {
      parent_id:   id,
      page: this.page,
      search:this.searchKey.value

    }
    this.isLoader= true;
    this.service.getUserByParentId(payload).subscribe((res) => {
      if (res?.status) {
        this.userList = res?.data;
        if (res?.data?.['data_sum']?.['total_count'] && this.page == 1) {
          this.totalCount = res?.data?.['data_sum']?.['total_count']  ;
          // alert(this.totalCount)
        }
        this.config = {
          currentPage: this.page,
          itemsPerPage: res?.data?.['data_sum']?.['limit'],
          totalItems: this.totalCount
        }
      } else {

      }
    })
  }
  /**
   * Change the password of the child
   */
  changePassword() {
    let payload = {
      id: this.creditDebitInfo?.id,
      new_password: this.changePass.controls['new_pass'].value,
      confirm_password: this.changePass.controls['confirm_pass'].value,
      master_password: this.changePass.controls['master_pass'].value

    }
    this.service.updatePasswored(payload).subscribe((res) => {
      if (res?.status) {
        $('#modal-password').modal('hide')
        alert(res?.message)

        // this.toaster.success(res?.message);

      } else {
        alert(res?.message)

        // this.toaster.error(res?.message);
      }
    })
  }

  /**
   * Chane the Exposer Limit
   */
  updateExposerLimit() {

    if (this.type == 'C') {
      let payload = {
        id: this.creditDebitInfo?.id,
        credit_referance: this.updateExposer.controls['new_limit'].value,
        master_password: this.updateExposer.controls['master_pass'].value

      }
      this.service.updateCreditRef(payload).subscribe((res) => {
        if (res?.status) {
          // this.toaster.success(res?.message);
          alert(res?.message)

          $('#modal-exposure-limit').modal('hide')
          this.updateExposer.reset();
          this.getUserList(this.creditDebitInfo?.parent_id);
        } else {
          alert(res?.message)
          // this.toaster.error(res?.message);
        }
      })
    } else {
      let payload = {
        id: this.creditDebitInfo?.id,
        liability_limit: this.updateExposer.controls['new_limit'].value,
        master_password: this.updateExposer.controls['master_pass'].value

      }
      this.service.updateLimitEx(payload).subscribe((res) => {
        if (res?.status) {
          alert(res?.message)
          // this.toaster.success(res?.message);
          $('#modal-exposure-limit').modal('hide')
          this.updateExposer.reset();
          this.getUserList(this.creditDebitInfo?.parent_id);
        } else {
          // this.toaster.error(res?.message);
          alert(res?.message)


        }
      })

    }

  }

  /**
   * Open Change password dailog box
   * @param data - selected user Data
   *
   */
  changePassDialog(data) {
    this.changePass.reset();
    this.creditDebitInfo = data;
    $('#modal-password').modal('show')

  }

  changeIcon(){
    if(this.flag){
      this.flag = false;
    }else{
      this.flag = true;
    }
  }
  openExposerDialog(name, data) {
    this.updateExposer.reset();
    this.type = name;
    if (name == 'C') {
      this.updateExposer.controls['old_limit'].patchValue(data?.credit_referance)

    } else {
      this.updateExposer.controls['old_limit'].patchValue(data?.liability_limit)
    }
    this.creditDebitInfo = data;

    $('#modal-exposure-limit').modal('show')

  }

  openStatusDailog(data) {
    this.changeStatus.reset();
    this.creditDebitInfo = data;
    this.changeStatus.patchValue({
      'user_active': data?.lock_user == '1' ? false : true,
      'bet_active': data?.lock_betting == '1' ? false : true
    })
    $('#modal-status').modal('show');
  }
  userId:any;
  openSettingDailog(data) {
    this.userId= data.id;
    console.log(data)
    this.getSportList();

    $('#modal-setting').modal('show');
  }
  openGlobalSettingDailog(data) {
    this.userId= data.id;
    console.log(data)
    this.getSportList();
    this.getGlobalSetting()


    $('#modal-global-setting').modal('show');
  }
  getSportList() {
    let payload = {
      user_id: this.userId
    }
    this.matchService.getSprotsForUser(payload).subscribe((res) => {
      if (res.status) {
        this.sportList = res.data;
      }
      else {
        this.toaster.error(res?.message)
      }
    })

  }
  onChange(id,val){

    let payload = {
      user_id :this.userId,
      sport_id:id,
      is_active: val == true? "1":"0"

    }
    this.matchService.updateSprotsForUser(payload).subscribe((res)=>{
      if(res.status){
       this.getSportList();
       this.toaster.success(res?.message)
      }else{
        this.toaster.error(res?.message);
      }
    })
  }

  returnClass(value){
    let numValue= parseInt(value)
    if(numValue>0){
      return 'text-success'
    }
    if(numValue<0){
      return 'text-danger'
    }
    else{
      return ''
    }
    // userList?.data_sum?.sum_profit_loss < 0?'red':'green'
  }
  openDialog(name, data) {
    this.childAmount=undefined;
    this.parentAmount=undefined;

    this.getUserBalance(data)

    this.CreditdebitForm.reset();
    this.creditDebitInfo = data;


    $('#' + name).modal('show');

  }

  /**
   * Get User Balance for the particular user
   * @param data -
   */
  getUserBalance(data) {
    let payload = {
      id: data.parent_id
    }
    this.service.getUserBalance(payload).subscribe((res) => {
      if (res?.status) {
        this.parentInfo = res?.data;


        // console.log(this.parentInfo, "balance")
      } else {

      }
    })
  }

  onAddAmount(type, value:any){
    this.childAmount=  this.creditDebitInfo?.free_chip;
    this.parentAmount=  this.parentInfo?.free_chip;
    console.log(this.parentInfo)
    if(value == ''){
      value=0;
    }
    if(type ==1){
      console.log(this.parentInfo.free_chip,this.creditDebitInfo.free_chip)
      let amount=  parseInt(value);
      this.parentAmount= this.parentInfo?.free_chip - amount;
      this.childAmount= +this.creditDebitInfo?.free_chip + amount
    }else{
      let amount=  parseInt(value);
      this.parentAmount= this.parentInfo?.free_chip + amount;
      this.childAmount= +this.creditDebitInfo?.free_chip - amount
    }

  }

  /**
   * Deposit and Widrol the chips
   * @param cr_dr if cr_dr =1 - deposit cr_dr = 2 - withraw
   */
  chipInOut(cr_dr) {
    this.isDisabledSubmit= true
    if(cr_dr ==1){
      if(this.parentAmount<0 && this.parentInfo.user_type_id != 1){
        alert('Insufficient Credit Limit !')
        return
      }
    }else{
      if(this.childAmount<0){
        alert('Insufficient Credit Limit !')
        return
      }
    }

    if(this.CreditdebitForm.valid){
    let payload = {
      user_id: Number(this.creditDebitInfo?.id),
      description: this.CreditdebitForm.controls['remark'].value,
      amount: this.CreditdebitForm.controls['amount'].value,
      cr_dr: Number(cr_dr),
      master_password: this.CreditdebitForm.controls['master_pass'].value,

    }

    this.service.chipInOut(payload).subscribe((res) => {
      if (res?.status) {
        // this.toaster.success(res?.message);
        this.isDisabledSubmit= false;
        alert(res?.message)

        if (cr_dr == 1) {
          $('#modal-deposit').modal('hide')
        } else {
          $('#modal-withdraw').modal('hide')
        }
        this.getUserList(this.creditDebitInfo?.parent_id);
      } else {
        // this.toaster.error(res?.message);
        alert(res?.message)
        this.isDisabledSubmit= false;


      }
    })
  }else{
    this.isDisabledSubmit= false;
    return;
  }
  }

  /**
   * This method is used for the updating betLock and user Lock
   */
  updateStatus() {
    let payload = {
      user_id: this.creditDebitInfo?.id,
      user_type_id: this.creditDebitInfo?.user_type_id,
      master_password: this.changeStatus.controls['master_pass'].value,
      user_status: this.changeStatus.controls['user_active'].value == true ? '0' : '1',
      bet_status: this.changeStatus.controls['bet_active'].value == true ? '0' : '1'

    }

    this.service.updateUserBetLock(payload).subscribe((res) => {
      if (res?.status) {
        // this.toaster.success(res?.message);
        alert(res?.message)
        $('#modal-status').modal('hide');
        this.getUserList(this.creditDebitInfo?.parent_id)

      } else {
        alert(res?.message)

        // this.toaster.error(res?.message);
      }
    })
  }
  getUserType(id) {
    if (id == 1) {
      return "Tech Admin";
    } else if (id == 2) {
      return "Super Admin"
    } else if (id == 3) {
      return "Admin"
    } else if (id == 4) {
      return "Super Master";
    } else if (id == 5) {
      return "Master";
    } else if (id == 6) {
      return "Agent"
    } else if (id == 7) {
      return "User"
    }
  }



  // getCurrency(){
  //   this.matchService.getCurrency({}).subscribe((res)=>{
  //     if(res?.status){
  //       this.CurrencyList = res?.data;
  //     } else{
  //     }
  //   })
  // }

  // currencyChange(value){
  //   // console.log(value, 'va')
  // }









    /**
   * Generate PDF from JSON Data.
   */
     generatePdf() {
      let payload = {
        parent_id: this.parent_id,
        page: this.page,
        search:this.searchKey.value,
        is_download : 0
      }
    // alert(this.searchKey.value)
      // this.showBackDrop = true;
      const statementObject = Object.assign({}, payload);
      statementObject.is_download = 1;
      // statementObject.search = this.searchKey.value
      // statementObject.search_client =  this.acountGroup.controls.search.value
      this.service.getUserByParentId(statementObject).subscribe(
        res => {
          // alert()
          if (res?.status) {
            console.log(res, "userlist")
            let pdfRec : any
            pdfRec = res['data']['data'];
            // res?.data?['opening']['operator_name'] =''
            if(res?.data?.data_sum && res['data']['data']){
           let opening =   {

                credit_referance: res?.data?.data_sum?.['sum_credit_reference'],
                free_chip: res?.data?.data_sum?.['sum_free_chip'],
                liability:  res?.data?.data_sum?.['sum_liability'] ,
                profit_loss: res?.data?.data_sum?.['sum_profit_loss'],
                total_balance: res?.data?.data_sum?.['sum_total_balance'],
                total_chip: res?.data?.data_sum?.['sum_total_chip'],
                'liability_limit' : ' ',
                'partnership' : ' '
                // (userList?.data_sum?.sum_total_chip - userList?.data_sum?.sum_credit_reference) / currency

              }
            pdfRec.unshift(opening)

            }
            // res?.['data']?.['opening']?.['balance'] = '1500';
            // pdfRec.unshift(res?.data?.['opening'])

            const documentDefinition = {
              content: [{
                text: `Client List Report`,
                alignment: 'center',
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 20]
              }, {
                table: {

                  // fillColor: '#ff0000',
                  // Remove distasteful border
                  // border: [false, false, false, false],
                  // widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                  widths: ["14%", "11%", "10%","8%", "12%","11%","11%","10%", "10%","10%"],
                  body: [
                    // Array for Headers

                    [

                      {
                        text: 'User Name',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }, {
                        text: 'Credit Refernce',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Balance',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Client (P/L)',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Expouser',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Available Balance',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Expouser Limmit',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Default %',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Account type',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }
                      , {
                        text: 'Casino Total',
                        style: 'tableHeader',
                        fillColor: '#555555',

                      }

                    ],
                    // Array for values
                    ...pdfRec.map((el: any) => {
                      return [
                        // // Placed
                        // new Date().toDateString(),
                        el?.user_name ? el?.user_name : '' ,
                        // // credit
                        (el?.credit_referance ) ? (el?.credit_referance ) : '',
                        // // debit
                        (el?.total_chip) ? (el?.total_chip) : '0',
                        // // balance
                        (el?.total_chip - el?.credit_referance) ? ((el?.total_chip - el?.credit_referance)) : ' ',
                        // // Description
                        el?.liability ? el?.liability : '0',
                        //  // from to
                        el?.free_chip ?  el?.free_chip  : '0',

                          // // debit
                          (el?.liability_limit  < 0 || el?.liability_limit  == ' ' ) ?  el?.liability_limit : '0',
                          // // balance
                          el?.partnership ? el?.partnership : '0',
                          // // Description
                           this.getUserType(el?.user_type_id) ? this.getUserType(el?.user_type_id) : '',
                          //  // from to
                         '0.00 '
                      ];
                    })
                  ]
                },
                layout: 'noBorders',

              }]
            };
            // pdfMake.createPdf(documentDefinition).open();
            pdfMake.createPdf(documentDefinition).download('Client List Report');
            // this.showBackDrop = false;
          } else {
            // this.showBackDrop = false;
            this.toaster.error('Some error has occurred!');
          }
        }
      );
    }




  generateCSV() {
    let payload = {
      parent_id: this.parent_id,
      page: this.page,
      search:this.searchKey.value,
      is_download : 0
    }

    const statementObject = Object.assign({}, payload);
    statementObject.is_download = 1;


    this.service.getUserByParentId(statementObject).subscribe(
      (response) => {
        if (response.status) {
          let len = response.data.data.length;
          // pdfRec.unshift(res?.data?.['opening'])
          if( response?.data &&   response?.data['opening'] ){
            response?.data?.data?.unshift(response?.data?.['opening'])
          len =  response.data.data.length;
          }

          if(response?.data?.data_sum && response['data']['data']){
            var opening =   {

           'credit_referance': response?.data?.data_sum?.['sum_credit_reference'],
                 'free_chip': response?.data?.data_sum?.['sum_free_chip'],
                 'liability':  response?.data?.data_sum?.['sum_liability'] ,
                 'profit_loss': <any> response?.data?.data_sum?.['sum_profit_loss'],
                 'total_balance':<any>  response?.data?.data_sum?.['sum_total_balance'],
                 'total_chip':<any>  response?.data?.data_sum?.['sum_total_chip'],
                 'liability_limit' :<any>  ' ',
                 'partnership' :<any>  ' '

               }
            //  pdfRec.unshift(opening)
            //  response?.data?.data?.unshift(opening)
            // response['data']['data'].unshift(opening)

            //  len =  response?.data?.data?.length;

             }


          if (len > 0) {
            const excelAccount = [];
            for (let i = 0; i < len; i++) {
              const obj = {


            'User Name'  :  response?.data?.data[i]?.user_name ? response?.data?.data[i]?.user_name : 'N/A' ,
                // // credit
           'credit_referancev':           (response?.data?.data[i]?.credit_referance )  ? (response?.data?.data[i]?.credit_referance )  : 'N/A',
                // // debit
             'Balance':   (response?.data?.data[i]?.total_chip)  ? (response?.data?.data[i]?.total_chip)  : '0',
                // // balance
             'Clint (P/L)':   (response?.data?.data[i]?.total_chip - response?.data?.data[i]?.credit_referance)  ? ((response?.data?.data[i]?.total_chip - response?.data?.data[i]?.credit_referance)  ) : ' ',
                // // Description
             "Exposure":   response?.data?.data[i]?.liability ? response?.data?.data[i]?.liability : '0',
                //  // from to
             "Available Balance":  ( response?.data?.data[i]?.free_chip )  ? ( response?.data?.data[i]?.free_chip ) : '0',

                  // // debit
               'Exposure Limit':   response?.data?.data[i]?.liability_limit  < 0 ?  response?.data?.data[i]?.liability_limit : '0',
                  // // balance
                'Default %':  response?.data?.data[i]?.partnership ? response?.data?.data[i]?.partnership : '0',
                  // // Description
                  'Account Type': this.getUserType(response?.data?.data[i]?.user_type_id) ? this.getUserType(response?.data?.data[i]?.user_type_id) : 'N/A',
                  //  // from to
                'Casino Total' : '0.00 ',

              };
              excelAccount.push(obj);
            }
            this.excelService.exportAsExcelFile(excelAccount, 'Client List Report');
            // this.showBackDrop = false;
          } else {
            // this.showBackDrop = false;
            this.toaster.error('No record found!');
          }
        } else {
          // this.showBackDrop = false;
          this.toaster.error(response.message);
        }
      }, (error) => {
        // this.showBackDrop = false;
        console.error(error);
      }
    );
  }



  pageChange(page) {
    // this.searchStatementObj.page = page;
    this.page = page
    // this.getUserAccountStatements(this.searchStatementObj);
    // thi()
    this.getUserList(this.parent_id)
  }

  getGlobalSetting(){
    let requestData={
      user_id:this.userId}
    this.matchService.getUserGlobalSetting(requestData).subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
         this.setValues(res?.data)
        this.gloabalData = res?.data

      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }
  getSetting(){
    let requestData={
      user_id:this.userId}
    this.matchService.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
         this.setValues(res?.data)
        this.userSettingData = res?.data

      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }
  setValues(data){
    this.globalSetting.setValue({
      cricket_odds_commission :  parseInt(data?.cricket_odds_commission),
      cricket_fancy_commission :  parseInt(data?.cricket_fancy_commission),
      cricket_bookmaker_commission :  parseInt(data?.cricket_bookmaker_commission),
      soccer_odds_commission :  parseInt(data?.soccer_odds_commission),
      soccer_fancy_commission:  parseInt(data?.soccer_fancy_commission),
      soccer_bookmaker_commission :  parseInt(data?.soccer_bookmaker_commission),
      tennis_odds_commission :  parseInt(data?.tennis_odds_commission),
      tennis_fancy_commission:  parseInt(data?.tennis_fancy_commission),
      tennis_bookmaker_commission :  parseInt(data?.tennis_bookmaker_commission),
      soccer_min_bet: parseInt(data?.soccer_min_bet),
      tennis_min_bet:  parseInt(data?.tennis_min_bet),
      cricket_max_bet : parseInt(data?.cricket_max_bet),
      cricket_min_bet :  parseInt(data?.cricket_min_bet),
      soccer_max_bet :  parseInt(data?.soccer_max_bet),
      tennis_max_bet : parseInt(data?.tennis_max_bet),
      bookmaker_max_bet  : parseInt(data?.bookmaker_max_bet ),
      session_min_bet : parseInt(data?.session_min_bet),
      session_max_bet : parseInt(data?.session_max_bet),
      cricket_odds_delay :  parseInt(data?.cricket_odds_delay),
      soccer_odds_delay:  parseInt(data?.soccer_odds_delay),
      tennis_odds_delay :  parseInt(data?.tennis_odds_delay),
      cricket_fancy_delay:  parseInt(data?.cricket_fancy_delay),
      soccer_fancy_delay :  parseInt(data?.soccer_fancy_delay),
      tennis_fancy_delay :  parseInt(data?.tennis_fancy_delay),
      casino_delay :  parseInt(data?.casino_delay),
      transaction_password :'',

    })

  }

  setGlobalSetting(){
    let requestData={
      user_id:this.userId,
      cricket_odds_commission :  parseInt(this.globalSetting.value.cricket_odds_commission),
      cricket_fancy_commission :  parseInt(this.globalSetting.value.cricket_fancy_commission),
      cricket_bookmaker_commission :  parseInt(this.globalSetting.value.cricket_bookmaker_commission),
      soccer_odds_commission :  parseInt(this.globalSetting.value.soccer_odds_commission),
      soccer_fancy_commission:  parseInt(this.globalSetting.value.soccer_fancy_commission),
      soccer_bookmaker_commission :  parseInt(this.globalSetting.value.soccer_bookmaker_commission),
      tennis_odds_commission :  parseInt(this.globalSetting.value.tennis_odds_commission),
      tennis_fancy_commission:  parseInt(this.globalSetting.value.tennis_fancy_commission),
      tennis_bookmaker_commission :  parseInt(this.globalSetting.value.tennis_bookmaker_commission),
      soccer_min_bet: parseInt(this.globalSetting.value.soccer_min_bet),
      tennis_min_bet:  parseInt(this.globalSetting.value.tennis_min_bet),
      cricket_max_bet : parseInt(this.globalSetting.value.cricket_max_bet),
      cricket_min_bet :  parseInt(this.globalSetting.value.cricket_min_bet),
      soccer_max_bet :  parseInt(this.globalSetting.value.soccer_max_bet),
      tennis_max_bet : parseInt(this.globalSetting.value.tennis_max_bet),
      bookmaker_max_bet  : parseInt(this.globalSetting.value.bookmaker_max_bet ),
      session_min_bet : parseInt(this.globalSetting.value.session_min_bet),
      session_max_bet : parseInt(this.globalSetting.value.session_max_bet),
      cricket_odds_delay :  parseInt(this.globalSetting.value.cricket_odds_delay),
      soccer_odds_delay:  parseInt(this.globalSetting.value.soccer_odds_delay),
      tennis_odds_delay :  parseInt(this.globalSetting.value.tennis_odds_delay),
      cricket_fancy_delay:  parseInt(this.globalSetting.value.cricket_fancy_delay),
      soccer_fancy_delay :  parseInt(this.globalSetting.value.soccer_fancy_delay),
      tennis_fancy_delay :  parseInt(this.globalSetting.value.tennis_fancy_delay),
      casino_delay :  parseInt(this.globalSetting.value.casino_delay),
      transaction_password :this.globalSetting.value.transaction_password,
    }
    console.log(requestData,'requestData')
    this.matchService.updateUserGlobalSetting(requestData).subscribe((res)=>{
      if(res?.status){
        $('#modal-global-setting').modal('hide');
        this.toaster.success(res?.message)
      }else{
        $('#modal-global-setting').modal('hide');
        this.toaster.error(res?.message)
      }
    })
  }
}
