import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemsService } from 'src/app/shared/items.service';
import { Item } from 'src/app/shared/item';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit, OnDestroy {
  public errorMsg;
  currentItem: Item;
  hideData: boolean = false;
  dataSource: Item[];
  isLoading = false;
  // displayedColumns: string[] = ['position', 'title', 'writer', 'duration', 'contentType', 'category', 'wordCount', 'narrator', 'actions'];
  displayedColumns: string[] = [
    'position',
    'title',
    'writer',
    'contentType',
    'category',
    'wordCount',
    'itemDocFile',
    'actions'
  ];
  userIsAuthenticated = false;
  userId: string;
  private itemsSub: Subscription;
  private authStatusSub: Subscription;

  myDataArray = new MatTableDataSource(this.dataSource);
  totalCount: Number;
  public success: boolean = false;

  applyFilter(filterValue: string) {
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _itemsService: ItemsService,
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    matIconRegistry.addSvgIcon(
      'download',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/download.svg')
    );

    matIconRegistry.addSvgIcon(
      'more',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
  }

  ngOnInit() {
    this._itemsService.getItems();
    this.itemsSub = this._itemsService
      .getItemUpdateListener()
      .subscribe((data: Item[]) => {
        this.userId = this.authService.getUserId();
        this.dataSource = data.filter((x) => x.creator == this.userId);
        this.totalCount = this.dataSource.length;
        this.router.navigate(['creators/content']);
        // this.isLoading = true;
      });
    this.isLoading = true;
    this.myDataArray.sort = this.sort;
    this.myDataArray.paginator = this.paginator;
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.isLoading = false;
  }

  onDelete(id: string) {
    // this.isLoading = true;
    this._itemsService.deleteItem(id).subscribe(() => {
      this._itemsService.getItems();
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
