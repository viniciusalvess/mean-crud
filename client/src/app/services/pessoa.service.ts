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
    return this.http.get('api/pessoa/' + aId + '/edit');
  }

  update(aId: any, pessoa: Pessoa) {
      return this.http.put('/api/pessoa/' + aId, pessoa);
  }

  remove(aId: any) {
    return this.http.get('/api/pessoa/' + aId + '/delete');
  }
}
