import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { mainRouting } from './main.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { BetHistoryComponent } from './pages/bet-history/bet-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountStatementComponent } from './pages/account-statement/account-statement.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfitLossComponent } from './pages/profit-loss/profit-loss.component';
import { MatchDetailsComponent } from './pages/match-details/match-details.component';
import { UnsettledbetComponent } from './pages/unsettledbet/unsettledbet.component';
import { ChangeButtonvalueComponent } from './pages/change-buttonvalue/change-buttonvalue.component';
import { InPlayComponent } from './pages/in-play/in-play.component';
import { CasinoGamesComponent } from './pages/casino-games/casino-games.component';
import { CasionResultComponent } from './pages/casion-result/casion-result.component';
import { ShortNumberPipe } from "src/app/core/pipes/short-number.pipe";

import { CookieService } from 'ngx-cookie-service';
import { CasinoMatchDetailsComponent } from './pages/casino-match-details/casino-match-details.component';
import { NgxFlagIconCssModule } from "ngx-flag-icon-css";
import { FormatdatePipe } from "src/app/formatdate.pipe";
import { RacingDetailsComponent } from './pages/racing-details/racing-details.component';
import { LiveCasinoComponent } from './pages/live-casino/live-casino.component';
import { CasinoResultComponent } from './pages/casino-result/casino-result.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartsModule } from "ng2-charts";
import { DreamcasinoComponent } from './pages/dreamcasino/dreamcasino.component';
import { SecurityAuthComponent } from './pages/security-auth/security-auth.component';
// import { NgOtpInputModule } from "ng-otp-input";
import { DreamcasinogamesComponent } from './pages/dreamcasinogames/dreamcasinogames.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PaymentStatementComponent } from './pages/payment-statement/payment-statement.component';
import { CupDetailsComponent } from './pages/cup-details/cup-details.component';
import { CryptoPaymentComponent } from './pages/crypto-payment/crypto-payment.component';
import { ExposureDetailComponent } from './pages/exposure-detail/exposure-detail.component';
import { RulesComponent } from './pages/Modal/rules/rules.component';
import { ResultsComponent } from './pages/Modal/results/results.component';
import { BookmarkerComponent } from './pages/Modal/bookmarker/bookmarker.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NextDirective } from './directives/next.directive';
import { PerviousDirective } from './directives/pervious.directive';
import { BrinoCasinoComponent } from './pages/brino-casino/brino-casino.component';
import { NewBrinoComponent } from './pages/new-brino/new-brino.component';

@NgModule({
  providers:[CookieService],
  imports:[
    RouterModule.forChild(mainRouting),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    NgxFlagIconCssModule,
    ChartsModule,
    // NgOtpInputModule,
    MatDialogModule,

  ],
 
  declarations:[ShortNumberPipe,DashboardComponent, HomeComponent,HeaderComponent,FooterComponent,SidebarComponent, BetHistoryComponent, AccountStatementComponent, ChangePasswordComponent, ProfitLossComponent, MatchDetailsComponent, UnsettledbetComponent, ChangeButtonvalueComponent, InPlayComponent, CasinoGamesComponent, CasionResultComponent, CasinoMatchDetailsComponent,FormatdatePipe, RacingDetailsComponent, LiveCasinoComponent, CasinoResultComponent, PieChartComponent, DreamcasinoComponent, DreamcasinogamesComponent,SecurityAuthComponent, NumberOnlyDirective, PaymentStatementComponent, CupDetailsComponent, CryptoPaymentComponent, ExposureDetailComponent, RulesComponent, ResultsComponent, BookmarkerComponent, NextDirective, PerviousDirective, BrinoCasinoComponent, NewBrinoComponent],
})
export class MainModule{

}
