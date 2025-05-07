import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class IntegranteService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `api/integrante`;
  }

  listar(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

  salvar(integrante: any) {
    return this.httpClient.post(`${this.url}`, integrante);
  }
}


export interface Integrante {
  id: string;
  nome?: string;
  funcao?: any;
}
