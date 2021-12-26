import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatSeletionComponent } from './seat-seletion.component';
describe('SeatSeletionComponent', () => {
  let component: SeatSeletionComponent;
  let fixture: ComponentFixture<SeatSeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatSeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatSeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
