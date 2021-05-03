import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/components/template/list/list.service';
import { Purchase } from 'src/app/model/purchase.model';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchases: Purchase[];

  constructor(
    private rout: ActivatedRoute,
    private listService: ListService
  ) {
    this.createParamsToServices();
  }

  createParamsToServices(): void {
    const type = this.rout.snapshot.paramMap.get('type');

    this.listService.listData = {
      title: type === 'all' ? 'Lista de Requisições de Compra' : 'Requisições para Aprovação',
      type: type
    }
  }

  ngOnInit(): void {
    
  }

}