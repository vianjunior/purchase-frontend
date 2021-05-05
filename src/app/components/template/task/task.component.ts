import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  purchaseForm: FormGroup;

  constructor(
    private purchaseService: PurchaseService,
    private headerService: HeaderService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createPurchaseForm();
    this.createParamsToServices();
  }

  ngOnInit(): void {
    this.controlApprovalChange();
  }

  createPurchaseForm() {
    this.purchaseForm = this.formBuilder.group({
      purchaseId: [null],
      requesterName: ['', Validators.required],
      product: this.formBuilder.group({
        productId: [null],
        description: ['', Validators.required],
        price: [null, Validators.required]
      }),
      position: [''],
      approval: ['', !this.isNewTask ? Validators.required : null],
      obs: [''],
      startDate: [''],
      finishDate: [''],
    })
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
      title: 'Criar Requisição',
      icon: 'storefront',
      routeUrl: '/'
    }
    if (!this.isNewTask) {
      this.purchaseService.getTaskById(this.paramId).subscribe((purchase) => {
        this.purchaseForm.patchValue(purchase);
      })
    }
  }

  handleSendTask(): void {
    if (this.isNewTask) {
      this.purchaseForm.patchValue({position: 'aberto'});
      this.purchaseForm.patchValue({startDate: this.getDateAsString()});
      this.createPurchase();
    } else {
      this.purchaseForm.patchValue({position: 'concluido'});
      this.purchaseForm.patchValue({finishDate: this.getDateAsString()});
      this.updatePurchase();
    }
  }

  createPurchase(): void {
    this.purchaseService.create(this.purchaseForm.value).subscribe(() => {
      this.purchaseService.showMessage('Operação realizada com sucesso!');
      this.router.navigate(['/']);
    })
  }

  updatePurchase(): void {
    this.purchaseService.update(this.purchaseForm.value).subscribe(() => {
      this.purchaseService.showMessage("Operação realizada com sucesso!");
      this.router.navigate(["/"]);
    });
  }

  controlApprovalChange(): void {
    const obsControl = this.purchaseForm.get('obs')
    this.purchaseForm.get('approval').valueChanges.subscribe((approval: string) => {
      if (approval === 'reprovado') {
        obsControl.setValidators([Validators.required]);
      } else {
        obsControl.clearValidators();
      }
      obsControl.updateValueAndValidity();
    });
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

  getDateAsString(): string {
    let date = new Date();
    return date.toLocaleDateString();
  }

  cancelPurchase(): void {
    this.router.navigate(['/']);
  }

}