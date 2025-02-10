import { Routes } from '@angular/router';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: UserListComponent },
  { path: 'newuser', component: UserFormComponent },
  { path: 'user/:_id', component: UserViewComponent },
  { path: 'updateuser/:_id', component: UserFormComponent },
  { path: '**', component: Page404Component },
];
