import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from "../shared/material/material.module";
import { CadastroContatosComponent } from "./cadastro-contatos/cadastro-contato.component";
import { ListagemContatosComponent } from "./listagem-contatos/listagem-contatos.component";
import { AppRoutingModule } from "../app-routing.module";
import { CamposModule } from "../shared/components/campos/campos.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CamposModule
  ],
  declarations: [
    CadastroContatosComponent,
    ListagemContatosComponent
  ]
})
export class ContatosModule { }