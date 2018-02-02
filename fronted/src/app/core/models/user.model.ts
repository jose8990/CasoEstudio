export class User {
  username: string;
  password: string;
  authorities: Array<Object>;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  photo?: string;
}
