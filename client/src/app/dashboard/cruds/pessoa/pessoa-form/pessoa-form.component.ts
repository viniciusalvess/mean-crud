import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/primeng';
import {PessoaService} from '../../../../services/pessoa.service';
import {MsgService} from '../../../../services/msg.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
  providers: [PessoaService, MsgService, MessageService]
})
export class PessoaFormComponent implements OnInit {
  private frmPessoa: FormGroup;
  private msgs: Message[] = [];
  private dtNascimento: Date;
  private isEditing: boolean;

  constructor(
    private frmBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private msgService: MsgService,
    private routeParams: ActivatedRoute
  ) { }

  ngOnInit() {
    this.frmPessoa = this.frmBuilder.group({
      nome : [null, [Validators.required, Validators.minLength(1)]],
      nascimento : [null, [Validators.required]]
    });

    let p;
    this.routeParams.params.subscribe(params => p = params['id']);
    if (p) {
      this.pessoaService.edit(p).subscribe((resp: any) => {
        this.isEditing = true;
        this.dtNascimento = new Date(resp.nascimento);
        this.frmPessoa.patchValue({nome: resp.nome});
      }, err => {
        this.msgService.error(err.toString());
        console.log(err);
      });
    }
  }

  onSubmit() {
    if (this.isEditing) {
      this.doUpdate();
    } else {
      this.doSave();
    }
  }

  doSave() {
    this.pessoaService.salve(this.frmPessoa.getRawValue()).subscribe((ret: Response) => {
      this.msgService.success(ret.toString());
      this.frmPessoa.reset();
    }, err => {
      this.msgService.error(err.toString());
    });
  }

  doUpdate() {
    this.pessoaService.update(this.frmPessoa.getRawValue()).subscribe((ret: Response) => {
      this.msgService.success(ret.toString());
      this.frmPessoa.reset();
    }, err => {
      this.msgService.error(err.toString());
    });
  }
}
