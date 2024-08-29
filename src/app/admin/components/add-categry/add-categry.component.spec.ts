import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategryComponent } from './add-categry.component';

describe('AddCategryComponent', () => {
  let component: AddCategryComponent;
  let fixture: ComponentFixture<AddCategryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
