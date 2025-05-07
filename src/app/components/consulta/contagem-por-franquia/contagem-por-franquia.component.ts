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
import {ApiService} from '../../time/api.service';

@Component({
  selector: 'app-contagem-por-franquia',
  templateUrl: './contagem-por-franquia.component.html',
  styleUrls: ['./contagem-por-franquia.component.css'],
  providers: [MessageService, ApiService],
  imports: [
    Card,
    TableModule,
    Button,
    Toast,
    DatePipe,
    DatePicker,
    ReactiveFormsModule,
    NgIf
  ]
})

export class ContagemPorFranquiaComponent implements OnInit {

  contagem: { franquia: string, quantidade: number }[] = [];

  data = new FormControl('', Validators.required);
  enviado = false;

  constructor(private apiService: ApiService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

  }

  consultarTimeDaData() {
    const intervalo = this.data.value;
    const dataFormatada: { dataInicio?: string; dataFim?: string} = {};

    if (intervalo != null && intervalo[0]) {
      dataFormatada.dataInicio = moment(intervalo[0]).format('YYYY-MM-DD');
    }
    if (intervalo != null && intervalo[1]) {
      dataFormatada.dataFim    = moment(intervalo[1]).format('YYYY-MM-DD');
    }

    this.apiService.contagemPorFranquia(dataFormatada)
      .pipe(catchError(error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error?.error?.message});
        return error;
      }))
      .subscribe(data => {
        this.contagem = Object
          .entries(data)
          .map(([franquia, quantidade]) => ({ franquia, quantidade: quantidade as number }));
      });

  }

  isCampoDataInvalido(): boolean {
    const control = this.data;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || this.enviado)
    );
  }

}

