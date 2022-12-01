import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have navLinks property empty array []`, () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.componentInstance;
    expect(app.navLinks).toEqual([]);
  });

  it(`should fill navLinks property by input {active: true, config: {films: {url: "https://swapi.dev/api/films/"}}}`,
    () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.componentInstance;
    app.entities = {
      active: true,
      config: {films: {url: "https://swapi.dev/api/films/"}}
    };
    app.ngOnInit();
    expect(app.navLinks).toEqual([{url: "https://swapi.dev/api/films/", label: "films", path: "films"}]);
  });
});
