import { Component, OnInit } from '@angular/core';

export interface Roles {
  id: number;
  role: string;
}

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  roles: Roles[] = [
    { id: 1, role: 'Creator' },
    { id: 2, role: 'Narrator' },
    { id: 3, role: 'Production'}
]


  constructor() { }

  ngOnInit() {
  }

}
