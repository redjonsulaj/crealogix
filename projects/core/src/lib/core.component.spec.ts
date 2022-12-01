import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreComponent } from './core.component';

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render `core works!`', () => {
    const fixture = TestBed.createComponent(CoreComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('core works!');
  });
});
