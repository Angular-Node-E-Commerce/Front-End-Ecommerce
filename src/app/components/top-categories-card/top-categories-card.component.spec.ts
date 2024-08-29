import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoriesCardComponent } from './top-categories-card.component';

describe('TopCategoriesCardComponent', () => {
  let component: TopCategoriesCardComponent;
  let fixture: ComponentFixture<TopCategoriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoriesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
