import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singha1Component } from './singha1.component';

describe('Singha1Component', () => {
  let component: Singha1Component;
  let fixture: ComponentFixture<Singha1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Singha1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singha1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
