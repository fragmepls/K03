import { ErrorComponent } from './error/error.component';
import { ArtikleFormComponent } from './artikle-form/artikle-form.component';
import { ArtikelListComponent } from './artikel-list/artikel-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'artikelList', component: ArtikelListComponent },
  { path: 'editArtikle/:id', component: ArtikleFormComponent },
  { path: 'newArtikle', component: ArtikleFormComponent },
  { path: 'error/:param', component: ErrorComponent },
  { path: 'error/:param/:id', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
