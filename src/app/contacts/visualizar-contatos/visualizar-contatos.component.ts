import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from 'src/app/core/contatos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Contato } from 'src/app/shared/models/contato';

@Component({
  selector: 'app-visualizar-contatos',
  templateUrl: './visualizar-contatos.component.html',
  styleUrls: ['./visualizar-contatos.component.css']
})
export class VisualizarContatosComponent implements OnInit {

  contato!: Contato;
  id!: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, 
    private contatosService: ContatosService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
      this.router.navigateByUrl('/contatos/cadastro/' + this.id);
  }

  excluir(): void {
    const config = {
        data: {
            titulo: 'Tem certeza que deseja excluir este contato?',
            descricao: 'Caso realmente queira excluir, clique em confirmar',
            corBtnSucesso: 'warn',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true
        } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config)
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
            this.contatosService.excluir(this.id)
            .subscribe(() => this.router.navigateByUrl('/contatos'));
        }
    });
  }

  private visualizar(): void {
    this.contatosService.visualizar(this.id).subscribe((contato: Contato) => this.contato = contato);
  }

}
