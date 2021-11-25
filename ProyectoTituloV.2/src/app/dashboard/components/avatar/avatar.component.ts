import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { UserProviderService } from '../../../core/providers/user/user-provider.service'
import jwt_decode from 'jwt-decode';


const ACCESS_TOKEN_KEY = 'my-access-token';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  public nombreUsuario;
  public apellidoUsuario;

  constructor(private userProviderService: UserProviderService) { }

  async ngOnInit() {
    try{
      const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
      const decodeToken: any = jwt_decode(token.value);
      const dataUsuario = await this.userProviderService.getUser(decodeToken.sub).toPromise();
      this.nombreUsuario = dataUsuario.nombre;
      this.apellidoUsuario = dataUsuario.apellido;
    }catch(err) {
      console.log(err);
    }
  }

}
