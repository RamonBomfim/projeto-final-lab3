import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContatosService } from "src/app/core/contatos.service";
import { Contato } from "src/app/shared/models/contato";

@Component({
    selector: 'app-listagem-contatos',
    templateUrl: './listagem-contatos.component.html',
    styleUrls: ['./listagem-contatos.component.css']
})
export class ListagemContatosComponent implements OnInit {

    panelOpenState = false;

    contatos!: Contato[];
    id!: number;

    constructor(
        private contatosService: ContatosService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];

        this.contatosService.listar().subscribe((contatos: Contato[]) => this.contatos = contatos);
    }

    excluir(contatoId: number | undefined): void {
        this.contatosService.excluir(contatoId).subscribe({
            next: () => {
                alert("Contato apagado com sucesso!");
                this.contatosService.listar().subscribe((contatos: Contato[]) => this.contatos = contatos);
            },
            error: err => alert("Não foi possível apagar este contato, tente novamente mais tarde!")
        })
    }
}