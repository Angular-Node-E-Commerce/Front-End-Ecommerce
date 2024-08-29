import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddGameListComponent } from './admin-add-game-list.component';

describe('AdminAddGameListComponent', () => {
  let component: AdminAddGameListComponent;
  let fixture: ComponentFixture<AdminAddGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
