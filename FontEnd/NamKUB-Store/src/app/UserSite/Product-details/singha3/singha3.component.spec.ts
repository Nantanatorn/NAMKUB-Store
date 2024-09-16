import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singha3Component } from './singha3.component';

describe('Singha3Component', () => {
  let component: Singha3Component;
  let fixture: ComponentFixture<Singha3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Singha3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singha3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
