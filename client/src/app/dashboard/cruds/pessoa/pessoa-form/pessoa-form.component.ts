import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/primeng';
import {PessoaService} from '../../../../services/pessoa.service';
import {MsgService} from '../../../../services/msg.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

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
  private editId: any;
  private cpfCnpjMask: String = '999.999.999-99';
  private cpfCnpjLabel: String = 'CPF';
  private rgInscLabel: String = 'RG';
  private nomeFantasiaLabel: String = 'Apelido';
  private nomeLabel: String = 'Nome';
  private _tipoPessoa: String = 'Física';
  get tipoPessoa(): String {
    return this._tipoPessoa;
  }

  set tipoPessoa(aTipoPessoa: String) {
    if (aTipoPessoa === 'Física') {
      this.cpfCnpjLabel = 'CPF';
      this.cpfCnpjMask = '999.999.999-99';
      this.rgInscLabel = 'RG';
      this.nomeFantasiaLabel = 'Apelido';
      this.nomeLabel = 'Nome';
    } else {
      this.cpfCnpjLabel = 'CNPJ';
      this.cpfCnpjMask = '99.999.999/9999-99';
      this.rgInscLabel = 'Insc. Estadual';
      this.nomeFantasiaLabel = 'Nome Fantasia';
      this.nomeLabel = 'Razão Social';
    }

    this._tipoPessoa = aTipoPessoa;
  }

  constructor(
    private frmBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private msgService: MsgService,
    private routeParams: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isEditing = false;
    this.frmPessoa = this.frmBuilder.group({
      nome : [null, [Validators.required, Validators.minLength(1)]],
      nascimento : [null, [Validators.required]],
      cpfCnpj: [null, []],
      rgInsc: [null, []],
      nomeFantasia: [null, []],
      tipo: [null, [Validators.required]],
    });

    //   tipo: String,
    //   sexo : {
    //   type : String,
    //     required : true,
    // enum: ['Masculino', 'Feminino']
    // },
    // nomePai : {
    //   type : String,
    //     required : true
    // },
    // nomeMae : {
    //   type : String,
    //     required : true
    // },
    // pisPasep: String,
    //   nacionalidade : {
    //   type : String,
    //     required : true
    // },
    // naturalidade : {
    //   type : String,
    //     required : true
    // },
    // necessidadeEsp : {
    //   type : String,
    // enum: ['Sim', 'Não'],
    // default : 'Não'
    // },
    // deficiencia : {
    //   type: String,
    //     required: function() {
    //     return (this.necessidadeEsp === 'Sim');
    //   }
    // }

    this.routeParams.params.subscribe(params => this.editId = params['id']);
    if (this.editId) {
      this.isEditing = true;
      this.pessoaService.edit(this.editId).subscribe((resp: any) => {
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
    this.pessoaService.update(this.editId, this.frmPessoa.getRawValue()).subscribe((ret: any) => {
      // this.msgService.success('Pessoa atualizada com sucesso ! ' + ret.nome);
      // this.frmPessoa.reset();
      this.router.navigate(['/dashboard/principal/pessoa', { message: 'Pessoa atualizada com sucesso ! ' + ret.nome }]);
    }, err => {
      this.msgService.error(err.toString());
    });
  }
}
