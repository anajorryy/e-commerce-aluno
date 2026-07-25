import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { usuarioLogado, login, logout } from './core/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-aluno');
  nomeLoja = 'Mercado';
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}