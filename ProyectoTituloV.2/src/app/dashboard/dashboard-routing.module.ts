import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard';
import { LoginComponent} from './components/auth/login/login.component';
import { RegisterComponent} from './components/auth/register/register.component';
import { AuxilianteComponent} from './components/auxiliar/auxiliante/auxiliante.component';
import { RegistroAuxiliarComponent} from './components/auxiliar/registro-auxiliar/registro-auxiliar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AvatarComponent} from './components/avatar/avatar.component';
import { UserMeComponent} from './components/user/user-me/user-me.component';
import { UserHelpComponent} from './components/user/user-help/user-help.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '',
    component: DashboardPage,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path:'auxiliante',
        component: AuxilianteComponent
      },
      {
        path:'registerAuxiliar',
        component: RegistroAuxiliarComponent
      },
      {
        path:'overview',
        component: OverviewComponent
      },
      {
        path:'user_me',
        component:UserMeComponent
      },
      {
        path:'user_help',
        component: UserHelpComponent
      }
    ]
  },
  {
    path:'',
    component:DashboardPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
