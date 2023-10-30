import { NgModule } from '@angular/core';
import { RouterModule, Routes ,PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'main',
    loadChildren: () => import('./view/main/main.module').then(m => m.MainModule)
  },
  
  
  // if url incorrect redirect to login
  // { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
