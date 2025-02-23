import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent, CommonModule, NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  arrUsers: User[];
  userService = inject(UsersService);
  page!: number;
  user?: User;

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
