import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Minere2Component } from './minere2.component';

describe('Minere2Component', () => {
  let component: Minere2Component;
  let fixture: ComponentFixture<Minere2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Minere2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Minere2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
