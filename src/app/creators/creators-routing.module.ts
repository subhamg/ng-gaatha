import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreatorComponent } from './creator/creator.component';
import { NarratorComponent } from './narrator/narrator.component';
import { ProductionComponent } from './production/production.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'content', component: CreatorComponent },
  { path: 'narrators', component: NarratorComponent },
  { path: 'productions', component: ProductionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorsRoutingModule { }
