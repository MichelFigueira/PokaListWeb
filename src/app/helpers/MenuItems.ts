export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  admin: boolean;
}

export const MenuItems: RouteInfo[] = [
  { path: '/tasks', title: 'Tasks',  icon:'ni-bullet-list-67 text-red', class: '', admin: false },
  { path: '/profile', title: 'Profile',  icon:'ni-single-02 text-yellow', class: '', admin: false },
  { path: '#', title: 'Add Poka',  icon:'ni-spaceship text-green', class: '', admin: true },
];
