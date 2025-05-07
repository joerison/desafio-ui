import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ApiService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `api`;
  }

  consultarTimeDaData(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/time-da-data`, {params: params});
  }

  contagemPorFranquia(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/contagem-por-franquia`, {params: params});
  }

  contagemPorFuncao(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/contagem-por-funcao`, {params: params});
  }

}

interface DataParams {
  dataInicio?: string;
  dataFim?: string;
}

