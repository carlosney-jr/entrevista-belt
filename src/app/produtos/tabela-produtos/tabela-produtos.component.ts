import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../../services/produto.service';
import { Component } from '@angular/core';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.scss']
})
export class TabelaProdutosComponent {

  produtos: Produto[];
  colunasExibidas = ['codigo', 'nome', 'descricao', 'valor', 'criar'];

  constructor(private servico: ProdutoService, private router: Router, private route: ActivatedRoute) {
    
  }

  adicionar() {
    this.router.navigate(['criar'], {relativeTo: this.route});
  }

  editar(produto: Produto) {
    this.router.navigate(['editar', produto.codigo], {relativeTo: this.route})
  }

  deletar(produto: Produto) {
    this.servico.remover(produto.codigo)
  }

  deletarTudo() {
    this.servico.deletarTudo()
    this.adicionar();
  }
  ngOnInit() {
    if (this.produtos.length == 0) {
      this.adicionar()
    }
    this.produtos = this.servico.listar();
  }
}
