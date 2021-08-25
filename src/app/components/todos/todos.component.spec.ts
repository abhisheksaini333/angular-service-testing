import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosService } from '../../services/todos.service';
import { TodosServiceStub } from '../../services/todos.service.mock';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [
        {
          provide: TodosService,
          useClass: TodosServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have todos_list populated', () => {
    expect(component.todos_list.length).toEqual(0);
  })

  it('should call getToDosList of TodosService on Component Init', () => {
    spyOn(component._todosService, 'getToDosList').and.callThrough();
    component.ngOnInit();
    expect(component._todosService.getToDosList).toHaveBeenCalled();
  })
});
