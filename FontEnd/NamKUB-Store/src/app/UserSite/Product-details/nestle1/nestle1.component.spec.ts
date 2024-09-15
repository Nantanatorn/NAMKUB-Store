import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nestle1Component } from './nestle1.component';

describe('Nestle1Component', () => {
  let component: Nestle1Component;
  let fixture: ComponentFixture<Nestle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nestle1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nestle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
