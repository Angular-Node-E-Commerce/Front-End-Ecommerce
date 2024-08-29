import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminGameListComponent } from './edit-admin-game-list.component';

describe('EditAdminGameListComponent', () => {
  let component: EditAdminGameListComponent;
  let fixture: ComponentFixture<EditAdminGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdminGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdminGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
