import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkConfigurationPage } from './network-configuration.page';

describe('NetworkConfigurationPage', () => {
  let component: NetworkConfigurationPage;
  let fixture: ComponentFixture<NetworkConfigurationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NetworkConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
