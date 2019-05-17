import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material.module';

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
    CreateContentComponent
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
