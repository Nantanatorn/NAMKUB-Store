import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crystal2Component } from './crystal2.component';

describe('Crystal2Component', () => {
  let component: Crystal2Component;
  let fixture: ComponentFixture<Crystal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Crystal2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crystal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
