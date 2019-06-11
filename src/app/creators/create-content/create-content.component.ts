import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../../shared/item';
import { ItemsService } from 'src/app/shared/items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  item: Item;
  form: FormGroup;
  private mode = 'create';
  private itemId: string;
  isLoading = false;
  filePreview: string | ArrayBuffer;

  constructor(
    private _itemService: ItemsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      writer: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      contentType: new FormControl(null, { validators: [Validators.required] }),
      wordCount: new FormControl(null, { validators: [Validators.required] }),
      docFile: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this._itemService.getItem(this.itemId).subscribe((itemData) => {
          this.isLoading = false;
          this.item = {
            id: itemData._id,
            title: itemData.title,
            writer: itemData.writer,
            category: itemData.category,
            contentType: itemData.contentType,
            wordCount: itemData.wordCount,
            docPath: itemData.docPath,
            creator: itemData.creator
          };
          // this.item = itemData;
          this.form.patchValue({
            title: this.item.title,
            writer: this.item.writer,
            category: this.item.category,
            contentType: this.item.contentType,
            wordCount: this.item.wordCount,
            docFile: this.item.docPath
          });
        });
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    });
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

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ docFile: file });
    this.form.get('docFile').updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.filePreview = reader.result;
    // };
    // reader.readAsDataURL(file);
  }

  onSubmitItem() {
    this.isLoading = true;
    if (this.mode === 'create') {
      this._itemService.postItem(
        this.form.value.title,
        this.form.value.writer,
        this.form.value.category,
        this.form.value.contentType,
        this.form.value.wordCount,
        this.form.value.docFile
      );
    } else {
      this._itemService.putItem(
        this.itemId,
        this.form.value.title,
        this.form.value.writer,
        this.form.value.category,
        this.form.value.contentType,
        this.form.value.wordCount,
        this.form.value.docFile
      );
    }
    this.form.reset();
  }
  // getItems() {
  //   this._itemService.getItems().subscribe((res) => {
  //     this._itemService.items = res as Item[];
  //   });
  // }
  // resetForm(form?: NgForm) {
  //   if (form) {
  //     form.reset();
  //     this._itemService.selectedItem = new Item();
  //   }
  // }
}
