import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/shared/item';
import { ItemsService } from 'src/app/shared/items.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  success: boolean = false;
  @Output() itemCreated = new EventEmitter<Item>();
  @Input('item') editItem;

  constructor(private _itemService: ItemsService) {}

  ngOnInit() {
    this.getItems();
  }

  onSubmitItem(form: NgForm) {
    console.log(form.value);
    this._itemService.putItem(form.value).subscribe((res) => {
      this.resetForm(form);
      this.success = true;
      this.getItems();
    });
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
