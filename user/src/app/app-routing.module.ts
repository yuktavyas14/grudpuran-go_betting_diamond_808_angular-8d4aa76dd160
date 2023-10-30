import { NgModule } from '@angular/core';
import { Routes, RouterModule , PreloadAllModules} from '@angular/router';
// import { LoginComponent } from './views/auth/login/login.component';


const routes: Routes = [
{path:'',
redirectTo:'auth',
pathMatch:'full'
},
{
  path:'auth',
  loadChildren:() => import('./views/auth/auth.module').then(m=>m.AuthModule)
},
{
  path:'main',
  loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
