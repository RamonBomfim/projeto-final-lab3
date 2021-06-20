import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../shared/models/contato';

const url = 'http://localhost:3000/contatos/';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(private http: HttpClient) { }

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(url, contato);
  }

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(url)
  }

  listarPorId(id: number | undefined): Observable<Contato> {
    return this.http.get<Contato>(`${url}/${id}`);
  }

  excluir(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${url}/${id}`)
  }
}
