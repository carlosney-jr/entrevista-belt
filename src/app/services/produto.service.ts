import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtos: Produto[]
  constructor() {
    this.produtos = []
  }

  listar() {
    return this.produtos;
  }

  
  checarProdutoVazio(produto: Produto) {
    if (produto.codigo == 0 && produto.nome == '' && produto.descricao == '' && produto.valor == 0) {
    return true
    }
    return false
  }

  // Verifica a existência do produto na lista.
  produtoExiste(codigo: number): boolean {
    let produtoFinal = this.produtos.find(produto => produto.codigo === codigo)
    if (produtoFinal === undefined) {
      return false;
    } 
    return true;
  }

  //  Procura pelo produto específico de acordo com o código. Caso não exista, é retornado um produto novo.
  procurarPorCodigo(codigo: number): Produto {  
    if (!this.produtoExiste(codigo)) {
      return ({codigo: 0, nome: '', descricao: '', valor: 0});
    } else {
      return this.produtos.find(produto => produto.codigo === codigo)
    }
  }

  // Utilizado para retornar um novo produto.
  tratarProduto(produto: Partial<Produto>): Produto {
    return {
      nome: produto.nome,
      codigo: produto.codigo,
      valor: produto.valor,
      descricao: produto.descricao
    }
  }

  // Verifica se o produto com o mesmo código já existe, caso sim, altera o produto. Caso não, adiciona o produto na lista.
  adicionar(produto: Produto) {
    if (this.produtoExiste(produto.codigo)) {
      this.editar(produto)
      return;
    }
    this.produtos.push(produto)
  }

  // Remove o produto de acordo com o código fornecido.
  remover(codigo: number) {
    this.produtos.forEach((produto, indice) => {
      if (produto.codigo == codigo) {
        this.produtos.splice(indice, 1)
      }
    })
  }

  // Caso o produto exista na lista, edita para que seus dados sejam os recebidos.
  editar(produto: Produto) {
    this.produtos.forEach((produtoForEach, indice) => {
      if (produto.codigo == produtoForEach.codigo) {
        this.produtos[indice] = produto;
      }
    })
  }


  deletarTudo() {
    this.produtos = []
  }
}
