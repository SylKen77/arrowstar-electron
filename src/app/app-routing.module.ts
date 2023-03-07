import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InitializeCommandsResolver} from './resolvers/initialize-commands-resolver';
import {KassaComponent} from './components/kassa/kassa.component';
import {BarComponent} from './components/bar/bar.component';
import {KlantenComponent} from './components/klanten/klanten.component';
import {HistoriekComponent} from './components/historiek/historiek.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {initialized: InitializeCommandsResolver}
  },
  {
    path: 'kassa',
    component: KassaComponent,
    resolve: {initialized: InitializeCommandsResolver}
  },
  {
    path: 'klanten',
    component: KlantenComponent,
    resolve: {initialized: InitializeCommandsResolver}
  },
  {
    path: 'bar',
    component: BarComponent,
    resolve: {initialized: InitializeCommandsResolver}
  },
  {
    path: 'historiek',
    component: HistoriekComponent,
    resolve: {initialized: InitializeCommandsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
