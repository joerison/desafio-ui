import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FranquiaService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `api/franquia`;
  }

  listarFuncoes(franquiaId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${franquiaId}/funcoes`);
  }

  listar(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

}

export interface Funcao {
  id: string;
  descricao?: string;
  franquia?: any;
}
