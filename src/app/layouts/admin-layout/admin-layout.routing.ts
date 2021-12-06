import { Routes } from '@angular/router';

import { ProfileComponent } from '../../pages/user/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'tasks',
    loadChildren: () => import('./../../pages/tasks/tasks.module').then(m => m.TasksModule)
  },
];
