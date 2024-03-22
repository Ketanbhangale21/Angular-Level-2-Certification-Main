import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCarComponent } from './config-car.component';

describe('ConfigCarComponent', () => {
  let component: ConfigCarComponent;
  let fixture: ComponentFixture<ConfigCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
