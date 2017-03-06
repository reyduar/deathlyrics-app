// ====== ariel duarte ======
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { AppComponent }  from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { ListComponent } from './components/home/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/detail/details.component';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() ],
  declarations: [ AppComponent, ListComponent, FooterComponent, AddComponent, DetailsComponent, AboutComponent ],
  providers: [ appRoutingProviders ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
