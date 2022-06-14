import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagems';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema= new Tema()
  idTema: number

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['Entrar'])
    }

   this.idTema=this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getById(id).subscribe((resp: Tema)=>{
      this.tema=resp
    })
  }

  deletar(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
