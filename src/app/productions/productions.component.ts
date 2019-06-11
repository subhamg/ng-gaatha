import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';

export interface PeriodicElement {
  position: number;
  contentImage: string;
  title: string;
  category: string;
  contentType: string;
  wordCount: number;
  file: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', category: 'Book', contentType: 'Novel', file: 'h', wordCount: 1200  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', category: 'Book', contentType: 'Novel', file: 'h', wordCount: 1200  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', category: 'Book', contentType: 'Novel', file: 'h', wordCount: 1200  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', category: 'Book', contentType: 'Novel', file: 'h', wordCount: 1200  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', category: 'Book', contentType: 'Novel', file: 'h', wordCount: 1200  },

 ];

 @Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.css']
})
export class ProductionsComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['position', 'title', 'contentType', 'category', 'wordCount', 'actions'];
  myDataArray = new MatTableDataSource(ELEMENT_DATA);
  totalCount = ELEMENT_DATA.length;

  applyFilter(filterValue: string) {
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService: AuthService) {
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
