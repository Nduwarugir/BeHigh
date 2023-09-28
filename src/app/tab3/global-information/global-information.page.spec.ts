import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalInformationPage } from './global-information.page';

describe('GlobalInformationPage', () => {
  let component: GlobalInformationPage;
  let fixture: ComponentFixture<GlobalInformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GlobalInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
