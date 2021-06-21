import { HttpClient, HttpParams } from '@angular/common/http';
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

  editar(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(url + contato.id, contato);
  }

  listar(): Observable<Contato[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_sort', 'nome');
    httpParams = httpParams.set('_order', 'asc');
    return this.http.get<Contato[]>(url, {params: httpParams});
  }

  visualizar(id: number | undefined): Observable<Contato> {
    return this.http.get<Contato>(url + id); 
  }

  excluir(id: number | undefined): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
