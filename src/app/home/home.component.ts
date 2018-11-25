import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from '../core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition()]
})
export class HomeComponent implements OnInit {

  public sliders: Array<any> = [];
  viewLogin = false;
  password: string;
  username: string;
  reuniones: any = [];
  actividadesCivicas: any = [];

  constructor(public router: Router,
              private loginService: LoginService,
              private modalService: NgbModal) {
    this.sliders.push(
      {
        imagesPath: 'assets/images/colegio1.jpg',
        label: 'Acto Civico Dia Del Maestro',
        text:
          'Palabras del Docente de Lenguaje.'
      },
      {
        imagesPath: 'assets/images/colegio2.jpg',
        label: 'Colegio Simon Bolivar A',
        text: 'Nueva Construccion'
      },
      {
        imagesPath: 'assets/images/colegio3.jpg',
        label: 'Baile por Alumnos del nivel basico',
        text:
          'Dia de la madre'
      }
    );
  }

  ngOnInit() {

  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }


  login(form) {
    this.loginService.login({
      username: form.value.username,
      password: form.value.password,
      rememberMe: false
    }).then(() => {
      this.router.navigate(['/dashboard']);
    }).catch((e) => console.log(e));
  }

  openModal() {
  }

}
