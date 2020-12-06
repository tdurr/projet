import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientState } from '../store/states/client-state';
import { Store } from '@ngxs/store';
import { AddJWT, AddLogin } from './../../app/store/actions/client-action';

@Component({
  selector: 'app-client-hub',
  templateUrl: './client-hub.component.html',
  styleUrls: ['./client-hub.component.css']
})
export class ClientHubComponent implements OnInit {

  public login: Observable<string>;
  public userConnected: boolean = true;

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.login = this.store.select(ClientState.getLogin);

    this.store.select(ClientState.getTokenJwt).subscribe(() =>
      {
        this.userConnected = true;
      });
  }

  onDisconnect() {
    this.store.dispatch(new AddJWT(''));
    this.store.dispatch(new AddLogin(''));
    this.userConnected = false;
  }

}
