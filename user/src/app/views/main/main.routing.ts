import { Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { AccountStatementComponent } from './pages/account-statement/account-statement.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { UnsettledbetComponent } from './pages/unsettledbet/unsettledbet.component';
import { ChangeButtonvalueComponent } from './pages/change-buttonvalue/change-buttonvalue.component';
import { InPlayComponent } from './pages/in-play/in-play.component';
import { CasinoGamesComponent } from './pages/casino-games/casino-games.component';
import { CasionResultComponent } from './pages/casion-result/casion-result.component';
import { CasinoMatchDetailsComponent } from './pages/casino-match-details/casino-match-details.component';
import { RacingDetailsComponent } from './pages/racing-details/racing-details.component';
import { LiveCasinoComponent } from './pages/live-casino/live-casino.component';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { DreamcasinoComponent } from './pages/dreamcasino/dreamcasino.component';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
import { DreamcasinogamesComponent } from './pages/dreamcasinogames/dreamcasinogames.component';
import { PaymentStatementComponent } from './pages/payment-statement/payment-statement.component';
import { CupDetailsComponent } from './pages/cup-details/cup-details.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { ExposureDetailComponent } from './pages/exposure-detail/exposure-detail.component';
import { BrinoCasinoComponent } from './pages/brino-casino/brino-casino.component';
import { NewBrinoComponent } from './pages/new-brino/new-brino.component';

export const mainRouting : Routes =[
{

  path:'',
  component:DashboardComponent,
  canActivate:[AuthGuard],
  children:[
    {
      path:'',
      redirectTo:'dashboard',
      pathMatch:'full'
    },
    {
      path:'dashboard',
      component:HomeComponent

    },
    {
      path:'bet-history',
      component:BetHistoryComponent
    },
    {
      path:'account-statement',
      component:AccountStatementComponent
    },
    {
      path:'payment-statement',
      component:PaymentStatementComponent
    },
    {
      path:'change-password',
      component:ChangePasswordComponent
    },
    {
      path:'profit-loss',
      component:ProfitLossComponent
    },
    {
      path:'security-auth',
      component:SecurityAuthComponent
    },
    {
      path:'matchdetails/:matchId',
      component:MatchDetailsComponent
    },
    {
      path:'matchdetail/:matchId',
      component:CasinoMatchDetailsComponent
    },
    {
      path:'matchdetails/:matchId/:marketId',
      component:MatchDetailsComponent
    },
    {
      path:'cupdetails/:matchId/:marketId',
      component:CupDetailsComponent
    },
    {
      path:'racingdetails/:matchId/:slotDateTime',
      component:RacingDetailsComponent
    },
    {
      path:'unsettledbet',
      component:UnsettledbetComponent
    },
    {
      path:'update-value',
      component:ChangeButtonvalueComponent
    },
    {
      path:'inplay/:sportId/:name',
      component:InPlayComponent
    },
    {
      path:'casino/:seriesId/:name',
      component:CasinoGamesComponent
    },
    {
      path: 'casinoresult/:id',
      component:CasionResultComponent
    },

    {
      path: 'game/casino/:id',
      component:LiveCasinoComponent
    },
    {
      path: 'brinogame/casino/:id',
      component:BrinoCasinoComponent
    }, 
    {
      path: 'newbrinogame/casino/newbrino',
      component:NewBrinoComponent
    },  
    {
      path : 'casino-bets',
      component : CasinoResultComponent
    },

    {
      path : 'game/dreamcasino',
      component : DreamcasinoComponent
    },

    {
      path:'games/gamesdream/:category',
      component:DreamcasinogamesComponent
    },

    {
      path:'games/gamesdream/:product/:category',
      component:DreamcasinogamesComponent
    },
    {
      path:'crypto-payment',
      component:CryptoPaymentComponent
    },
    {
      path:'exposure-details',
      component:ExposureDetailComponent
    },

  ]
}
]
