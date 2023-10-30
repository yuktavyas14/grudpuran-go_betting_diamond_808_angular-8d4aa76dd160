import { PaymentDepositListComponent } from './pages/payment-deposit-list/payment-deposit-list.component';
import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ListOfClientsComponent } from './pages/list-of-clients/list-of-clients.component';
import { ElectionsComponent } from './pages/elections/elections.component';
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
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { MarketsSettingComponent } from './pages/markets-setting/markets-setting.component';
import { MatchSettingComponent } from './pages/match-setting/match-setting.component';
import { ManageSeriesComponent } from './pages/manage-series/manage-series.component';
import { MarketRollbackComponent } from './pages/market-rollback/market-rollback.component';
import { OnlineMatchesComponent } from './pages/online-matches/online-matches.component';
import { IndianfancyComponent } from './pages/indianfancy/indianfancy.component';
import { SportsSettingComponent } from './pages/sports-setting/sports-setting.component';
import { BetfairmarketComponent } from './pages/betfairmarket/betfairmarket.component';
import { OnlineUserComponent } from './pages/online-user/online-user.component';
import { GlobalSettingsComponent } from './pages/global-settings/global-settings.component';
import { SeriesSettingComponent } from './pages/series-setting/series-setting.component';
import { CommissionSettingComponent } from './pages/commission-setting/commission-setting.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FancylistComponent } from './pages/fancylist/fancylist.component';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { CasinoSettingComponent } from './pages/casino-setting/casino-setting.component';
import { GgrReportComponent } from './pages/ggr-report/ggr-report.component';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
import { WithdrawStatementComponent } from './pages/withdraw-statement/withdraw-statement.component';
import { UserLoginHistoryComponent } from './pages/user-login-history/user-login-history.component';
import { DeletedBetHistoryComponent } from './pages/deleted-bet-history/deleted-bet-history.component';
import { ExposurDetailsComponent } from './pages/exposur-details/exposur-details.component';
import { AddBonusComponent } from './pages/bonus/add-bonus/add-bonus.component';
import { AddAffiliateComponent } from './pages/bonus/add-affiliate/add-affiliate.component';
import { BonusHistoryComponent } from './pages/bonus/bonus-history/bonus-history.component';
import { AffiliatedCommissionComponent } from './pages/bonus/affiliated-commission/affiliated-commission.component';
import { AffiliatecodeComponent } from './pages/bonus/affiliatecode/affiliatecode.component';
import { AffiliateHistoryComponent } from './pages/bonus/affiliate-history/affiliate-history.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting.component';

export const mainRouting: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'marketAnalysis',
        pathMatch: 'full',
        canActivate: [AuthGuard]

      },
      {
        path: 'marketAnalysis',
        component: MarketAnalysisComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listOfclients/:id',
        component: ListOfClientsComponent
      },
      {
        path: 'currency-setting',
        component: CommissionSettingComponent
      },
      {
        path : 'user-list',
        component : UserListComponent
      },
      {
        path : 'security-auth',
        component : SecurityAuthComponent
      },
      {
        path: 'ggr-report',
        component: GgrReportComponent
      },
      {
        path: 'account-setting',
        component: AccountSettingComponent
      },
      {
        path: 'deposit-history',
        component: PaymentDepositListComponent
      },
      {
        path: 'elections',
        component: ElectionsComponent
      }, {
        path: 'create-user/:parent_id',
        component: CreateUserComponent
      },
      {
        path: 'fancy-setting',
        component: FancylistComponent
      },

      {
        path: 'account-statement',
        component: AccountStatementComponent
      },
      {
        path: 'withdraw-statement',
        component: WithdrawStatementComponent
      },
      {
        path: 'current-bets',
        component: CurrentBetsComponent
      },
      {
        path: 'general-report',
        component: GeneralReportComponent
      },
      {
        path: 'big-bash-league',
        component: BigBashLeagueComponent
      },
      {
        path: 'three-cards-judgement',
        component: ThreeCardsJudgementComponent
      }, {
        path: 'binary',
        component: BinaryComponent
      },
      {
        path: 'worli',
        component: WorliComponent
      },
      {
        path: 'live-game/:seriesId/:seriesName',
        component: WorliComponent
      },
      {
        path: 'game-report',
        component: GameReportComponent
      },
      {
        path:'casino-report',
        component:CasinoReportComponent
      },
      {
        path:'profit-loss',
        component:ProfitLossComponent
      },
      // {
      //   path:'casino-result-report',
      //   component:CasinoResultReportComponent
      // },

      {
        path:'casino-result-report',
        component:CasinoResultComponent
      },



      {
        path:'changePassword',
        component:ChangePasswordComponent
      },
      {
        path:'matchdetails/:matchId/:marketId',
        component:MatchDetailsComponent
      },
      {
        path:'matchdetails/:matchId',
        component:MatchDetailsComponent
      },
      {
        path:'markets',
        component:MarketsComponent
      },
      {
        path:'marketSetting',
        component:MarketsSettingComponent
      },
      {
        path:'matchSetting',
        component:MatchSettingComponent
      }
      ,
      {
        path:'manageSeries',
        component:ManageSeriesComponent
      },
      {
        path:'marketRollback',
        component:MarketRollbackComponent
      },
      {
        path:'online-matches/:sportId/:seriesId',
        component:OnlineMatchesComponent
      },
      {
        path:'indianfancy/:sportId/:seriesId/:matchId',
        component:IndianfancyComponent
      },
      {
        path:'sportSetting',
        component:SportsSettingComponent
      },

      {
        path : 'casinoSetting',
        component: CasinoSettingComponent
      },
      {
        path: 'betfairmarket/:sportId/:seriesId/:matchId',
        component: BetfairmarketComponent
      },
      {
        path:'online-user',
        component: OnlineUserComponent
      },
      {
        path:'global-settings',
        component:GlobalSettingsComponent
      },
      {
        path:'seriesSetting',
        component:SeriesSettingComponent
      },
      {
        path:'delete-bet-history',
        component:DeletedBetHistoryComponent
      },
      {
        path:'user-login-history',
        component:UserLoginHistoryComponent
      },
      {
        path:'exposur-details',
        component:ExposurDetailsComponent
      },
      {
        path: 'add-bonus',
        component : AddBonusComponent
      },
      {
        path: 'add-affiliate',
        component : AddAffiliateComponent
      },
      {
        path: 'bouns-history',
        component : BonusHistoryComponent
      },
      
      {
        path: 'affiliate-code',
        component : AffiliatecodeComponent
      },
      {
        path: 'bonus-history/:code',
        component : AffiliatedCommissionComponent
      },
      {
        path: 'affiliate-history/:code',
        component : AffiliateHistoryComponent
      },
      {
        path: 'exposure-detail',
        component : ExposurDetailsComponent
      }
    ]
  }
]
