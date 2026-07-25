import { Component} from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { produtosService } from '../produtos.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!Lista com dados = Array  ============ SIGNALS =======================
  produtos = signal <{nome: string, preco: number}[]>([]);

  carregando = signal (true);

  //!Função para exibir produtos selecionados pelo usuario no console 
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
       private produtosService = inject(produtosService);

  //!Função que adiciona produto usando metodo update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  } 
  totalProdutos = computed(() => this.produtos().length);
  //!Função que calcula o valor total dos produtos usando o metodo computed() =====  COMPUTED ========
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
  //!Função para substituir a lista atual usando o metodo set()
  substituirProdutos(){
    this.produtos.set([
      { nome: 'Teclado', preco: 50 },
      { nome: 'Mouse',   preco: 15 },
      { nome: 'Monitor', preco: 500 },
      { nome: 'Desktop', preco: 1500 },
      { nome: 'Headset', preco: 30 },
    ]);
  }
     carregarProdutos(){

      this.carregando.set(true);
      this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos: ', erro);
          this.carregando.set(false);
        }
      });

     }

  //!Metodo para monitorar alterações em tempo real usnado o effect() //! Carrega a API
  constructor(){
    this.carregarProdutos();
    

    //! effects contiunuam iguais - não mexer
    effect(() =>{
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(() =>{
      console.log('Valor Total Atualizado: ', this.valorTotal());
    });
    effect(() =>{
      if (typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Mayssa`;
      }
    });
  }
  //!Metodo para criar um estado de seleção com signal string | null =====  SIGNAL ========
  produtoSelecionado = signal <string | null>(null);
  //!Metodo para criar um estado para carrinho com o signal =====  SIGNAL ========
  carrinho = signal <{nome: string; preco: number}[]>([]);
  adicionarAoCarrinho(produto:{nome: string; preco: number}){
    this.carrinho.update(listaAtual => [...listaAtual, produto]
);
  }
  //! totalProdutos = computed(()=> this.produtos().Length); ========= COMPUTED=========
  //Metodo para calcular a quantidade total de itens no carrinho
  quantidadeCarrinho = computed(() => this.carrinho().length);
  //Metodo para caclular o valor total dos itens do carrinho
  totalCarrinho = computed(() => {
    return this.carrinho().reduce((total, item)=>
      total + item.preco, 0)});
  //! valorTotal = computed(() => {
  //! return this.produtos().reduce((total, item) =>
  //! total + item.preco,0)});

}
