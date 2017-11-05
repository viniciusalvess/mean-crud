import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MenuItem, Message } from 'primeng/primeng';
import { ContextMenu } from 'primeng/primeng';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private posts: any;
  private selectedPost1: any;
  private items: MenuItem[];
  private msgs: Message[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts => {
      this.posts = posts;
    }, (errors) => {
      console.log(errors);
    });

    this.items = [
      {label: 'Visualisar', icon: 'fa-search', command: (event) => console.log(this.selectedPost1)},
      {label: 'Excluir', icon: 'fa-close', command: (event) => console.log(this.selectedPost1)}
    ];
  }

}
