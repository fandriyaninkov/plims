import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { NgxsModule } from '@ngxs/store';
import { ToolbarState } from './core/store/toolbar.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { API_BASE_URL } from './core/nswag/plims-generated';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlimsHttpInterceptor } from './core/http-interceptors/plims-http-iterceptor';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './core/services/notification.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ToolbarComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ToolbarModule,
    TooltipModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([ToolbarState])
  ],
  providers: [
    NotificationService,
    {
      provide: API_BASE_URL,
      useValue: environment.apiPath
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PlimsHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
