import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: AuthData[] = [];

  displayedColumns: string[] = ['name', 'email', 'type', 'status', 'actions'];
  userData = new MatTableDataSource(this.dataSource);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    matIconRegistry.addSvgIcon(
      'more',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
  }

  ngOnInit() {
    this.userData.sort = this.sort;
    this.authService.getUsers().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
