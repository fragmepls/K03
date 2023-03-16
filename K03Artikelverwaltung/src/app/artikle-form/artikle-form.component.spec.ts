import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikleFormComponent } from './artikle-form.component';

describe('ArtikleFormComponent', () => {
  let component: ArtikleFormComponent;
  let fixture: ComponentFixture<ArtikleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtikleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
