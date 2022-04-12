import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesGridViewComponent } from './categories-grid-view.component';

describe('CategoriesGridViewComponent', () => {
  let component: CategoriesGridViewComponent;
  let fixture: ComponentFixture<CategoriesGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
