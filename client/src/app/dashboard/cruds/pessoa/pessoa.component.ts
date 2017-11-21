import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfirmationService, DataTable, LazyLoadEvent, MenuItem, Message} from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from '../../../services/msg.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaService } from '../../../services/pessoa.service';
import {I18nService} from '../../../services/i18n.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  providers: [MsgService, MessageService, PessoaService, ConfirmationService, I18nService]
})
export class PessoaComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;

  private posts: any;
  private pessoas: any;
  private selectedPessoa: any;
  private items: MenuItem[];
  private msgs: Message[];
  private totalRecords: number;
  private pt_BR: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private msgService: MsgService,
    private pessoaService: PessoaService,
    private confirmService: ConfirmationService,
    private i18n: I18nService
  ) { }

  ngOnInit() {
    this.pt_BR = this.i18n.pt_BR_PrimeNgCalendar;
    // console.log(this.route.snapshot.params.message);
    // this.msgService.success(this.route.snapshot.params['message']);
    // this.refreshGrid();

    this.items = [
      {label: 'Editar', icon: 'fa-pencil',
        command: (event) => {
          this.onTableDblClick();
        }
      },
      {label: 'Excluir', icon: 'fa-trash', command: (event) => { this.deleteConfirm(); } }
    ];
  }


  // refreshGrid() {
  //   this.http.get('/api/pessoa/index').subscribe(people => {
  //     this.pessoas = people;
  //     this.msgService.success(this.route.snapshot.params.message); // melhorar isso aqui
  //   }, (errors) => {
  //     console.log(errors);
  //   });
  // }

  deleteConfirm() {
    this.confirmService.confirm({
      message: 'Deseja realmente excluir o registro ?',
      accept: () => {
        this.pessoaService.remove(this.selectedPessoa._id).subscribe((del: any) => {
          this.dataTableComponent.reset();
          this.msgService.success(del);
        }, (errors: any) => {
          this.msgService.error(errors);
          console.log('Erro ao excluir pessoa: ', errors);
        });
      }
    });
  }

  onTableDblClick() {
    this.router.navigateByUrl('/dashboard/principal/pessoa/' + this.selectedPessoa._id  + '/edit');
  }

  onNascimentoClearClick(evt) {
    delete this.dataTableComponent.filters.nascimento; // work around to clear custom filter, this is a bug on primeng 4.3.0
    this.dataTableComponent.onLazyLoad.emit();
  }

  loadPage(event: LazyLoadEvent) {
    console.log(event);
    console.log(this.dataTableComponent.filters);
    this.http.post('/api/pessoa/search', event).subscribe((people: any) => {
      this.pessoas = people.records;
      this.totalRecords = people.count;
      // console.log(this.pessoas.length());
      this.msgService.success(this.route.snapshot.params.message); // melhorar isso aqui
    }, (errors) => {
      console.log(errors);
    });
  }
}
