import { Component } from '@angular/core';
import {AppDialogComponent} from '../app-dialog/app-dialog.component';
import {
  AppDialogDefaultActionsComponent
} from '@app/shared/dialogs/components/app-dialog-default-actions/app-dialog-default-actions.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-info-dialog',
  imports: [
    AppDialogComponent,
    AppDialogDefaultActionsComponent,
    MatIcon
  ],
  templateUrl: './info-dialog.html',
  styleUrl: './info-dialog.scss'
})
export class InfoDialog {

}
