import {User} from "../models/User.model";
import {Subject} from "rxjs/Subject";

export class UserService{
  private users: User[] = [
    {
      firstName: 'Will',
      lastName: 'Alexander',
      email: 'lamine@gmail.com',
      drinkPreference: 'jus d\'orange',
      hobbies: ['coder', 'boire du café', 'netflix']
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }
}
