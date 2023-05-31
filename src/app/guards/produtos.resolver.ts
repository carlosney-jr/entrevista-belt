import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { Produto } from '../model/produto';

export const produtosResolver: ResolveFn<Produto> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const produtosService = inject(ProdutoService);

  // Se houver parâmetros na rota, além do código, entende-se que é um produto já existente de acordo com a rota e faz a pesquisa no serviço, retornando-o.
  if (route.params && route.params['codigo']) {
    return produtosService.procurarPorCodigo(route.params['codigo']);
  }
  return of({codigo: 0, nome: '', descricao: '', valor: 0})
};
