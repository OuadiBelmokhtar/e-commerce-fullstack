import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddiesComponent } from './caddies.component';

describe('CaddiesComponent', () => {
  let component: CaddiesComponent;
  let fixture: ComponentFixture<CaddiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaddiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaddiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
