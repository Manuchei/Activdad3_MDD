import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  arrUsers: User[];
  userService = inject(UsersService);

  constructor() {
    this.arrUsers = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.arrUsers = await this.userService.getAllWithPromises();
    } catch (err) {
      console.log('Error al inicializar la API: ' + err);
    }
  }
}
