import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { TabelaProdutosComponent } from './tabela-produtos/tabela-produtos.component';
import { FormsProdutosComponent } from './forms-produtos/forms-produtos.component';
import { NgMaterialModule } from '../shared/ng-material/ng-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TabelaProdutosComponent,
    FormsProdutosComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    NgMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProdutosModule { }
