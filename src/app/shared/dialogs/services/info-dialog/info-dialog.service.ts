import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InfoDialog} from '@app/shared/dialogs/components/info-dialog/info-dialog';
import {AppDialogService} from '@app/shared/dialogs/services/app-dialog/app-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogService {

  private dialogService: AppDialogService = inject(AppDialogService);

  public openDialog(): Observable<boolean> {
    return this.dialogService.open(InfoDialog, {}, {
      minWidth: '800px',
      maxHeight: '100vh',
    }) as Observable<boolean>;
  }
}
