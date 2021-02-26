import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './core/guards/login.guard.service';
import { AppURLS } from './shared/models/url.model';

const routes: Routes = [
  {
    path: AppURLS.LOGIN,
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuardService],
  },
  {
    path: AppURLS.HOME,
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuardService],
  },
  { path: '', redirectTo: AppURLS.HOME, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
