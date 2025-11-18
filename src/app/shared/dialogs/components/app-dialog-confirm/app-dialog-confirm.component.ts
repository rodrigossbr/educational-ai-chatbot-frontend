import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AppDialogConfirmModel} from '@app/shared/dialogs/models/app-dialog-confirm.model';
import {AppDialogComponent} from '@app/shared/dialogs/components/app-dialog/app-dialog.component';
import {
  AppDialogDefaultActionsComponent
} from '@app/shared/dialogs/components/app-dialog-default-actions/app-dialog-default-actions.component';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './app-dialog-confirm.component.html',
  styleUrl: './app-dialog-confirm.component.scss',
  imports: [
    AppDialogComponent,
    AppDialogDefaultActionsComponent
  ]
})
export class AppDialogConfirmComponent {
  public readonly dialogRef: MatDialogRef<AppDialogConfirmComponent> = inject(
    MatDialogRef<AppDialogConfirmComponent>,
  );
  public readonly data: AppDialogConfirmModel =
    inject<AppDialogConfirmModel>(MAT_DIALOG_DATA);

  public readonly titulo: string = this.data?.titulo || 'Confirmação';
  public readonly subTitulo: string = this.data?.subTitulo || '';
  public readonly msg: string = this.data?.msg || '';
  public readonly botaoCancelar: string =
    this.data?.botaoCancelar || 'Cancelar';
  public readonly botaoConfirmar: string =
    this.data?.botaoConfirmar || 'Confirmar';
  public readonly botaoFechar: boolean = this.data?.botaoFechar || false;
  public readonly icon: string = this.data?.icon || '';
  public readonly inverterBotoes: boolean = this.data?.inverterBotoes || false;
  public readonly ocultarBotaoConfirmar: boolean =
    this.data?.ocultarBotaoConfirmar || false;
  public readonly ocultarBotaoCancelar: boolean =
    this.data?.ocultarBotaoCancelar || false;
  public readonly msgErro: string = this.data?.msgErro || '';
  public readonly semSubtitulo: boolean = this.data?.semSubtitulo || false;
  public readonly desabilitarBotaoConfirmar: boolean =
    this.data?.desabilitarBotaoConfirmar || false;

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
