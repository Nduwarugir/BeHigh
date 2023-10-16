import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPopupPage } from './media-popup.page';

describe('MediaPopupPage', () => {
  let component: MediaPopupPage;
  let fixture: ComponentFixture<MediaPopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MediaPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
