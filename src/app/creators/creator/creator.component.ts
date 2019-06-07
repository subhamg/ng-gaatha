import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemsService } from 'src/app/shared/items.service';
import { Item } from 'src/app/shared/item';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  public ELEMENT_DATA = [];
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

  myDataArray = new MatTableDataSource(this.ELEMENT_DATA);
  totalCount = this.dataSource.length;
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
    sanitizer: DomSanitizer
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
      console.log(data);
    });
    this.myDataArray.sort = this.sort;
    this.myDataArray.paginator = this.paginator;
  }

  editItem(_id: number) {
    if (this.hideData == true) {
      this.hideData = false;
    } else this.hideData = true;
    this.currentItem = this.dataSource[_id];
    console.log(_id);
    console.log(this.currentItem);
  }

  onSubmitItem(form: NgForm) {
    if (form.value._id) {
      this._itemsService.putItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.success = true;
        this.getItems();
      });
    } else {
      this._itemsService.postItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.success = true;
        this.getItems();
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this._itemsService.selectedItem = new Item();
    }
  }

  getItems() {
    this._itemsService.getItems().subscribe((res) => {
      this.ELEMENT_DATA = res;
      console.log(res);
    });
  }

  deleteItem(id: string) {
    console.log(id);
    this._itemsService.deleteItem(id).subscribe((res) => {
      this.getItems();
    });
    this.router.navigate(['creators/content']);
  }
}
