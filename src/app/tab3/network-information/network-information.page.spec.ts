import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkInformationPage } from './network-information.page';

describe('NetworkInformationPage', () => {
  let component: NetworkInformationPage;
  let fixture: ComponentFixture<NetworkInformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NetworkInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
