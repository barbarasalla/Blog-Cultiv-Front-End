import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { find } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagems';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  postagem: Postagem = new Postagem()
  usuario: User = new User()
  listaPostagens: Postagem[]

  idUsuario: 0;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private authService: AuthService

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert("Sua sessão expirou faça o login novamente.")
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.getPostagens()
    this.idUsuario= id
    this.findByIdUsuario()
    this.getPostagens()
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.usuario = resp
      console.log(this.idUsuario)
    })
  }

  getPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens=resp
    })
  }

}
