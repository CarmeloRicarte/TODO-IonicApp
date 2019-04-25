import { Component } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import { Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor( public todoService: TodoService,
               private router: Router,
               private alertController: AlertController,
              ) {
  }
  async agregarLista() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            } else {
              // crear la lista
              const listaId = this.todoService.crearLista(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
          }
        }
      ]
    });
    alert.present();
  }

}


