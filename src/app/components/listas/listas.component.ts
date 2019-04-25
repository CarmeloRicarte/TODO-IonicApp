import {Component, Input, ViewChild} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Lista} from '../../models/lista.model';
import {Router} from '@angular/router';
import {AlertController, IonList} from '@ionic/angular';

@Component({
    selector: 'app-listas',
    templateUrl: './listas.component.html',
    styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
    @Input() terminada = true;
    @ViewChild(IonList) lista: IonList;
    constructor(public todoService: TodoService,
                private router: Router,
                private alertController: AlertController) {
    }

    listaSeleccionada(lista: Lista) {
        console.log(lista);
        if (this.terminada) {
            this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id})`);
        } else {
            this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id})`);
        }
    }

    borrarLista(lista: Lista) {
        this.todoService.borrarLista(lista);
    }

    async editarLista(lista: Lista) {
        const alert = await this.alertController.create({
            header: 'Editar lista',
            inputs: [
                {
                    name: 'titulo',
                    type: 'text',
                    value: `${lista.titulo}`,
                    placeholder: 'Editar lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar');
                        this.lista.closeSlidingItems();
                    }
                },
                {
                    text: 'Editar',
                    handler: (data) => {
                        console.log(data);
                        if (data.titulo.length === 0) {
                            return;
                        } else {
                            // editar la lista
                            lista.titulo = data.titulo;
                            this.todoService.guardarStorage();
                            this.lista.closeSlidingItems();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}
