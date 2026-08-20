import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({
providedIn: 'root',
})
export class CarrinhoService {
// O estado interno continua privado.
// Apenas o service pode alterar diretamente a lista do carrinho.
private carrinho = signal<ItemCarrinho[]>([]);
// Selectors públicos derivados do estado interno.
// Os componentes leem estes valores, mas não alteram diretamente o signal privado.
itens = computed(() => this.carrinho());
quantidade = computed(() => this.carrinho().length);
total = computed(() =>
this.carrinho().reduce((total, item) => total + item.preco, 0)
);
carrinhoVazio = computed(() => this.carrinho().length === 0);
// Adiciona um produto ao carrinho global.
adicionar(produto: ItemCarrinho) {
this.carrinho.update((listaAtual) => [...listaAtual, produto]);
}
// Remove um item específico pelo índice.
removerPorIndice(indice: number) {
this.carrinho.update((listaAtual) =>
listaAtual.filter((_, index) => index !== indice)
);
}
// Limpa todos os itens do carrinho.
limpar() {
this.carrinho.set([]);
}
}