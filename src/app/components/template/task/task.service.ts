import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskData } from './task-data.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _taskData = new BehaviorSubject<TaskData>({
    title: 'Dados da Requisição',
    type: 'create'
  })

  constructor() { }

  get taskData(): TaskData {
    return this._taskData.value;
  }

  set taskData(taskData: TaskData) {
    this._taskData.next(taskData);
  }

}