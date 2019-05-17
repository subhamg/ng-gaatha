import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export interface PeriodicElement {
  position: number;
  contentImage: string;
  title: string;
  writer: string;
  duration: string;
  category: string;
  contentType: string;
  assignedDate: string;
  uploadDate: string;
  file: string;
  narrator: string;
  imgUrl: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2h 30m', category: 'Book', contentType: 'Novel', assignedDate: 'NA', uploadDate: 'NA', file: 'h', narrator: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2h 30mins', category: 'Book', contentType: 'Novel', assignedDate: '10 May 2019', uploadDate: 'NA', file: 'h', narrator: 'Jon Snow', imgUrl: 'assets/img/got/avartar4.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', assignedDate: '10 May 2019', uploadDate: '14 May 2019', file: 'h', narrator: 'Jon Snow', imgUrl: 'assets/img/got/avartar4.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', assignedDate: '10 May 2019', uploadDate: '15 May 2019', file: 'h', narrator: 'Tyrion Lannister', imgUrl: 'assets/img/got/avartar3.jpg'  },
  { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', assignedDate: 'NA', uploadDate: 'NA', file: 'h', narrator: 'Arya Stark', imgUrl: 'assets/img/got/avartar2.jpg'  }, 
 ];

@Component({
  selector: 'app-narrator',
  templateUrl: './narrator.component.html',
  styleUrls: ['./narrator.component.css']
})
export class NarratorComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['position', 'title', 'writer', 'contentType', 'category', 'assignedDate', 'narrator', 'uploadDate', 'actions'];
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
