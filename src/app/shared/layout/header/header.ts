import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'Loja da Ana Jorry';
  
  private carrinhoService = inject(CarrinhoService);
  
  quantidadeHeader = this.carrinhoService.quantidadeItens;


}