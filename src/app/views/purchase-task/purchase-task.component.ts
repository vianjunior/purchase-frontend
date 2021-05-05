import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TaskService } from 'src/app/components/template/task/task.service';

@Component({
  selector: 'app-purchase-task',
  templateUrl: './purchase-task.component.html',
  styleUrls: ['./purchase-task.component.css']
})

export class PurchaseTaskComponent implements OnInit{

  constructor(
    private rout: ActivatedRoute,
    private taskService: TaskService  
  ) {
      this.createParamsToServices();
  }

  createParamsToServices(): void {
    const type = this.rout.snapshot.paramMap.get('type');
    const paramId = +this.rout.snapshot.paramMap.get('id');

    this.taskService.taskData = {
      title: type === 'create' ? 'Dados da Requisição de Compras' : 'Aprovação de Requisição',
      type: type,
      paramId: paramId ? paramId : null
    }
  }

  ngOnInit(): void {
  
  }

}