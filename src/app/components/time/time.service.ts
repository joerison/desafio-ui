import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TimeService {

    url: string;

    constructor(private httpClient: HttpClient) {
        this.url = `api/time`;
    }

    listar(): Observable<any> {
        return this.httpClient.get(`${this.url}`);
    }

    salvar(time: any) {
        return this.httpClient.post(`${this.url}`, time);
    }
}


export interface Time {
    id: string;
    nome?: string;
    integrantes?: any;
}
