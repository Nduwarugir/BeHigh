import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPopupPage } from './video-popup.page';

describe('VideoPopupPage', () => {
  let component: VideoPopupPage;
  let fixture: ComponentFixture<VideoPopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VideoPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
