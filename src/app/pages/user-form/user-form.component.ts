import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  router = inject(Router);
  UsersService = inject(UsersService);
  ActivatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;
  tipo: string;

  constructor() {
    this.tipo = 'Insertar';

    this.userForm = new FormGroup(
      {
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      },
      []
    );
  }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.tipo = 'Actualizar';
        const userResponse: User = await this.UsersService.getById(params._id);

        this.userForm = new FormGroup(
          {
            _id: new FormControl(userResponse._id, []),
            first_name: new FormControl(userResponse.first_name, [
              Validators.required,
            ]),
            last_name: new FormControl(userResponse.last_name, [
              Validators.required,
            ]),
            username: new FormControl(userResponse.username, [
              Validators.required,
            ]),
            email: new FormControl(userResponse.username, [
              Validators.required,
            ]),
            image: new FormControl(userResponse.image, [Validators.required]),
            password: new FormControl(userResponse.password, [
              Validators.required,
            ]),
          },
          []
        );
      }
    });
  }
  getDataForm() {}
}
