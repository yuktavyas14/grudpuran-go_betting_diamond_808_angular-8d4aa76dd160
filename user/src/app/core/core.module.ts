
import { NgModule } from '@angular/core';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthGuard } from  './guards/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
]
})
export class CoreModule { }
