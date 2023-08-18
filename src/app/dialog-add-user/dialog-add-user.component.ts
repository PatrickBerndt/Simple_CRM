import { Component, inject } from '@angular/core';
import {  Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  private firestore: Firestore = inject(Firestore)
  loading: boolean = false; 

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){
    
  }

  onNoClick(){

  }


  saveUser(){
    this.loading = true;
    this.birthDate ? (this.user.birthDate = this.birthDate.getTime()) : ('');

    const userCollection = collection(this.firestore, 'users')
    addDoc(userCollection, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });

  }
}
