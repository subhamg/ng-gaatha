import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();
  private _url: string = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient, private router: Router) {}

  // getItems() {
  //   this.http.get<Item[]>(this._url).pipe(catchError(this.errorHandler));
  // }

  getItems() {
    return this.http.get<Item[]>(this._url);
    // .pipe(
    //   map((itemData) => {
    //     return itemData.items.map((item) => {
    //       return {
    //         _id: item._id,
    //         title: item.title,
    //         writer: item.writer,
    //         category: item.category,
    //         contentType: item.contentType,
    //         wordCount: item.wordCount,
    //         docPath: item.docPath
    //       };
    //     });
    //   })
    // )
    // .subscribe((transformedItems) => {
    //   this.items = transformedItems;
    //   this.itemsUpdated.next([...this.items]);
    // });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  getItem(_id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      writer: string;
      category: string;
      contentType: string;
      wordCount: string;
      docPath: string;
    }>(this._url + '/' + _id);
  }

  postItem(
    title: string,
    writer: string,
    category: string,
    contentType: string,
    wordCount: string,
    docFile: File
  ) {
    const postItem = new FormData();
    postItem.append('title', title);
    postItem.append('writer', writer);
    postItem.append('category', category);
    postItem.append('contentType', contentType);
    postItem.append('wordCount', wordCount);
    postItem.append('docFile', docFile, title);
    this.http
      .post<{ message: string; item: Item }>(this._url, postItem)
      .subscribe((resData) => {
        // const item: Item = {
        //   // _id: resData.item._id,
        //   // title: title,
        //   // writer: writer,
        //   // category: category,
        //   // contentType: contentType,
        //   // wordCount: wordCount,
        //   // docPath: resData.item.docPath
        // };
        // this.items.push(item);
        this.itemsUpdated.next([...this.items]);
        this.router.navigate(['/creators/content']);
      });
  }

  // putItem(Item: Item) {
  //   const obj = {
  //     title: Item.title,
  //     writer: Item.writer,
  //     category: Item.category,
  //     contentType: Item.contentType,
  //     wordCount: Item.wordCount
  //   };
  //   return this.http.put<Item[]>(this._url + `/${Item._id}`, obj);
  // }

  // deleteItem(_id: string) {
  //   return this.http.delete<Item[]>(this._url + `/${_id}`);
  // }

  // errorHandler(error: HttpErrorResponse) {
  //   return throwError(error.message || 'Server Error');
  // }

  putItem(
    _id: string,
    title: string,
    writer: string,
    category: string,
    contentType: string,
    wordCount: string,
    docFile: File | string
  ) {
    let itemData: Item | FormData;
    if (typeof docFile === 'object') {
      itemData = new FormData();
      itemData.append('title', title);
      itemData.append('writer', writer);
      itemData.append('category', category);
      itemData.append('contentType', contentType);
      itemData.append('wordCount', wordCount);
      itemData.append('docFile', docFile, title);
    } else {
      itemData = {
        _id: _id,
        title: title,
        writer: writer,
        category: category,
        contentType: contentType,
        wordCount: wordCount,
        docPath: docFile
      };
      delete itemData._id;
      // delete itemData.docPath;
    }

    this.http.put(this._url + '/' + _id, itemData).subscribe((response) => {
      const updatedItems = [...this.items];
      const oldPostIndex = updatedItems.findIndex((p) => p._id === _id);
      const item: Item = {
        _id: _id,
        title: title,
        writer: writer,
        category: category,
        contentType: contentType,
        wordCount: wordCount,
        docPath: ''
      };
      // // delete item._id;
      // delete item.docPath;
      updatedItems[oldPostIndex] = item;
      this.items = updatedItems;
      this.itemsUpdated.next([...this.items]);
      this.router.navigate(['/creators/content']);
    });
  }

  deleteItem(_id: string) {
    return this.http.delete<Item[]>(this._url + '/' + _id);
  }
}
