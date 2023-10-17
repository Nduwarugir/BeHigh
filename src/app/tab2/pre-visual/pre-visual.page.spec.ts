import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreVisualPage } from './pre-visual.page';

describe('PreVisualPage', () => {
  let component: PreVisualPage;
  let fixture: ComponentFixture<PreVisualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PreVisualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
