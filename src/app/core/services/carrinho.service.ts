import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // Estado global
  private carrinho = signal<{nome: string; preco: number}[]>([]);

  // Seleção
  itens = computed(() => this.carrinho());

  quantidadeItens = computed(() => this.carrinho().length);

  total = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0)
  );

  carrinhoVazio = computed(() => this.carrinho().length === 0);

  // Ação: Adicionar Produtos
  adicionar(produto: {nome: string; preco: number}) {
    this.carrinho.update(lista => [
      ...lista,
      produto
    ]);
  }

  // Ação de limpeza
  limpar() {
    this.carrinho.set([]);
  }
}