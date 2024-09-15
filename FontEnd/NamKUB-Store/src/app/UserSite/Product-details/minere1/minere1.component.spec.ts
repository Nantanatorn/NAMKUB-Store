import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minere1Component } from './minere1.component';

describe('Minere1Component', () => {
  let component: Minere1Component;
  let fixture: ComponentFixture<Minere1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Minere1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minere1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
