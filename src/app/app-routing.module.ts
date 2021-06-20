import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatosComponent } from './contacts/cadastro-contatos/cadastro-contato.component';
import { ListagemContatosComponent } from './contacts/listagem-contatos/listagem-contatos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contatos',
    pathMatch: 'full'
  },
  {
    path: 'contatos',
    children: [
      {
        path: '',
        component: ListagemContatosComponent
      },
      {
        path: 'cadastro',
        component: CadastroContatosComponent,
        pathMatch: 'full'
      },
      {
        path: 'cadastro/edit/:id',
        component: CadastroContatosComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'contatos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
