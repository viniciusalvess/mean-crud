import {AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MenuItem, Message } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from '../../../services/msg.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
  providers: [MsgService, MessageService, PessoaService, ConfirmationService]
})
export class PessoaComponent implements OnInit {

  private posts: any;
  private pessoas: any;
  private selectedPessoa: any;
  private items: MenuItem[];
  private msgs: Message[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private msgService: MsgService,
    private pessoaService: PessoaService,
    private confirmService: ConfirmationService
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params.message);
    // this.msgService.success(this.route.snapshot.params['message']);
    this.refreshGrid();

    this.items = [
      {label: 'Editar', icon: 'fa-search',
        command: (event) => {
          this.router.navigateByUrl('/dashboard/principal/pessoa/' + this.selectedPessoa._id  + '/edit');
        }
      },
      {label: 'Excluir', icon: 'fa-close', command: (event) => { this.deleteConfirm(); } }
    ];
  }


  refreshGrid() {
    this.http.get('/api/pessoa/index').subscribe(people => {
      this.pessoas = people;
      this.msgService.success(this.route.snapshot.params.message); // melhorar isso aqui
    }, (errors) => {
      console.log(errors);
    });
  }

  deleteConfirm() {
    this.confirmService.confirm({
      message: 'Deseja realmente excluir o registro ?',
      accept: () => {
        this.pessoaService.remove(this.selectedPessoa._id).subscribe((del: any) => {
          this.refreshGrid();
          this.msgService.success(del);
        }, (errors: any) => {
          this.msgService.error(errors);
          console.log('Erro ao excluir pessoa: ', errors);
        });
      }
    });
  }
}
