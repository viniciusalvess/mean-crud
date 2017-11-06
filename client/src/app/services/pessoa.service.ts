import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Pessoa} from '../dtos/Pessoa';

@Injectable()
export class PessoaService {

  constructor(private http: HttpClient) { }

  salve(pessoa: Pessoa) {
    return this.http.post('/api/pessoa/create', pessoa);
  }

  edit(aId: any) {
    return this.http.post('api/pessoa/edit', {id: aId});
  }

  update(pessoa: Pessoa) {
    return this.http.post('/api/pessoa/update', pessoa);
  }

  delete(pessoa: Pessoa) {
    return this.http.post('/api/pessoa/delete', pessoa);
  }
}
