import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KassaComponent } from './kassa.component';

describe('KassaComponent', () => {
  let component: KassaComponent;
  let fixture: ComponentFixture<KassaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KassaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KassaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
