import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { produtosResolver } from '../guards/produtos.resolver';
import { TabelaProdutosComponent } from './tabela-produtos/tabela-produtos.component';
import { FormsProdutosComponent } from './forms-produtos/forms-produtos.component';

const routes: Routes = [
  { path : '', component: TabelaProdutosComponent },
  { path : 'criar', component: FormsProdutosComponent, resolve: { produto: produtosResolver }},
  { path: 'editar/:codigo', component: FormsProdutosComponent, resolve: {produto: produtosResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
