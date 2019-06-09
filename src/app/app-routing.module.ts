import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatorsComponent } from './creators/creators.component';
import { AdminComponent } from './admin/admin.component';
import { NarratorsComponent } from './narrators/narrators.component';
import { ProductionComponent } from './creators/production/production.component';
import { CreatorComponent } from './creators/creator/creator.component';
import { UsersComponent } from './creators/users/users.component';
import { NarratorComponent } from './creators/narrator/narrator.component';
import { ProductionsComponent } from './productions/productions.component';
import { CreateContentComponent } from './creators/create-content/create-content.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'creators', redirectTo: '/creators/users', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  {
    path: 'creators',
    component: CreatorsComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'narrator', component: NarratorComponent },
      { path: 'production', component: ProductionComponent },
      { path: 'content', component: CreatorComponent },
      {
        path: 'create',
        component: CreateContentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:itemId',
        component: CreateContentComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'narrators', component: NarratorsComponent },
  { path: 'productions', component: ProductionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
