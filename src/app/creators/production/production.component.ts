import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export interface PeriodicElement {
  position: number;
  contentImage: string;
  title: string;
  category: string;
  contentType: string;
  sharedDate: string;
  uploadDate: string;
  file: string;
  production: string;
  imgUrl: string;
  writer: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', category: 'Book', contentType: 'Novel', sharedDate: 'NA', uploadDate: 'NA', file: 'h', production: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', category: 'Book', contentType: 'Novel', sharedDate: '10 May 2019', uploadDate: 'NA', file: 'h', production: 'Jon Snow', imgUrl: 'assets/img/got/avartar4.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', category: 'Book', contentType: 'Novel', sharedDate: '10 May 2019', uploadDate: '14 May 2019', file: 'h', production: 'Jon Snow', imgUrl: 'assets/img/got/avartar4.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', category: 'Book', contentType: 'Novel', sharedDate: '10 May 2019', uploadDate: '15 May 2019', file: 'h', production: 'Tyrion Lannister', imgUrl: 'assets/img/got/avartar3.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', category: 'Book', contentType: 'Novel', sharedDate: 'NA', uploadDate: 'NA', file: 'h', production: 'Arya Stark', imgUrl: 'assets/img/got/avartar2.jpg'  }, 
 ];

 @Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})

export class ProductionComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['position', 'title', 'writer', 'contentType', 'category', 'sharedDate', 'production', 'uploadDate', 'actions'];
  myDataArray = new MatTableDataSource(ELEMENT_DATA);
  totalCount = ELEMENT_DATA.length;

  applyFilter(filterValue: string) {
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'download', sanitizer.bypassSecurityTrustResourceUrl('assets/img/download.svg')
    );

    matIconRegistry.addSvgIcon(
      'play', sanitizer.bypassSecurityTrustResourceUrl('assets/img/play.svg')
    );

    matIconRegistry.addSvgIcon(
      'share', sanitizer.bypassSecurityTrustResourceUrl('assets/img/share.svg')
    );

    matIconRegistry.addSvgIcon(
      'more', sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
   }

  ngOnInit() {
    this.myDataArray.sort = this.sort;
    this.myDataArray.paginator = this.paginator;
  }

}
