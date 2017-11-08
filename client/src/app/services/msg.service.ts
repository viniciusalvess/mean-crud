import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {isUndefined} from 'util';

@Injectable()
export class MsgService {

  constructor(private messageService: MessageService) { }

  success(aMsg: string) {
    this.doMessage('success', 'Sucesso', aMsg);
  }

  error(aMsg: string) {
    this.doMessage('error', 'Erro', aMsg);
  }

  warn(aMsg: string) {
    this.doMessage('warn', 'Atenção', aMsg);
  }

  info(aMsg: string) {
    this.doMessage('info', 'Informação', aMsg);
  }

  private doMessage(aSeverity, aSummary, aDetail) {
    if (isUndefined(aDetail)) {
      return;
    }
    this.messageService.add({severity: aSeverity, summary: aSummary, detail: aDetail});
  }
}
