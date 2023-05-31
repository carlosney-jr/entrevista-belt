import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { Location } from '@angular/common';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-forms-produtos',
  templateUrl: './forms-produtos.component.html',
  styleUrls: ['./forms-produtos.component.scss'],
})
export class FormsProdutosComponent {
  form = this.formBuilder.group({
    codigo: [0, Validators.required],
    nome: [''],
    descricao: ['', [Validators.required, Validators.minLength(20)]],
    valor: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private servico: ProdutoService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    const produto: Produto = this.route.snapshot.data['produto'];
    this.form.setValue({
      codigo: produto.codigo,
      nome: produto.nome,
      descricao: produto.descricao,
      valor: produto.valor,
    });
    this.checarProdutoPreexistente();
  }

  // Caso o produto seja pré-existente, então não se deve alterar o seu código já que deve ser único.
  checarProdutoPreexistente() {
    let produtoTeste = this.servico.procurarPorCodigo(this.form.value.codigo);
    if (!this.servico.checarProdutoVazio(produtoTeste)) {
      this.form.controls.codigo.disable();
    }
  }

  
  enviar() {
    // Caso o campo código esteja habilitado, se entende como se estivesse criando um produto novo. Portanto, verifica se o código inserido não coincide com o de algum produto pré-existente, caso sim, notifica o usuário e cancela a operação.
    if (
      this.form.controls.codigo.enabled &&
      this.servico.produtoExiste(this.form.value.codigo)
    ) {
      window.alert('O produto já existe! Altere o código.');
      return;
    }

    // Para enviar o campo 'código' em form.value é necessário habilitar o campo antes.
    this.form.controls.codigo.enable();
    this.servico.adicionar(this.servico.tratarProduto(this.form.value));
    this.retornar();
  }

  retornar() {
    this.location.back();
  }
}
