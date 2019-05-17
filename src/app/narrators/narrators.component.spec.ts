import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarratorsComponent } from './narrators.component';

describe('NarratorsComponent', () => {
  let component: NarratorsComponent;
  let fixture: ComponentFixture<NarratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
