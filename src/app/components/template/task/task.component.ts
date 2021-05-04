import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { Purchase } from 'src/app/model/purchase.model';
import { PurchaseService } from 'src/app/service/purchase.service';
import { HeaderService } from '../header/header.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(
    private purchaseService: PurchaseService,
    private headerService: HeaderService,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.createParamsToServices();
  }

  ngOnInit(): void {
  }

  product: Product = {
    description: "",
    price: null
  }

  purchase: Purchase = {
    requesterName: "",
    product: this.product,
    position: "",
    approval: "",
    obs: "",
    startDate: "",
    finishDate: ""
  }

  getDateAsString(): string {
    let date = new Date();
    return date.toLocaleDateString();
  }

  get isNewTask(): boolean {
    return this.type === 'create' ? true : false;
  }

  get title(): string {
    return this.taskService.taskData.title;
  }

  get type(): string {
    return this.taskService.taskData.type;
  }

  get paramId(): number {
    return this.taskService.taskData.paramId;
  }

  createParamsToServices(): void {
    this.headerService.headerData = {
      title: this.title,
      icon: 'storefront',
      routeUrl: '/'
    }
    if (!this.isNewTask) {
      this.purchaseService.getTaskById(this.paramId).subscribe((purchase) => {
        this.purchase = purchase;
      })
    }
  }

  showField(): boolean {
    if (!this.isNewTask) {
      return true;
    } else {
      return false;
    }
  }

  readOnlyField(): boolean {
    if (!this.isNewTask) {
      return true;
    } else {
      return false;
    }
  }

  handleSendTask(): void {
    if (this.isNewTask) {
      this.purchase.position = "aberto";
      this.purchase.startDate = this.getDateAsString();
      this.createPurchase();
    } else {
      this.purchase.position = "concluido";
      this.purchase.finishDate = this.getDateAsString();
      this.updatePurchase();
    }
  }

  createPurchase(): void {
    this.purchaseService.create(this.purchase).subscribe(() => {
      this.purchaseService.showMessage('Operação realizada com sucesso!');
      this.router.navigate(['/']);
    })
  }

  updatePurchase(): void {
    this.purchaseService.update(this.purchase).subscribe(() => {
      this.purchaseService.showMessage("Operação realizada com sucesso!");
      this.router.navigate(["/"]);
    });
  }

  cancelPurchase(): void {
    this.router.navigate(['/']);
  }

}