export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  admin: boolean;
}

export const MenuItems: RouteInfo[] = [
  { path: '/tasks', title: 'DEFAULT.TASKS',  icon:'ni-bullet-list-67 text-red', class: '', admin: false },
  { path: '/profile', title: 'DEFAULT.PROFILE',  icon:'ni-single-02 text-yellow', class: '', admin: false },
  { path: '#', title: 'SIDEBAR.ADDPOKA',  icon:'ni-spaceship text-green', class: '', admin: true },
];
