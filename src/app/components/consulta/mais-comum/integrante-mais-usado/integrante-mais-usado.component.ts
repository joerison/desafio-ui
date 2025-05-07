import {Component, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {DatePipe, NgIf} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import moment from "moment";
import {ApiService} from '../../../time/api.service';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-integrante-mais-usado',
  templateUrl: './integrante-mais-usado.component.html',
  styleUrls: ['./integrante-mais-usado.component.css'],
  providers: [MessageService, ApiService],
  imports: [
    Card,
    TableModule,
    Button,
    Toast,
    DatePipe,
    DatePicker,
    ReactiveFormsModule,
    NgIf,
    Tag
  ]
})

export class IntegranteMaisUsadoComponent {

  data = new FormControl('', Validators.required);
  maisUsado? : {nome: any, funcao: any};
  constructor(private apiService: ApiService,
              private messageService: MessageService) {
  }

  integranteMaisUsado() {
    const intervalo = this.data.value;
    const dataFormatada: { dataInicio?: string; dataFim?: string} = {};

    if (intervalo != null && intervalo[0]) {
      dataFormatada.dataInicio = moment(intervalo[0]).format('YYYY-MM-DD');
    }
    if (intervalo != null && intervalo[1]) {
      dataFormatada.dataFim    = moment(intervalo[1]).format('YYYY-MM-DD');
    }

    this.apiService.integranteMaisUsado(dataFormatada)
      .pipe(catchError(error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error?.error?.message});
        return error;
      }))
      .subscribe(data => {
        this.maisUsado = data;
      });

  }

}

