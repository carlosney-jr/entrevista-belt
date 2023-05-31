import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { produtosResolver } from './produtos.resolver';

describe('produtosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => produtosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
