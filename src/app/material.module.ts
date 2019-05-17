import { NgModule } from '@angular/core';
import { MatCardModule, 
    MatProgressSpinnerModule, 
    MatMenuModule, MatIconModule, 
    MatToolbarModule, MatButtonModule, 
    MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatSortModule, 
    MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class MaterialModule { }
