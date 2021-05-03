import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListData } from './list-data.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private _listData = new BehaviorSubject<ListData>({
    title: 'Lista de Requisições de Compra',
    type: 'all'
  })

  constructor() { }

  get listData(): ListData {
    return this._listData.value;
  }

  set listData(taskData: ListData) {
    this._listData.next(taskData);
  }
}