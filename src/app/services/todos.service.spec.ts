import { TestBed, getTestBed } from '@angular/core/testing';

import { toDo, TodosService } from './todos.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const dummyToDosList = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  }
];

const dummyTodo = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
};

const dummyTransformedTodo = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false,
  "isDue": false
};


describe('TodosService', () => {
  let injector: TestBed;
  let service: TodosService
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TodosService ]
    });
    injector = getTestBed();
    service = injector.get(TodosService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToDosList() should return data', () => {
    service.getToDosList().subscribe((res) => {
      expect(res).toEqual(dummyToDosList);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyToDosList);
  })

  it('getToDoDetails() should return the transformed data', () => {
    service.getToDoDetails('1').subscribe((res: toDo) => {
      expect(res).toEqual(dummyTransformedTodo);
    })

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/todos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodo);
  })
});
