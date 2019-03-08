import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WebviewDirective} from './directives/webview.directive';
import {CurrencyMaskModule} from 'ng2-currency-mask';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {KlantService} from './services/klant-service';
import {CommandService} from './services/command-service';
import {InitializeCommandsResolver} from './resolvers/initialize-commands-resolver';
import {ProductService} from './services/product-service';
import {AankoopService} from './services/aankoop-service';
import {KassaService} from './services/kassa-service';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import {GastAanmakenDialogComponent} from './components/home/gast-aanmaken-dialog/gast-aanmaken-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RekeningDialogComponent} from './components/home/rekening-dialog/rekening-dialog.component';
import {KassaComponent} from './components/kassa/kassa.component';
import {BarComponent} from './components/bar/bar.component';
import {KassaTellenDialogComponent} from './components/kassa/kassa-tellen-dialog/kassa-tellen-dialog.component';
import { KassaAfsluitenDialogComponent } from './components/kassa/kassa-afsluiten-dialog/kassa-afsluiten-dialog.component';
import { ProductDialogComponent } from './components/bar/product-dialog/product-dialog.component';
import {KlantenComponent} from './components/klanten/klanten.component';
import {KlantDialogComponent} from './components/klanten/klant-dialog/klant-dialog.component';
import {ImageService} from './services/image-service';
import {BetaaldViaOverschrijvingDialogComponent} from './components/kassa/betaald-via-overschrijving-dialog/betaald-via-overschrijving-dialog.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GastAanmakenDialogComponent,
    RekeningDialogComponent,
    WebviewDirective,
    KassaComponent,
    BarComponent,
    KlantenComponent,
    KassaTellenDialogComponent,
    KassaAfsluitenDialogComponent,
    ProductDialogComponent,
    KlantDialogComponent,
    BetaaldViaOverschrijvingDialogComponent
  ],
  imports: [
    CurrencyMaskModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PrettyJsonModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [InitializeCommandsResolver, CommandService, KlantService, ProductService, AankoopService, KassaService, ImageService],
  entryComponents: [GastAanmakenDialogComponent, RekeningDialogComponent, KassaTellenDialogComponent, KassaAfsluitenDialogComponent, ProductDialogComponent, KlantDialogComponent, BetaaldViaOverschrijvingDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
