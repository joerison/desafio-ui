import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Integrante, IntegranteService} from '../integrante.service';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FranquiaService} from '../../franquia/franquia.service';
import {Button} from 'primeng/button';
import {Textarea} from 'primeng/textarea';
import {Fluid} from 'primeng/fluid';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';

@Component({
    selector: 'app-integrante-cadastro',
    templateUrl: './integrante-cadastro.component.html',
    styleUrls: ['./integrante-cadastro.component.css'],
    imports: [
        Card,
        ReactiveFormsModule,
        InputText,
        NgIf,
        Select,
        Button,
        Textarea,
        Fluid,
        IconField,
        InputIcon,
        JsonPipe
    ],
    providers: [IntegranteService, FranquiaService],
})

export class IntegranteCadastroComponent implements OnInit {

    formulario: FormGroup;
    enviado = false;
    salvando = false;
    franquias: any[] | undefined;
    funcoes: any[] | undefined;

    @Output()
    integranteCadastradoEvent: EventEmitter<any> = new EventEmitter();

    constructor(private integranteService: IntegranteService,
                private franquiaService: FranquiaService,
                private formBuilder: FormBuilder) {

        this.formulario = this.formBuilder.group({
            id: [''],
            nome: ['', Validators.required],
            funcao: this.formBuilder.group({
                id: ['', Validators.required],
                franquia: this.formBuilder.group({
                    id: ['', Validators.required]
                })
            }),
        });

        this.franquiaService.listar().subscribe(franquias => this.franquias = franquias);

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

        let integrante: any = { ...this.formulario?.getRawValue() };
        this.salvando = true;
        this.salvarIntegrante(integrante)

    }

    salvarIntegrante(integrante: Integrante){
        this.integranteService.salvar(integrante)
            .pipe(catchError(error => {
                this.salvando = false;
                console.error(error)
                return error;
            }))
            .subscribe((data: any)=> {
                this.formulario.reset();
                this.salvando = false;
                this.enviado = false;
                console.log(data);
                this.integranteCadastradoEvent.emit();
            });
    }

}

