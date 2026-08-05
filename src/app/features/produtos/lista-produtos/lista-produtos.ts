import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {inject} from '@angular/core'
import {produtosService} from '.././produtos.service'

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  
 
  //!LISTA COM DADOS
  produtos = signal < {nome: string, preco: number}[]>([]);
   // {nome: ' Processador devx', preco: 344.50},
   // {nome: ' Monitor Dell', preco: 1789.90},
   // {nome: ' CPU ordexx', preco: 455.89}
  
  //!FUNÇÃO PARA EXIBIR PRODUTOS SELECIONADOS PELO USUARIO NO CONSOLE
  exibirProduto (nome: string){
    console.log('Produto Selecionado:',nome );
    this.produtoSelecionado.set(nome);
  }

  private produtosService = inject(produtosService);

  //!FUNÇÃO ADICIONA PRODUTO USANDO METODO UPDATE
adicionarProduto (){
  this.produtos.update(listaAtual => [...listaAtual,
    {nome:'PlayStation 5', preco: 3500},
    {nome:'BIELZIM', preco: 9999}
  ]);
}




//!FUNÇÃO QUE CONTABILIZA A QUANTIDADE DE ITENS DA LISTa
totalProdutos = computed (()=> this.produtos().length);

//!FUNÇÃO CALCULA O VALOR TOTAL DOS PRODUTOS USANDO METODO COMPUTED
valorTotal = computed(()=> 
 {return this.produtos().reduce((total, item) =>
total + item.preco,0)});







//!FUNÇÃO PARA SUBSTITUIR A LISTA ATUAL USANDO METODO SET
substituirProdutos(){
  this.produtos.set([
    {nome: 'Notebook ASER', preco: 870.90},
    {nome: 'Monitor Positivo', preco: 1340.90},
    {nome: 'CPU simples', preco: 190.90},
    {nome: 'Mouse philiphs', preco: 76.99},
    {nome: 'Headset Gamer', preco: 60.00},
  ])
}
//METODO PARA MONITORAR ALTERAÇÕES EM TEMPO REAL USANDO EFFECT
constructor(){ 
  this.carregarProdutos();
  effect(() => {
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() => {
    console.log('Valor Total Atualizado: ', this.valorTotal());
  });
  effect(() => {
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalProdutos()}) - Lojaa`; 
    }
  });
}
//!METODO PARA CRIAR UM ESTADO DE SELEÇÃO COM SIGNAL STRING | NULL
produtoSelecionado = signal <string | null>(null);
//! METODO PARA CRIAR UM ESTADO PARA CARRINHO COM SIGNAL

carrinho = signal <{nome: string; preco: number}[]>([]);

adicionarCarrinho(produto: {nome: string; preco: number}){
  this.carrinho.update (listaAtual => [
    ...listaAtual, produto]);
}
//metodo calcula quantidade total de intens no carrinho
quantidadeCarrinho=computed(() => this.carrinho().length);
//metodo calcula valor total do carrinho
valorCarrinho=computed(() => this.carrinho().reduce((total, item) =>
total + item.preco,0))


//!função cria estado de carregamento
carregando = signal(true);

//loading
carregarProdutos() {  
  this.erro.set(null);  //!Limpar o erro antes da requisição

  this.carregando.set(true);  //!ativar o carregamento  
  
  this.produtosService.buscarProdutos().subscribe({      
    next: (dados) => {        
      const produtos = this.produtosService.transformarProdutos(dados);        
      this.produtos.set(produtos);        
      this.carregando.set(false);      },      
      
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.erro.set('Erro ao carregar os produtos. Por favor, tente novamente!')        
        this.carregando.set(false);
      },    
  });
}

 erro = signal < string | null > (null);

}