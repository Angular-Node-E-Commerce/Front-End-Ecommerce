import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingLibraryComponent } from './gaming-library.component';

describe('GamingLibraryComponent', () => {
  let component: GamingLibraryComponent;
  let fixture: ComponentFixture<GamingLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamingLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
