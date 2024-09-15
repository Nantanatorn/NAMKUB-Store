import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crystal1Component } from './crystal1.component';

describe('Crystal1Component', () => {
  let component: Crystal1Component;
  let fixture: ComponentFixture<Crystal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Crystal1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crystal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
