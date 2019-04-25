import {Component} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Lista} from '../../models/lista.model';
import {ListaItem} from '../../models/lista-item.model';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.page.html',
    styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
    lista: Lista;
    // referenciado en el input text para que al pulsar enter,
    // se añada a la lista
    nombreItem = '';

    constructor(public todoService: TodoService,
                private route: ActivatedRoute) {

        /* la siguiente constante sirve para leer el id de la url
        /* en el get ponemos 'listaId' ya que es el mismo que hemos puesto
        /* en tabs.router.module
        */

        const listaId = this.route.snapshot.paramMap.get('listaId');

        // A continuación, decimos que la lista es igual a la lista con su id concreto
        this.lista = this.todoService.obtenerLista(listaId);
        console.log(this.lista);
    }

    agregarItem() {
        if (this.nombreItem.length === 0) {
            return;
        }
        // creamos el item
        const nuevoItem = new ListaItem(this.nombreItem);
        // añadimos el item a la lista
        this.lista.items.push(nuevoItem);
        // purgamos el nombre para poder poner otro nuevo
        this.nombreItem = '';
        // lo guardamos en el localStorage para que no se pierda
        this.todoService.guardarStorage();
    }

    cambioCheck(item: ListaItem) {
        // cuenta cuantos elementos de la lista están pendientes cada vez que se cambia el check
        const pendientes = this.lista.items
            .filter(itemData => !itemData.completado)
            .length;
        console.log({pendientes});
        if (pendientes === 0) {
            this.lista.terminadaEn = new Date();
            this.lista.terminada = true;
        } else {
            this.lista.terminadaEn = null;
            this.lista.terminada = false;
        }
        this.todoService.guardarStorage();
        console.log(this.todoService.listas);
    }
    borrarItem(i: number) {
        this.lista.items.splice(i, 1);
        this.todoService.guardarStorage();
    }
}
