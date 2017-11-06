import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';

@Injectable()
export class MsgService {

  constructor(private messageService: MessageService) { }

  success(aMsg: string) {
    this.messageService.add({severity: 'success', summary: 'Sucesso', detail: aMsg });
  }

  error(aMsg: string) {
    this.messageService.add({severity: 'error', summary: 'Erro', detail: aMsg });
  }

  warn(aMsg: string) {
    this.messageService.add({severity: 'warn', summary: 'Atenção', detail: aMsg });
  }

  info(aMsg: string) {
    this.messageService.add({severity: 'info', summary: 'Informação', detail: aMsg });
  }
}
