import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopComponent } from './desktop.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DesktopComponent', () => {
  let component: DesktopComponent;
  let fixture: ComponentFixture<DesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have search '{active: false,config: {}}'`, () => {
    const fixture = TestBed.createComponent(DesktopComponent);
    const app = fixture.componentInstance;
    expect(app.search).toEqual({active: false,config: {}});
  });
});
