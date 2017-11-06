import {PessoaTipo} from '../util/enums/PessoaTipo';
import {Endereco} from './Endereco';
import {Sexo} from '../util/enums/Sexo';

export class Pessoa {
  nome: string;
  nascimento: Date;
  cpfCnpj: string;
  rgInsc: string;
  nomeFantasia: string;
  inscMunicipal: string;
  tipo: PessoaTipo;
  endereco: Endereco;
  enderecoCobranca: Endereco;
  sexo: Sexo;
  nomePai: string;
  nomeMae: string;
  pisPasep: string;
  nacionalidade: string;
  naturalidade: string;
  necessidadeEsp: string;
  deficiencia: string;
}
