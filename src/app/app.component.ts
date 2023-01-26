import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: any;
  todos$: Observable<any>;
  todos: Array<any>;
  todotext = '';

  constructor(private firestore: Firestore) {
    const collec = collection(firestore, 'todos');
    this.todos$ = collectionData(collec);

    this.todos$.subscribe((newTodos) => {
      console.log('Neue Todos sind', newTodos);
      this.todos = newTodos;
    });
  }

  addNewTodo() {
    const collec = collection(this.firestore, 'todos');
    setDoc(doc(collec), {
      name: this.todotext,
    });
    this.todotext = '';
  }
}
