import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoriesSectionComponent } from './top-categories-section.component';

describe('TopCategoriesSectionComponent', () => {
  let component: TopCategoriesSectionComponent;
  let fixture: ComponentFixture<TopCategoriesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoriesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
