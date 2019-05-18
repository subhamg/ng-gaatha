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

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'creators', component: CreatorsComponent },
  { path: 'narrators', component: NarratorsComponent},
  { path: 'productions', component: ProductionsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
