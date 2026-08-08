import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import {computed} from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {inject} from '@angular/core'
import {produtosService} from '../../../core/services/produtos.service'
import { CarrinhoService } from '../../../core/services/carrinho.service';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  
 //!<===================SIGNALS=====================>
  

 produtos = signal < {nome: string, preco: number}[]>([]); //!LISTA COM DADOS

 produtoSelecionado = signal <string | null>(null); //!METODO PARA CRIAR UM ESTADO DE SELEÇÃO COM SIGNAL STRING | NULL

 erro = signal < string | null > (null);

 carregando = signal(true)


//?<==================COMPUTED=======================>

//!FUNÇÃO QUE CONTABILIZA A QUANTIDADE DE ITENS DA LISTA
 totalProdutos = computed (()=> this.produtos().length); 

//!FUNÇÃO CALCULA O VALOR TOTAL DOS PRODUTOS USANDO METODO COMPUTED
 valorTotal = computed(()=> 
 {return this.produtos().reduce((total, item) =>
 total + item.preco,0)});



//todo<=========================INJECT====================>












  
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
    {nome:'Jorry linda', preco: 9999}
  ]);
}












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
      document.title = `(${this.totalProdutos()}) - Loja da Jorry`; 
    }
  });
}




//!função cria estado de carregamento
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

 
public carrinhoService = inject(CarrinhoService)

quantidadeCarrinho = this.carrinhoService.quantidadeItens;
totalCarrinho = this.carrinhoService.totalItens;
adicionarAoCarrinho(produto: {nome: string; preco: number;}){
  this.carrinhoService.adicionar(produto);
}
}