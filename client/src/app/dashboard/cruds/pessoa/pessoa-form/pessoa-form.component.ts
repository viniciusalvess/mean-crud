import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/primeng';
import {PessoaService} from '../../../../services/pessoa.service';
import {MsgService} from '../../../../services/msg.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {I18nService} from '../../../../services/i18n.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
  providers: [PessoaService, MsgService, MessageService, I18nService]
})
export class PessoaFormComponent implements OnInit {
  private frmPessoa: FormGroup;
  private msgs: Message[] = [];
  private dtNascimento: Date;
  private isEditing: boolean;
  private editId: any;
  private cpfCnpjMask: string;
  private cpfCnpjLabel: string;
  private rgInscLabel: string;
  private nascimentoLabel: string;
  private nomeFantasiaLabel: string;
  private nomeLabel: string;
  private tipoPessoa: string;
  private pt_BR: any;

  changeFromLabels(evt) {
    console.log('changeFromLabels', evt);
    if (evt === 'Física') {
      this.cpfCnpjLabel = 'CPF';
      this.cpfCnpjMask = '999.999.999-99';
      this.rgInscLabel = 'RG';
      this.nomeFantasiaLabel = 'Apelido';
      this.nomeLabel = 'Nome';
      this.nascimentoLabel = 'Nascimento';
    } else {
      this.cpfCnpjLabel = 'CNPJ';
      this.cpfCnpjMask = '99.999.999/9999-99';
      this.rgInscLabel = 'Insc. Estadual';
      this.nomeFantasiaLabel = 'Nome Fantasia';
      this.nomeLabel = 'Razão Social';
      this.nascimentoLabel = 'Abertura';
    }
  }

  constructor(
    private frmBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private msgService: MsgService,
    private routeParams: ActivatedRoute,
    private router: Router,
    private i18n: I18nService
  ) { }

  ngOnInit() {
    this.pt_BR = this.i18n.pt_BR_PrimeNgCalendar;
    this.isEditing = false;
    this.frmPessoa = this.frmBuilder.group({
      nome : [null, [Validators.required, Validators.minLength(1)]],
      nascimento : [null, [Validators.required]],
      cpfCnpj: [null, []],
      rgInsc: [null, []],
      nomeFantasia: [null, []],
      tipo: [null, [Validators.required]],
    });


    this.routeParams.params.subscribe(params => this.editId = params['id']);
    if (this.editId) {
      this.isEditing = true;
      this.pessoaService.edit(this.editId).subscribe((resp: any) => {
        this.dtNascimento = new Date(resp.nascimento);
        this.tipoPessoa = resp.tipo;

        this.frmPessoa.patchValue({
          nome: resp.nome,
          tipo: resp.tipo,
          cpfCnpj: resp.cpfCnpj,
          rgInsc: resp.rgInsc,
          nomeFantasia: resp.nomeFantasia
        });

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
      this.router.navigate(['/dashboard/principal/pessoa', { message: 'Pessoa atualizada com sucesso ! ' + ret.nome }]);
    }, err => {
      this.msgService.error(err.toString());
    });
  }
}
