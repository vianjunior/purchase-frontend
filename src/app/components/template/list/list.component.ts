import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/app/model/filer.model';
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

  filter: Filter = {
    requesterName: '',
    product: '',
    position: '',
    approved: ''
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
      this.filter.position = 'aberto' // Somente abertas/pendentes de aprovação
      this.purchaseService.getTasks(this.filter).subscribe(purchases => {
        this.purchases = purchases;
      });
    } else {
      this.purchaseService.getTasks(this.filter).subscribe(purchases => {
        this.purchases = purchases;
      });
    }
  }

  openToTask(id: number): void {
    this.router.navigate([`/task/approval/${id}`]);
  }

  showField(): boolean {
    if (this.type === 'approval') {
      return false;
    } else {
      return true;
    }
  }

  canOpenToTask(): boolean {
    return this.type === 'approval' ? true : false;
  }

  cleanFilter(): void {
    this.filter = {
      requesterName: '',
      product: '',
      position: '',
      approved: ''
    };
  }

}
