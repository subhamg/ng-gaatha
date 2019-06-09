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
  dataSource: Item[] = [];
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
    this._itemsService.getItems().subscribe((data) => {
      this.dataSource = data;
      this.totalCount = data.length;
      console.log(data.length);
    });
    this.myDataArray.sort = this.sort;
    this.myDataArray.paginator = this.paginator;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  editItem(_id: number) {
    if (this.hideData == true) {
      this.hideData = false;
    } else this.hideData = true;
    this.currentItem = this.dataSource[_id];
    console.log(_id);
    console.log(this.currentItem);
  }

  getItems() {
    this._itemsService.getItems().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });
  }

  onDelete(id: string) {
    console.log(id);
    this._itemsService.deleteItem(id).subscribe((res) => {
      this.getItems();
    });

    this.router.navigate(['creators/content']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
