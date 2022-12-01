import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSearchComponent } from './navbar-search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavbarSearchComponent', () => {
  let component: NavbarSearchComponent;
  let fixture: ComponentFixture<NavbarSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSearchComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
