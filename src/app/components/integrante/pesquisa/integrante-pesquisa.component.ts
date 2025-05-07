import {Component, OnInit} from '@angular/core';
import {IntegranteService} from '../integrante.service';
import {Card} from 'primeng/card';
import {catchError} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {IntegranteCadastroComponent} from '../cadastro/integrante-cadastro.component';
import {Button} from 'primeng/button';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-integrante-pesquisa',
    templateUrl: './integrante-pesquisa.component.html',
    styleUrls: ['./integrante-pesquisa.component.css'],
    providers: [MessageService],
    imports: [
        Card,
        TableModule,
        Dialog,
        IntegranteCadastroComponent,
        Button,
        Toast
    ]
})

export class IntegrantePesquisaComponent implements OnInit {

    integrantes = [];
    cadastroIntegranteDialog = false;

    constructor(private integranteService: IntegranteService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.listarIntegrantes();
    }

    abrirModalNovoIntegrante() {
        this.cadastroIntegranteDialog = true;
    }

    listarIntegrantes() {
        this.integranteService.listar()
            .pipe(catchError(error => {
                console.error(error);
                return error;
            })).subscribe(value => {
            this.integrantes = value;
        })
    }

    novoIntegranteCadastrado(){
        this.listarIntegrantes();
        this.messageService.add({
            severity: 'success',
            summary: 'Confirmação',
            detail: 'Integrante salvo com sucesso!'
        });
        this.cadastroIntegranteDialog = false;
    }

}

