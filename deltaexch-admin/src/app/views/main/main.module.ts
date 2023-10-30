import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { mainRouting } from './main.routing';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { ListOfClientsComponent } from './pages/list-of-clients/list-of-clients.component';
import { ElectionsComponent } from './pages/elections/elections.component';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

import { UiSwitchModule } from 'ngx-toggle-switch';

import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AccountStatementComponent } from './pages/account-statement/account-statement.component';
import { CurrentBetsComponent } from './pages/current-bets/current-bets.component';
import { GeneralReportComponent } from './pages/general-report/general-report.component';
import { BigBashLeagueComponent } from './pages/big-bash-league/big-bash-league.component';
import { ThreeCardsJudgementComponent } from './pages/three-cards-judgement/three-cards-judgement.component';
import { BinaryComponent } from './pages/binary/binary.component';
import { WorliComponent } from './pages/worli/worli.component';
import { GameReportComponent } from './pages/game-report/game-report.component';
import { CasinoReportComponent } from './pages/casino-report/casino-report.component';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { CasinoResultReportComponent } from './pages/casino-result-report/casino-result-report.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import  {MatProgressBarModule } from '@angular/material/progress-bar'

import {MatTreeModule} from '@angular/material/tree'
import { from } from 'rxjs';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { MarketsSettingComponent } from './pages/markets-setting/markets-setting.component';
import { MatchSettingComponent } from './pages/match-setting/match-setting.component';
import { ManageSeriesComponent } from './pages/manage-series/manage-series.component';
import { MarketRollbackComponent } from './pages/market-rollback/market-rollback.component';
import { SportsSettingComponent } from './pages/sports-setting/sports-setting.component';

import { OnlineMatchesComponent } from './pages/online-matches/online-matches.component';
import { FormatDatePipe } from 'src/app/core/pipe/dateformat.pipe';
import { IndianfancyComponent } from './pages/indianfancy/indianfancy.component';
import { BetfairmarketComponent } from './pages/betfairmarket/betfairmarket.component';
import { OnlineUserComponent } from './pages/online-user/online-user.component';
import { GlobalSettingsComponent } from './pages/global-settings/global-settings.component';
import { SeriesSettingComponent } from './pages/series-setting/series-setting.component';
import { MenuComponent } from './partials/menu/menu.component';
// import { NgSelect2Module } from 'ng-select2';

import { environment } from 'src/environments/environment';
import { CommissionSettingComponent } from './pages/commission-setting/commission-setting.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FancylistComponent } from './pages/fancylist/fancylist.component';
import { FormatdatePipe } from 'src/app/pipe/formatdate.pipe';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { CasinoSettingComponent } from './pages/casino-setting/casino-setting.component';
import { GgrReportComponent } from './pages/ggr-report/ggr-report.component';
// import { NgOtpInputModule } from 'ng-otp-input';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
import { WithdrawStatementComponent } from './pages/withdraw-statement/withdraw-statement.component';
import { UserLoginHistoryComponent } from './pages/user-login-history/user-login-history.component';
import { DeletedBetHistoryComponent } from './pages/deleted-bet-history/deleted-bet-history.component';
import { ExposurDetailsComponent } from './pages/exposur-details/exposur-details.component';
import { BonusHistoryComponent } from './pages/bonus/bonus-history/bonus-history.component';
import { AffiliatedCommissionComponent } from './pages/bonus/affiliated-commission/affiliated-commission.component';
import { AffiliatecodeComponent } from './pages/bonus/affiliatecode/affiliatecode.component';
import { AffiliateHistoryComponent } from './pages/bonus/affiliate-history/affiliate-history.component';
import { AddBonusComponent } from './pages/bonus/add-bonus/add-bonus.component';
import { AddAffiliateComponent } from './pages/bonus/add-affiliate/add-affiliate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';
import { PaymentDepositListComponent } from './pages/payment-deposit-list/payment-deposit-list.component';
// import { NgOtpInputModule } from 'ng-otp-input';
// import { MatchService } from 'src/app/core/services/match.service';
// import { UserService } from 'src/app/core/services/user.service';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


@NgModule({
  declarations: [DashboardComponent, MarketAnalysisComponent,
    FooterComponent,
    HeaderComponent,
    ListOfClientsComponent,
    ElectionsComponent,
    CreateUserComponent,
    AccountStatementComponent,
    CurrentBetsComponent,
    GeneralReportComponent,
    BigBashLeagueComponent,
    ThreeCardsJudgementComponent,
    BinaryComponent,
    WorliComponent,
    GameReportComponent,
    CasinoReportComponent,
    ProfitLossComponent,
    CasinoResultReportComponent,
    ChangePasswordComponent,
    MatchDetailsComponent,
    MarketsComponent,
    MarketsSettingComponent,
    MatchSettingComponent,
    ManageSeriesComponent,
    MarketRollbackComponent,
    SportsSettingComponent,
    OnlineMatchesComponent,
    FormatDatePipe,
    IndianfancyComponent,
    BetfairmarketComponent,
    OnlineUserComponent,
    GlobalSettingsComponent,
    SeriesSettingComponent,
    MenuComponent,
    CommissionSettingComponent,
    UserListComponent,
    FancylistComponent,
    FormatdatePipe,
    CasinoResultComponent,
    CasinoSettingComponent,
    GgrReportComponent,
    SecurityAuthComponent,
    WithdrawStatementComponent,
    UserLoginHistoryComponent,
    DeletedBetHistoryComponent,
    ExposurDetailsComponent,
    BonusHistoryComponent,
    AffiliatedCommissionComponent,
    AffiliatecodeComponent,
    AffiliateHistoryComponent,
    AddBonusComponent,
    AddAffiliateComponent,
    AccountSettingComponent,
    PaymentDepositListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    UiSwitchModule,
    MatIconModule,
    MatProgressBarModule,
    MatTreeModule,
    // NgOtpInputModule,
    // SocketIoModule.forRoot(config) ,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(mainRouting),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxPaginationModule,
    // NgSelect2Module
    ],
  providers: [DatePipe ]

})
export class MainModule { }
