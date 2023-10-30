import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './view/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/guards/auth.guard';
import { CoreModule } from './core/core.module';
import { MatrialModule } from './matrial/matrial.module';
 
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatrialModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
