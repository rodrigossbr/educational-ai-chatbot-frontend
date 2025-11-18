import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';
import {
  AppDialogConfirmComponent
} from '@app/shared/dialogs/components/app-dialog-confirm/app-dialog-confirm.component';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatIconButton} from '@angular/material/button';


@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss',
  imports: [
    MatIcon,
    NgClass,
    MatDialogTitle,
    MatIconButton,
    MatDialogContent,
    MatDialogActions
  ]
})
export class AppDialogComponent implements OnInit, AfterViewInit {
  @Input() public icon!: string;
  @Input() public tituloDialogo!: string;
  @Input() public subTituloDialogo?: string;
  @Input() public botaoFecharDialogo: boolean = true;
  @Input() public inScrollBlock: boolean = false;
  @Input() public confirmacaoHabilitada: boolean = false;
  @Input() public confirmacaoTitulo?: string =
    'Você possui alterações não salvas';
  @Input() public confirmacaoMsg?: string =
    'Deseja salvar as alterações realizadas?';
  @Input() public confirmacaoBotaoCancelar?: string = 'Não salvar';
  @Input() public confirmacaoBotaoConfirmar?: string = 'Salvar alterações';
  @Input() public minWidth: string = '94vmin';
  @Input() public iconMsgConfirmacao!: string;
  @Input() public inverterBotoesAcaoConfirmacao: boolean = false;
  @Input() public semSubtitulo: boolean = false;

  public dialogRef: MatDialogRef<unknown> = inject(MatDialogRef<unknown>);
  private readonly dialog: MatDialog = inject(MatDialog);
  private detectorMudancas: ChangeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  public ngAfterViewInit(): void {
    this.ajustarEstiloScrollBlock();
  }

  public fecharModal(): void {
    this.abrirDialogoConfirmacaoAoFechar();
  }

  private ajustarEstiloScrollBlock(): void {
    const elements = document.getElementsByClassName('cdk-global-scrollblock');

    if (elements.length > 0) {
      const bodyElement = elements[0] as HTMLElement;

      bodyElement.style.overflow = this.inScrollBlock ? 'hidden' : 'auto';
      this.detectorMudancas.detectChanges();
    }
  }

  private abrirDialogoConfirmacaoAoFechar() {
    if (this.confirmacaoHabilitada) {
      this.abrirDialogoConfirmacao().subscribe((confirmClose) => {
        if (confirmClose) {
          this.dialogRef.close(false);
        }
      });
    } else {
      this.dialogRef.close(false);
    }
  }

  private abrirDialogoConfirmacao(): Observable<boolean> {
    return this.dialog
      .open(AppDialogConfirmComponent, {
        panelClass: 'app-dialog-panel',
        minWidth: this.minWidth,
        autoFocus: false,
        data: {
          titulo: this.confirmacaoTitulo,
          msg: this.confirmacaoMsg,
          botaoCancelar: this.confirmacaoBotaoCancelar,
          botaoConfirmar: this.confirmacaoBotaoConfirmar,
          icon: this.iconMsgConfirmacao,
          inverterBotoes: this.inverterBotoesAcaoConfirmacao,
        },
      })
      .afterClosed()
      .pipe(filter((value) => typeof value === 'boolean'));
  }
}
