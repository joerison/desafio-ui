import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Time, TimeService} from '../time.service';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {FranquiaService} from '../../franquia/franquia.service';
import {Button} from 'primeng/button';
import {Fluid} from 'primeng/fluid';
import {DatePicker} from 'primeng/datepicker';
import {PrimeNG} from 'primeng/config';
import { PickListModule } from 'primeng/picklist';

import {IntegranteService} from '../../integrante/integrante.service';

@Component({
  selector: 'app-time-cadastro',
  templateUrl: './time-cadastro.component.html',
  styleUrls: ['./time-cadastro.component.css'],
  imports: [
    Card,
    ReactiveFormsModule,
    NgIf,
    Button,
    Fluid,
    DatePicker,
    PickListModule
  ],
  providers: [TimeService, FranquiaService],
})

export class TimeCadastroComponent implements OnInit {

  formulario: FormGroup;
  enviado = false;
  salvando = false;
  franquias: any[] | undefined;
  funcoes: any[] | undefined;

  @Output()
  timeCadastradoEvent: EventEmitter<any> = new EventEmitter();

  sourceIntegrantes: any[] = [];
  targetIntegrantes: any[] = [];

  constructor(private timeService: TimeService,
              private franquiaService: FranquiaService,
              private integranteService: IntegranteService,
              private primeng: PrimeNG,
              private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({
      id: [''],
      data: ['', Validators.required]
    });

    this.franquiaService.listar().subscribe(franquias => this.franquias = franquias);
    this.integranteService.listar().subscribe(integrantes => this.sourceIntegrantes = integrantes);

    this.formulario.get('funcao')?.get('franquia')?.valueChanges?.subscribe(franquia => {
      if (franquia?.id) {
        this.franquiaService.listarFuncoes(franquia?.id).subscribe(funcoes => this.funcoes = funcoes);
      }else{
        this.funcoes = [];
      }
    })

  }

  ngOnInit(): void {
  }

  isCampoInvalido(path: string): boolean {
    const control = this.formulario.get(path);
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || this.enviado)
    );
  }

  salvar() {
    this.enviado = true;

    if (this.formulario?.invalid){
      return
    }

    let time: any = { ...this.formulario?.getRawValue() };
    time.integrantes = this.targetIntegrantes;
    console.log(this.targetIntegrantes);
    this.salvando = true;
    this.salvarTime(time)

  }

  salvarTime(integrante: Time){
    this.timeService.salvar(integrante)
      .pipe(catchError(error => {
        this.salvando = false;
        this.timeCadastradoEvent.emit({sucesso: false, mensagem: error?.error?.message});
        return error;
      }))
      .subscribe((data: any)=> {
        this.formulario.reset();
        this.salvando = false;
        this.enviado = false;
        this.timeCadastradoEvent.emit({sucesso: true, mensagem: 'Time cadastrado com sucesso!'});
      });
  }

}

