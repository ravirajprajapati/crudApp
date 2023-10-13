import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './Modals/user.modal';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crudApp';
  userForm!: FormGroup;
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatTable) table!: MatTable<User>;
  displayedColumns: string[] = ['userName', 'lastName', 'email', 'action'];
  updateData!: User;
  isTable: boolean = false;
  isSave: boolean = false;

  tableData: User[] = [
    {
      id: 0,
      firstName: 'abc',
      lastName: 'abc',
      email: 'abc@gmail.com',
    },
    {
      id: 1,
      firstName: 'xyz',
      lastName: 'xyz',
      email: 'xyz@gmail.com',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.tableData.push(this.userForm.value);
      this.userForm.reset();
      this.isTable = false;
      this.dataSource = new MatTableDataSource(this.tableData);
    }
  }

  deleteData(data: User) {
    this.tableData = this.tableData.slice().filter((item) => {
      return item.id !== data.id;
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.table.renderRows();

    if (this.tableData.length == 0) {
      this.isTable = true;
    }
  }

  editData(data: User) {
    console.log(data);
    if (data) {
      this.updateData = data;
      this.userForm.get('firstName')?.setValue(data.firstName);
      this.userForm.get('lastName')?.setValue(data.lastName);
      this.userForm.get('email')?.setValue(data.email);
      this.isSave = true;
    }
  }

  onUpdate() {
    console.log(this.userForm.value);
    this.tableData.forEach((data) => {
      if (data.id == this.updateData.id) {
        data.firstName = this.userForm.get('firstName')?.value;
        data.lastName = this.userForm.get('lastName')?.value;
        data.email = this.userForm.get('email')?.value;
      }
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.table.renderRows();
    this.isSave = false;
    this.userForm.reset();
  }
}
