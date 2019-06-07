import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../../shared/item';
import { ItemsService } from 'src/app/shared/items.service';
import { NgForm } from '@angular/forms';

export interface Roles {
  id: number;
  role: string;
}

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {
  success: boolean = false;
  @Output() itemCreated = new EventEmitter<Item>();
  @Input('item') editItem;

  fileToUpload: File = null;
  constructor(private _itemService: ItemsService) {}

  ngOnInit() {
    this.getItems();
  }

  // postMethod(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   let formData = new FormData();
  //   formData.append(‘file’, this.fileToUpload, this.fileToUpload.name);
  //   this.http.post(“Your end - point URL”, formData).subscribe((val) => {

  //     console.log(val);
  //   });
  //   return false;
  // }

  onFilePicked(files: FileList) {
    let fileItem = files.item(0);
    console.log('file input has changed. The file is', fileItem);
    this.fileToUpload = fileItem;
    // console.log(this.fileToUpload);
  }

  onSubmitItem(form: NgForm) {
    // let data = [];
    // data.push(form.value);
    // console.log(form.value);
    // console.log(data.toString);
    // // console.log(data[0]);
    // // data[0].push({ file: this.fileToUpload.name });
    // data[0]['itemDocFile'] = this.fileToUpload.name;
    if (form.value._id) {
      this._itemService.putItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.success = true;
        this.getItems();
      });
    } else {
      this._itemService.postItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.success = true;
        this.getItems();
      });
    }
  }

  getItems() {
    this._itemService.getItems().subscribe((res) => {
      this._itemService.items = res as Item[];
    });
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this._itemService.selectedItem = new Item();
    }
  }
}
