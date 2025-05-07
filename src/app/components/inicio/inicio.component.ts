import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {IntegranteCadastroComponent} from '../integrante/cadastro/integrante-cadastro.component';
import {IntegranteService} from '../integrante/integrante.service';
import {IntegrantePesquisaComponent} from '../integrante/pesquisa/integrante-pesquisa.component';
import {TimePesquisaComponent} from '../time/pesquisa/time-pesquisa.component';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    providers: [MessageService, ConfirmationService, IntegranteService],
  imports: [Card, TableModule, IntegranteCadastroComponent, IntegrantePesquisaComponent, TimePesquisaComponent]
})
export class InicioComponent implements OnInit {

  ngOnInit(): void {

  }
}
