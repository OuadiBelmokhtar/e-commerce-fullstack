import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontofficeProductsGridViewComponent } from './frontoffice-products-grid-view.component';

describe('FrontofficeProductsGridViewComponent', () => {
  let component: FrontofficeProductsGridViewComponent;
  let fixture: ComponentFixture<FrontofficeProductsGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontofficeProductsGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontofficeProductsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
