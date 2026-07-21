import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal} from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto,PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //! SIGNALS

 produtos = signal ([
    {nome: 'Teclado Gamer',preco:149.00},
    {nome: 'Mouse Gamer',preco:299.99},
    {nome: 'Monitor Gamer',preco:1599.99},
    {nome: 'Desktop Gamer',preco:4999.99},
    {nome: 'Headset Gamer',preco:699.99}
  ]);

//! função que contabiliza a quantidade de produtos na lista
totalProdutos = computed(() => this.produtos().length);


//! função que calcula o valor total do metodo comput()

valorTotal = computed(()=> 
{return this.produtos()
.reduce((total, item) => total + item.preco,0)
});

constructor(){
 effect(() => {
  console.log('lista de Produtos Alterados: ', this.produtos());
});

effect(() => {
  console.log( ' Valor Total Atualizado: ', this.valorTotal());
});

effect(() => {
  if  (typeof document !== 'undefined'){
    document.title = `(${this.totalProdutos()}) - Lojinha da Jorryzinha`;
    }
 });
}

exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

  // Update() modifica baseado no estado atual
adicionarProdutos(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome: 'Playstation 5', preco:3000}
    ]);
}

// set() substitui completamente
substituirProdutos() {
this.produtos.set([
    {nome: 'Teclado', preco: 50},
    {nome: 'Mouse', preco: 15},
    {nome: 'Monitor', preco: 500},
    {nome: 'Desktop', preco: 1500},
    {nome: 'Headset', preco: 30},
   ]);
}

  produtoSelecionado = signal <string | null>(null);
  carrinho = signal<{ nome: string; preco: number } []>([]);
  
adicionarAoCarrinho(produto: { nome: string; preco: number }) {
   this.carrinho.update(listaAtual => [
    ...listaAtual,
    produto
  ]);
}
  quantidadeCarrinho = computed(() => this.carrinho().length);
  totalCarrinho = computed(() => {
return this.carrinho().reduce((total, item) =>
  total + item.preco, 0);
  });
  }
