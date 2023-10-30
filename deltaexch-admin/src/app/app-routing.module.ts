import { NgModule } from '@angular/core';
import { Routes, RouterModule ,PreloadAllModules} from '@angular/router';
// import { MainModule } from './views/main/main.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      

    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
