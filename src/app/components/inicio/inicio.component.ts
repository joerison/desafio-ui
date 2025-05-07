import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {IntegranteCadastroComponent} from '../integrante/cadastro/integrante-cadastro.component';
import {IntegranteService} from '../integrante/integrante.service';
import {IntegrantePesquisaComponent} from '../integrante/pesquisa/integrante-pesquisa.component';
import {TimePesquisaComponent} from '../time/pesquisa/time-pesquisa.component';
import {TimeDaDataComponent} from '../consulta/time-da-data/time-da-data.component';
import {ContagemPorFranquiaComponent} from '../consulta/contagem-por-franquia/contagem-por-franquia.component';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {ContagemPorFuncaoComponent} from '../consulta/contagem-por-funcao/contagem-por-funcao.component';
import {IntegranteMaisUsadoComponent} from '../consulta/mais-comum/integrante-mais-usado/integrante-mais-usado.component';
import {TimeMaisComumComponent} from '../consulta/mais-comum/time-mais-comum/time-mais-comum.component';
import {FuncaoMaisComumComponent} from '../consulta/mais-comum/funcao-mais-comum/funcao-mais-comum.component';
import {FranquiaMaisFamosaComponent} from '../consulta/mais-comum/franquia-mais-famosa/franquia-mais-famosa.component';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    providers: [MessageService, ConfirmationService, IntegranteService],
  imports: [Card, TableModule, IntegranteCadastroComponent, IntegrantePesquisaComponent, TimePesquisaComponent, TimeDaDataComponent, ContagemPorFranquiaComponent, Tabs, TabList, Tab, TabPanels, TabPanel, ContagemPorFuncaoComponent, IntegranteMaisUsadoComponent, TimeMaisComumComponent, FuncaoMaisComumComponent, FranquiaMaisFamosaComponent]
})
export class InicioComponent implements OnInit {

  ngOnInit(): void {

  }
}
