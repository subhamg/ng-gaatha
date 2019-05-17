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
  wordCount: number;
  file: string;
  narrator: string;
  imgUrl: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 { position: 1, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', wordCount: 1200, file: 'h', narrator: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
 { position: 2, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', wordCount: 1200, file: 'h', narrator: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
 { position: 3, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', wordCount: 600, file: 'h', narrator: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
 { position: 4, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', wordCount: 1200, file: 'h', narrator: 'Tyrion Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },
 { position: 5, contentImage: 'assets/img/got/dance.jpg', title: 'A Dance with Dragons', writer: 'George R.R. Martin', duration: '2hrs 30mins', category: 'Book', contentType: 'Novel', wordCount: 1200, file: 'h', narrator: 'Cersie Lannister', imgUrl: 'assets/img/got/avartar5.jpg'  },

];

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['position', 'title', 'writer', 'duration', 'contentType', 'category', 'wordCount', 'narrator', 'actions'];
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
      'more', sanitizer.bypassSecurityTrustResourceUrl('assets/img/more_vert.svg')
    );
   }

  ngOnInit() {
    this.myDataArray.sort = this.sort;
    this.myDataArray.paginator = this.paginator;
  }

}
