import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crystal3Component } from './crystal3.component';

describe('Crystal3Component', () => {
  let component: Crystal3Component;
  let fixture: ComponentFixture<Crystal3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Crystal3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crystal3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
