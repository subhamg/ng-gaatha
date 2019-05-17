import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit {

  // dataSource;
 
  username: string = 'Subham Goyal';

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'more', sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
   }

  ngOnInit() {
  }

}
