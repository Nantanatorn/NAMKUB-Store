import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nestle3Component } from './nestle3.component';

describe('Nestle3Component', () => {
  let component: Nestle3Component;
  let fixture: ComponentFixture<Nestle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Nestle3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nestle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
