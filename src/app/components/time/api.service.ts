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

  integranteMaisUsado(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/integrante-mais-usado`, {params: params});
  }

  franquiaMaisFamosa(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/franquia-mais-famosa`, {params: params});
  }

  funcaoMaisComum(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/funcao-mais-comum`, {params: params});
  }

  timeMaisComum(params: any): Observable<any> {
    return this.httpClient.get(`${this.url}/time-mais-comum`, {params: params});
  }

}

interface DataParams {
  dataInicio?: string;
  dataFim?: string;
}

