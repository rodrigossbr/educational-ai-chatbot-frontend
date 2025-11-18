import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AppDialogConfirmComponent } from '@shared/dialog/components/app-dialog-confirm/app-dialog-confirm.component';

import { By } from '@angular/platform-browser';
import {
  AppDialogComponent,
  AppDialogConfirmModel,
  AppDialogDefaultActionsComponent,
} from '@shared/dialog';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';

describe('AppDialogConfirmComponent', () => {
  let component: AppDialogConfirmComponent;
  let fixture: ComponentFixture<AppDialogConfirmComponent>;

  let dialogRef: jasmine.SpyObj<MatDialogRef<AppDialogConfirmComponent>>;
  let dialogDataSpy: jasmine.SpyObj<AppDialogConfirmModel>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    dialogDataSpy = jasmine.createSpyObj('MAT_DIALOG_DATA', [
      'title',
      'msg',
      'btnCancel',
      'btnConfirm',
    ]);
    dialogDataSpy.titulo = 'Test Title';
    dialogDataSpy.msg = 'Test Message';
    dialogDataSpy.botaoCancelar = 'No';
    dialogDataSpy.botaoConfirmar = 'Yes';

    await TestBed.configureTestingModule({
      declarations: [
        AppDialogDefaultActionsComponent,
        AppDialogConfirmComponent,
        AppDialogComponent,
      ],
      imports: [
        CommonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        A11yModule,
        MatIcon,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDialogConfirmComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AppDialogConfirmComponent>
    >;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve apresentar os valores default', () => {
    dialogDataSpy.titulo = undefined;
    dialogDataSpy.msg = undefined;
    dialogDataSpy.botaoCancelar = undefined;
    dialogDataSpy.botaoConfirmar = undefined;

    fixture = TestBed.createComponent(AppDialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.titulo).toBe('Confirmação');
    expect(component.msg).toBe('');
    expect(component.botaoCancelar).toBe('Cancelar');
    expect(component.botaoConfirmar).toBe('Confirmar');
  });

  it('deve apresentar o titulo', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('deve apresentar a mensagem', () => {
    const messageElement = fixture.debugElement.query(
      By.css('app-dialog'),
    ).nativeElement;
    expect(messageElement.textContent).toContain('Test Message');
  });

  it('deve apresentar os labels customizados dos botões', () => {
    const cancelButton = fixture.debugElement.query(
      By.css('app-dialog-default-actions'),
    ).componentInstance;
    const confirmButton = fixture.debugElement.query(
      By.css('app-dialog-default-actions'),
    ).componentInstance;

    expect(cancelButton.btnCancel).toBe('No');
    expect(confirmButton.btnConfirm).toBe('Yes');
  });

  it('deve fechar a dialog com false quando clicar em cancelar', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('deve fechar a dialog com true quando clicar em confirmar', () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
