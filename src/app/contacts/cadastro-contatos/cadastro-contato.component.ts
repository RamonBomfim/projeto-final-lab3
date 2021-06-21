import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {  ActivatedRoute, Router } from "@angular/router";
import { ContatosService } from "src/app/core/contatos.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos-service.service";
import { Alerta } from "src/app/shared/models/alerta";
import { Contato } from "src/app/shared/models/contato";

@Component({
    selector: 'app-cadastro-contatos',
    templateUrl: './cadastro-contato.component.html',
    styleUrls: ['./cadastro-contato.component.css']
})
export class CadastroContatosComponent implements OnInit{

    cadastro!: FormGroup;
    contato!: Contato;
    id!: number;

    constructor(
        public validacao: ValidarCamposService,
        public dialog: MatDialog, 
        private fb: FormBuilder, 
        private contatoService: ContatosService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    get f() {
        return this.cadastro.controls
    }

    ngOnInit(): void{

        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.contatoService.visualizar(this.id)
            .subscribe((contato: Contato) => this.criarFormulario(contato));
        } else {
            this.criarFormulario(this.criarContatoEmBranco());
        }

    }

    submit(): void {
        this.cadastro.markAllAsTouched();

        if (this.cadastro.invalid) {
            return;
        }

        const contato = this.cadastro.getRawValue() as Contato;
        if (this.id) {
            contato.id = this.id;
            this.editar(contato);
        } else {
            this.salvar(contato);
        }
    }

    reiniciarForm(): void {
        this.cadastro.reset();
    }

    private criarFormulario(contato: Contato): void {
        this.cadastro = this.fb.group({
            nome: [contato.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
            whatsApp: [contato.whatsApp, [Validators.required, Validators.minLength(9), Validators.maxLength(13)]],
            email: [contato.email, [Validators.required, Validators.minLength(10)]],
            instagram: [contato.instagram, Validators.minLength(2)]
        });
    }

    private criarContatoEmBranco(): Contato {
        return {
            id: null,
            nome: null,
            whatsApp: null,
            email: null,
            instagram: null
        } as unknown as Contato;
    }

    private salvar(contato: Contato): void {
        this.contatoService.salvar(contato).subscribe(() => {
            const config = {
                data: {
                    btnSucesso: 'Ir para a Home',
                    btnCancelar: 'Novo contato',
                    corBtnCancelar: 'primary',
                    possuiBtnFechar: true
                } as Alerta
            };
            const dialogRef = this.dialog.open(AlertaComponent, config)
            dialogRef.afterClosed().subscribe((opcao: boolean) => {
                if (opcao) {
                    this.router.navigateByUrl('contatos');
                } else {
                    this.reiniciarForm();
                }
            });
        },
        () => {
            const config = {
                data: {
                    titulo: 'Erro ao salvar!',
                    descricao: 'Não conseguimos salvar seu registro, favor tente novamente mais tarde!',
                    corBtnSucesso: 'warn',
                    btnSucesso: 'Fechar',
                } as Alerta
            };
            this.dialog.open(AlertaComponent, config);
        });
    }

    private editar(contato: Contato): void {
        this.contatoService.editar(contato).subscribe(() => {
            const config = {
                data: {
                    descricao: 'Este contato foi atualizado com sucesso.',
                    btnSucesso: 'Ir para a Home',
                } as Alerta
            };
            const dialogRef = this.dialog.open(AlertaComponent, config)
            dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('contatos'));
        },
        () => {
            const config = {
                data: {
                    titulo: 'Erro ao editar!',
                    descricao: 'Não conseguimos editar seu registro, favor tente novamente mais tarde!',
                    corBtnSucesso: 'warn',
                    btnSucesso: 'Fechar',
                } as Alerta
            };
            this.dialog.open(AlertaComponent, config);
        });
    }

}