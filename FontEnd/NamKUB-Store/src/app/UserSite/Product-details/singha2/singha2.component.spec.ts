import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singha2Component } from './singha2.component';

describe('Singha2Component', () => {
  let component: Singha2Component;
  let fixture: ComponentFixture<Singha2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Singha2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singha2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
