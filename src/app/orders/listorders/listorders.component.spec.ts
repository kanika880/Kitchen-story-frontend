import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListordersComponent } from './listorders.component';

describe('ListordersComponent', () => {
  let component: ListordersComponent;
  let fixture: ComponentFixture<ListordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
