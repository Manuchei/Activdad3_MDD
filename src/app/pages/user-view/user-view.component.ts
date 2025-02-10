import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { User } from './../../interfaces/user';
import { UsersService } from './../../services/users.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [BotoneraComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  miUsuario!: User;

  UsersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (paramas: any) => {
      let _id: string = paramas._id as string;

      try {
        this.miUsuario = await this.UsersService.getById(_id);
      } catch (err) {
        console.log('Error al llamar a la API: ' + err);
      }
    });
  }
}
