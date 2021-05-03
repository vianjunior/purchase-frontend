import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/model/purchase.model';
import { PurchaseService } from 'src/app/service/purchase.service';
import { HeaderService } from '../header/header.service';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  purchases: Purchase[];

  filter = {
    solicitante: '',
    produto: '',
    aprovado: null,
  }

  constructor(
    private purchaseService: PurchaseService,
    private headerService: HeaderService,
    private listService: ListService, 
    private router: Router
  ) {
    this.createParamsToServices();
    this.loadTaskList();
  }

  ngOnInit(): void {
    
  }

  get title(): string {
    return this.listService.listData.title;
  }

  get type(): string {
    return this.listService.listData.type;
  }

  createParamsToServices(): void {
    this.headerService.headerData = {
      title: this.title,
      icon: 'storefront',
      routeUrl: '/'
    }
  }

  loadTaskList(): void {
    if (this.type === 'approval') {
      this.purchaseService.readApprovalPending().subscribe(purchases => {
        this.purchases = purchases;
      });
    } else {
      this.purchaseService.readAll().subscribe(purchases => {
        this.purchases = purchases;
      });
    }
  }

  openToTask(id: number): void {
    this.router.navigate([`/task/approval/${id}`]);
  }

  showItem(passouPorAprovacao: boolean): boolean {
    if (this.type === 'all') { 
      return true;
    } else if (!passouPorAprovacao) {
      return true;
    }
  }

  showField(): boolean {
    return true;
  }

  cleanFilter(): void {
    this.filter = {
      solicitante: '',
      produto: '',
      aprovado: null,
    };
  }

}
