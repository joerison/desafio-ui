import {Component, OnInit} from '@angular/core';
import {IntegranteService} from '../integrante.service';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {IntegranteCadastroComponent} from '../cadastro/integrante-cadastro.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-integrante-pesquisa',
  templateUrl: './integrante-pesquisa.component.html',
  styleUrls: ['./integrante-pesquisa.component.css'],
  imports: [
    Card,
    TableModule,
    Dialog,
    IntegranteCadastroComponent,
    Button
  ]
})

export class IntegrantePesquisaComponent implements OnInit {

  integrantes = [];
  cadastroIntegranteDialog = false;

  constructor(private IntegranteService: IntegranteService) {
  }

  ngOnInit(): void {
    this.IntegranteService.listar()
      .pipe(catchError(error => {
        console.error(error);
        return error;
      })).subscribe(value => {
      this.integrantes = value;
    })
  }

  abrirModalNovoIntegrante() {
    this.cadastroIntegranteDialog = true;
  }

}

