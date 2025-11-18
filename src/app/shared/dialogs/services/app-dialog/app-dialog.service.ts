import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class AppDialogService {
  private readonly dialog: MatDialog = inject(MatDialog);

  public open(
    component: ComponentType<unknown>,
    data?: unknown,
    config?: MatDialogConfig<unknown>,
  ): Observable<unknown> {
    const dialogRef = this.dialog.open(component, {
      panelClass: 'app-dialog-panel',
      maxHeight: '90vmax',
      disableClose: true,
      autoFocus: false,
      data,
      ...config,
    });
    return dialogRef.afterClosed();
  }
}
