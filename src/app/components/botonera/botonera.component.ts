import { Router, RouterLink } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, inject, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botonera',
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css',
})
export class BotoneraComponent {
  UsersService = inject(UsersService);
  router = inject(Router);

  @Input() _id: string;
  @Input() parent: string;

  constructor() {
    this._id = '';
    this.parent = '';
  }

  async borrarUser(_id: string) {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que deseas borrar al usuario: ${this._id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      try {
        const response = await this.UsersService.delete(_id);

        if (response._id) {
          await Swal.fire(
            '¡Borrado!',
            `Se ha borrado correctamente el usuario ${response.first_name} ${response.last_name}.`,
            'success'
          );

          if (this.parent === 'vuew') {
            this.router.navigate(['/home']);
          }
        }
      } catch (error) {
        await Swal.fire(
          'Error',
          'Hubo un problema al intentar borrar el usuario.',
          'error'
        );
      }
    }
  }
}
