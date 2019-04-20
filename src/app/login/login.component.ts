import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: '',
    remember: false
  };

  constructor(public MatDialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log('User: ', this.user);
    this.MatDialogRef.close();
  }

}
