import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InitializeCommandsResolver} from './resolvers/initialize-commands-resolver';
import {KassaComponent} from './components/kassa/kassa.component';
import {BarComponent} from './components/bar/bar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {initialized: InitializeCommandsResolver}
  },
  {
    path: 'kassa',
    component: KassaComponent
  },
  {
    path: 'bar',
    component: BarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
