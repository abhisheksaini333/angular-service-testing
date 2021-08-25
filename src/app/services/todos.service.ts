import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class toDo {
  constructor(
    public userId: number,
    public id: number,
    public title: string,
    public completed: boolean,
    public isDue: boolean
  )
  {

  }
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _httpClient: HttpClient) { }

  getToDosList() {
    return this._httpClient.get(`https://jsonplaceholder.typicode.com/todos`)
  }

  getToDoDetails(id: string) {
    return this._httpClient.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        map(data => {
          return this.transformResponse(data)
        })
      )
  }

  transformResponse(response: any) {
    response['isDue'] = false;
    return response;
  }
}
