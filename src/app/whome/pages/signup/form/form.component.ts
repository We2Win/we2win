import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  signupForm: FormGroup;
  private user: User;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      ID: new FormControl(),
      // PW: new FormGroup({
        Password: new FormControl(),
        confirmPassword: new FormControl(),
      // }),
      Name: new FormControl(),
      CP: new FormControl(),
      ULevel: new FormControl(),
      UPoint: new FormControl(),
      Email: new FormControl(),
      Hope: new FormControl(),
      Site: new FormControl(),
      Location: new FormControl(),
      Amount: new FormControl(),
      OP: new FormControl(),
      HP: new FormControl(),
      OA: new FormControl(),
      HA: new FormControl(),
      InfoA: new FormControl(),
      AAmount: new FormControl(),
      ASns: new FormControl(),
      UWord: new FormControl(),
    });
  }

  onSubmit() {
    // if (this.signupForm.valid) {
    this.user = this.signupForm.value;
    console.log(this.user);
    // }
  }

}
