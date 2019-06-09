import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  showForm: Boolean = false;
  showTeamForm: Boolean = false;
  username: string = 'Subham Goyal';

  constructor(
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    matIconRegistry.addSvgIcon(
      'more',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onCreateItem() {
    this.router.navigate(['creators/create']);
  }

  onCreateTeam() {
    if (this.showTeamForm == true) {
      this.showTeamForm = false;
    } else this.showTeamForm = true;
  }
}
