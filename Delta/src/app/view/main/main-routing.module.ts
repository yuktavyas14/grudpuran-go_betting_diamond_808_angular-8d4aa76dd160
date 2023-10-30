import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountStatementComponent } from './pages/account-statement/account-statement.component';
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { CasinoGamePlayComponent } from './pages/casino-game-play/casino-game-play.component';
import { CasinoGamesComponent } from './pages/casino-games/casino-games.component';
import { CasinoMatchDetailsComponent } from './pages/casino-match-details/casino-match-details.component';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { CasinoWarComponent } from './pages/casino-war/casino-war.component';
import { CasinoslotComponent } from './pages/casinoslot/casinoslot.component';
import { CasionResultBetComponent } from './pages/casion-result-bet/casion-result-bet.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { CupDetailsComponent } from './pages/cup-details/cup-details.component';
import { DreamcasinogamesComponent } from './pages/dreamcasinogames/dreamcasinogames.component';
import { HomeComponent } from './pages/home/home.component';
import { InPlayComponent } from './pages/in-play/in-play.component';
import { MatchDetailComponent } from './pages/match-detail/match-detail.component';
import { OtherCasionComponent } from './pages/other-casion/other-casion.component';
import { PaymentStatementComponent } from './pages/payment-statement/payment-statement.component';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { RacingDetailsComponent } from './pages/racing-details/racing-details.component';
import { RulesComponent } from './pages/rules/rules.component';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
import { SetButtonvalComponent } from './pages/set-buttonval/set-buttonval.component';
import { UnsettledbetComponent } from './pages/unsettledbet/unsettledbet.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'',
        redirectTo:'inPlay',
        pathMatch:'full'
      },
      {
        path:'inPlay',
        component:HomeComponent

      },
      {
        path:'inplay/:sportId/:name',
        component:InPlayComponent
      },
      {
        path:'chage-password',
        component:ChangePasswordComponent

      },

      {
        path: 'account-statement',
        component: AccountStatementComponent
      },
      {
        path: 'payment-statement',
        component: PaymentStatementComponent
      },
      {
        path: 'security-auth',
        component: SecurityAuthComponent
      },

      {
        path : 'bet-history',
        component: BetHistoryComponent
      },
      {
        path : 'profit-loss',
        component: ProfitLossComponent
      },
      {
        path : 'rules',
        component: RulesComponent
      },
      {
        path:'unsettledbet',
        component:UnsettledbetComponent
      },
      {
        path:'casino-result',
        component: CasinoResultComponent
      },
      {
        path:'casino-result/:id',
        component: CasinoResultComponent
      },

      {
        path: 'set-buttonval',
        component : SetButtonvalComponent
      },
      {
        path : 'matchdetails/:matchId/:marketId',
        component : MatchDetailComponent
      },
      {
        path : 'cupdetails/:matchId',
        component : CupDetailsComponent
      },
      {
        path : 'casino-war/:matchId/:marketId',
        component : CasinoWarComponent
      },
      {
        path : 'casino-war/:matchId',
        component : CasinoWarComponent
      },
      {
        path : 'racingdetails/:matchId/:slotDateTime',
        component : RacingDetailsComponent
      },
      {
        path : 'matchdetails/:matchId',
        component : MatchDetailComponent
      },
      {
        path : 'matchdetail/:matchId',
        component : CasinoMatchDetailsComponent
      },
      {
        path : 'sports',
        component: InPlayComponent
      },
      {
        path : 'casino-slot',
        component: CasinoslotComponent
      },
      {
        path : 'casino-bets',
        component: CasionResultBetComponent
      },
      {
        path : 'other-casino',
        component: OtherCasionComponent
      },
      {
        path : 'crypto-payment',
        component: CryptoPaymentComponent
      },
      {
        path:'casino/:seriesId/:name',
        component:CasinoGamesComponent
      },
      {
        path : 'game/:id',

        component : CasinoGamePlayComponent
      },
      {
        path:'games/gamesdream/:category',
        component:DreamcasinogamesComponent
      },

      {
        path:'games/gamesdream/:product/:category',
        component:DreamcasinogamesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
