import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyLangComponent } from './hobby-lang.component';

describe('HobbyLangComponent', () => {
  let component: HobbyLangComponent;
  let fixture: ComponentFixture<HobbyLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbyLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbyLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
