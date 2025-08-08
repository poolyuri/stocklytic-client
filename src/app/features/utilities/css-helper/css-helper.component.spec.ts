import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssHelperComponent } from './css-helper.component';

describe('CssHelperComponent', () => {
  let component: CssHelperComponent;
  let fixture: ComponentFixture<CssHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssHelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
