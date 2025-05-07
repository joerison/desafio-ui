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
  selector: 'app-time-da-data',
  templateUrl: './time-da-data.component.html',
  styleUrls: ['./time-da-data.component.css'],
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

export class TimeDaDataComponent implements OnInit {

  integrantes = [];
  data = new FormControl('', Validators.required);
  enviado = false;

  constructor(private apiService: ApiService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

  }

  consultarTimeDaData() {
    const data = this.data?.value;
    if (data) {
      const dataFormatada = {data: moment(data).format('YYYY-MM-DD')};
      this.apiService.consultarTimeDaData(dataFormatada)
        .pipe(catchError(error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error?.error?.message});
          return error;
        }))
        .subscribe(data => {
          this.integrantes = data.integrantes;
      });
    }

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

