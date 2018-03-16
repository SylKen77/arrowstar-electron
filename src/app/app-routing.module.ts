import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InitializeCommandsResolver} from './resolvers/initialize-commands-resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {initialized: InitializeCommandsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
