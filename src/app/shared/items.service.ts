import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  selectedItem: Item;
  items: Item[];
  private _url: string = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {
    this.selectedItem = new Item();
  }

  // getItems() {
  //   this.http.get<Item[]>(this._url).pipe(catchError(this.errorHandler));
  // }

  getItems() {
    return this.http.get<Item[]>(this._url);
  }

  postItem(Item: Item) {
    const postItem = new FormData();
    postItem.append('title', Item.title);
    postItem.append('writer', Item.writer);
    postItem.append('category', Item.category);
    postItem.append('contentType', Item.contentType);
    postItem.append('wordCount', Item.wordCount);
    postItem.append('itemDocFile', Item.itemDocFile, Item.title);
    return this.http.post<Item[]>(this._url, postItem);
  }

  putItem(Item: Item) {
    const obj = {
      title: Item.title,
      writer: Item.writer,
      category: Item.category,
      contentType: Item.contentType,
      wordCount: Item.wordCount
    };
    return this.http.put<Item[]>(this._url + `/${Item._id}`, obj);
  }

  deleteItem(_id: string) {
    return this.http.delete<Item[]>(this._url + `/${_id}`);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
