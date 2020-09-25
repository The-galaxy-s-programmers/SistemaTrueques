import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProductoComponent } from './chat-producto.component';

describe('ChatProductoComponent', () => {
  let component: ChatProductoComponent;
  let fixture: ComponentFixture<ChatProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
