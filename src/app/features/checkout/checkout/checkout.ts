import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,} from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  carrinhoService = inject(CarrinhoService);

formulario = new FormGroup({
 nome: new FormControl('',[Validators.required, Validators.minLength(3), nomeSemNumeros]),
 email: new FormControl('',[Validators.required, Validators.email]),
 endereco: new FormControl('',[Validators.required, Validators.minLength(5)]),
});

finalizar() {

  if(this.formulario.invalid){
    console.log('Formulário Inválido');
    return;
  }


  const dados = this.formulario.value
  const itens = this.carrinhoService.itens();


  
 console.log('Dados do formulário:', this.formulario.value);
 console.log('Itens do carrinho:', this.carrinhoService.itens());
 }
}

function nomeSemNumeros (control:AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if(!valor) return null;
  if(/\d/.test(valor)){ //detecta e bloqueia numeros no sistema
    return {numeroInvalido:true};
  } 
  return null;
}