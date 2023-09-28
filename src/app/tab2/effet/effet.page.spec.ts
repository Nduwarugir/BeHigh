import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffetPage } from './effet.page';

describe('EffetPage', () => {
  let component: EffetPage;
  let fixture: ComponentFixture<EffetPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(EffetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
