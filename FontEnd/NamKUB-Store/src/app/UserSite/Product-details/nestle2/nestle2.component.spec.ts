import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nestle2Component } from './nestle2.component';

describe('Nestle2Component', () => {
  let component: Nestle2Component;
  let fixture: ComponentFixture<Nestle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nestle2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nestle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
