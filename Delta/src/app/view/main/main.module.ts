import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SportsComponent } from './pages/sports/sports.component';
import { MatchService } from 'src/app/core/services/match.service';
import { InPlayComponent } from './pages/in-play/in-play.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultUrlSerializer } from '@angular/router';
import { AccountStatementComponent } from './pages/account-statement/account-statement.component';
import { BsDatepickerModule , DatepickerModule} from 'ngx-bootstrap/datepicker';
import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { RulesComponent } from './pages/rules/rules.component';
import { MatchDetailComponent } from './pages/match-detail/match-detail.component';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { UnsettledbetComponent } from './pages/unsettledbet/unsettledbet.component';
import { SetButtonvalComponent } from './pages/set-buttonval/set-buttonval.component'; // <-- import the module
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShortNumberPipe } from '../../core/pipes/short-number.pipe';
import { LiveCasinoComponent } from './pages/live-casino/live-casino.component';
import { FormatDatePipe } from '../../core/pipes/format-date.pipe';
import { CasinoGamesComponent } from './pages/casino-games/casino-games.component';
import { CasinoslotComponent } from './pages/casinoslot/casinoslot.component';
import { CasinoMatchDetailsComponent } from './pages/casino-match-details/casino-match-details.component';
import { FormatdatePipe } from 'src/app/pipe/formatdate.pipe';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { RacingDetailsComponent } from './pages/racing-details/racing-details.component';
import { AndarBaharResultComponent } from './models/andar-bahar-result/andar-bahar-result.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CupMenuListComponent } from './partials/cup-menu-list/cup-menu-list.component';
import { GameTypeListComponent } from './partials/game-type-list/game-type-list.component';
import { LiveCasionSlotComponent } from './pages/live-casion-slot/live-casion-slot.component';
import { CasinoGamePlayComponent } from './pages/casino-game-play/casino-game-play.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CasinoWarComponent } from './pages/casino-war/casino-war.component';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
import { DreamcasinogamesComponent } from './pages/dreamcasinogames/dreamcasinogames.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NextDirective } from './directives/next.directive';
import { PerviousDirective } from './directives/pervious.directive';
import { OtherCasionComponent } from './pages/other-casion/other-casion.component';
import { OtherCasionSlotComponent } from './pages/other-casion-slot/other-casion-slot.component';
import { CasionResultBetComponent } from './pages/casion-result-bet/casion-result-bet.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PaymentStatementComponent } from './pages/payment-statement/payment-statement.component';
import { CupDetailsComponent } from './pages/cup-details/cup-details.component';
import { NgxLoadingModule } from 'ngx-loading';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { MatrialModule } from 'src/app/matrial/matrial.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    ShortNumberPipe,
    FooterComponent,
    HomeComponent,
    SportsComponent,
    InPlayComponent,
    ChangePasswordComponent,
    AccountStatementComponent,
    BetHistoryComponent,
    ProfitLossComponent,
    RulesComponent,
    MatchDetailComponent,
    CasinoResultComponent,
    UnsettledbetComponent,
    SetButtonvalComponent,
    LiveCasinoComponent,
    CasinoGamesComponent,
    CasinoslotComponent,
    CasinoMatchDetailsComponent,
    FormatdatePipe,
    RacingDetailsComponent,
    AndarBaharResultComponent,
    CupMenuListComponent,
    GameTypeListComponent,
    LiveCasionSlotComponent,
    CasinoGamePlayComponent,
    PieChartComponent,
    CasinoWarComponent,
    SecurityAuthComponent,
    DreamcasinogamesComponent,
    NextDirective,
    PerviousDirective,
    OtherCasionComponent,
    OtherCasionSlotComponent,
    CasionResultBetComponent,
    NumberOnlyDirective,
    PaymentStatementComponent,
    CupDetailsComponent,
    CryptoPaymentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxSpinnerModule,
    NgxLoadingModule,
    MainRoutingModule,
    NgxFlagIconCssModule,
    MatDialogModule,
    ChartsModule,
    SlickCarouselModule,
    MatrialModule
    

  ],
  providers: [AuthGuard, MatchService, DefaultUrlSerializer , FormatDatePipe]
})
export class MainModule { }
