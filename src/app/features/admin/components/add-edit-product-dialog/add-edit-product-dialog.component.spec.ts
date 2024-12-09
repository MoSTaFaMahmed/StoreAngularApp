import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductDialogComponent } from './add-edit-product-dialog.component';

describe('AddEditProductDialogComponent', () => {
  let component: AddEditProductDialogComponent;
  let fixture: ComponentFixture<AddEditProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProductDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
