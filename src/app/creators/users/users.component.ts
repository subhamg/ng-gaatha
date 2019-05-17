import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export interface Users {
  imgUrl: string;
  name: string;
  email: string;
  type: string;
  status: string;
}

const ELEMENT_DATA: Users[] = [
  {imgUrl: 'assets/img/got/avartar1.jpg', name: 'Mike Bhand', email: 'mikebhand@email.com', type: 'Creator', status: 'Pending'},
  {imgUrl: 'assets/img/got/avartar2.jpg', name: 'Jon Snow', email: 'jonsnow@email.com', type: 'Creator', status: 'Approved'},
  {imgUrl: 'assets/img/got/avartar3.jpg ', name: 'Daenerys Targaryen', email: 'danny@email.com', type: 'Narrator', status: 'Approved'},
  {imgUrl: 'assets/img/got/avartar4.jpg', name: 'Bran Strak', email: 'branstark@email.com', type: 'Production', status: 'Approved'},
  {imgUrl: 'assets/img/got/avartar5.jpg', name: 'Cersie Lannister', email: 'cersie@email.com', type: 'Narrator', status: 'Reject'},
  {imgUrl: 'assets/img/got/avartar6.jpg', name: 'Grey Worm', email: 'greyworm@email.com', type: 'Creator', status: 'Approved'},
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'email', 'type', 'status', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'more', sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
   }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
