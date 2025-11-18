import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-dialog-default-actions',
  templateUrl: './app-dialog-default-actions.component.html',
  styleUrl: './app-dialog-default-actions.component.scss',
  imports: [
    MatButton,
    MatIcon
  ]
})
export class AppDialogDefaultActionsComponent {
  @Input() public btnCancel: string = 'Cancelar';
  @Input() public btnConfirm: string = 'OK';
  @Input() public showBtnConfirm: boolean = true;
  @Input() public showBtnCancel: boolean = true;

  @Input() public btnCancelDisabled: boolean = false;
  @Input() public btnConfirmDisabled: boolean = false;

  @Input() public autoDialogClose: boolean = true;

  @Input() public inverterBotoes: boolean = false;
  @Input() public iconConfirm?: string;

  @Output() public cancel: EventEmitter<unknown> = new EventEmitter();
  @Output() public confirm: EventEmitter<unknown> = new EventEmitter();

  public dialogRef: MatDialogRef<unknown> = inject(MatDialogRef<unknown>);

  protected onCancel(): void {
    if (this.autoDialogClose) {
      this.dialogRef.close(false);
    }
    this.cancel.emit();
  }

  protected onConfirm(): void {
    if (this.autoDialogClose) {
      this.dialogRef.close(false);
    }
    this.confirm.emit();
  }
}
