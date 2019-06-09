import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatorsComponent } from './creators/creators.component';
import { NarratorComponent } from './creators/narrator/narrator.component';
import { ProductionComponent } from './creators/production/production.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './creators/users/users.component';
import { CreatorComponent } from './creators/creator/creator.component';
import { NarratorsComponent } from './narrators/narrators.component';
import { ProductionsComponent } from './productions/productions.component';
import { HeaderComponent } from './header/header.component';
import { CreateTeamComponent } from './creators/create-team/create-team.component';
import { CreateContentComponent } from './creators/create-content/create-content.component';
import { ItemsService } from './shared/items.service';
import { EditItemComponent } from './creators/edit-item/edit-item.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreatorsComponent,
    NarratorComponent,
    ProductionComponent,
    AdminComponent,
    UsersComponent,
    CreatorComponent,
    NarratorsComponent,
    ProductionsComponent,
    HeaderComponent,
    CreateTeamComponent,
    CreateContentComponent,
    EditItemComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule.forRoot()
  ],
  providers: [
    ItemsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
