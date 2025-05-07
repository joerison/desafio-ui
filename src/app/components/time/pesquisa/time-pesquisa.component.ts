import {Component, OnInit} from '@angular/core';
import {TimeService} from '../time.service';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {TimeCadastroComponent} from '../cadastro/time-cadastro.component';
import {Button} from 'primeng/button';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-time-pesquisa',
  templateUrl: './time-pesquisa.component.html',
  styleUrls: ['./time-pesquisa.component.css'],
  providers: [MessageService, TimeService],
  imports: [
    Card,
    TableModule,
    Dialog,
    TimeCadastroComponent,
    Button,
    Toast,
    DatePipe
  ]
})

export class TimePesquisaComponent implements OnInit {

  times = [];
  cadastroTimeDialog = false;

  constructor(private timeService: TimeService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.listarTimes();
  }

  abrirModalNovoIntegrante() {
    this.cadastroTimeDialog = true;
  }

  listarTimes() {
    this.timeService.listar()
      .pipe(catchError(error => {
        console.error(error);
        return error;
      })).subscribe(value => {
      this.times = value;
    })
  }

  novoTimeCadastrado(retorno: any){
    if (retorno.sucesso) {
      this.listarTimes();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmação',
        detail: retorno.mensagem
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: retorno.mensagem
      });
    }

    // this.cadastroTimeDialog = false;
  }

}

