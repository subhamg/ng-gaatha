import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export interface Roles {
  id: number;
  role: string;
}

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  roles: Roles[] = [
    { id: 1, role: 'Creator' },
    { id: 2, role: 'Narrator' },
    { id: 3, role: 'Production'}
]

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'add', sanitizer.bypassSecurityTrustResourceUrl('assets/img/add.svg')
    );
  }

  ngOnInit() {
  }

}
