import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppDialogDefaultActionsComponent } from '@shared/dialog/components/app-dialog-default-actions/app-dialog-default-actions.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AppDialogDefaultActionsComponent', () => {
  let component: AppDialogDefaultActionsComponent;
  let fixture: ComponentFixture<AppDialogDefaultActionsComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<unknown>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AppDialogDefaultActionsComponent],
      imports: [NoopAnimationsModule, MatButtonModule, MatDialogModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDialogDefaultActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve apresentar o label default do botão', () => {
    const cancelButton = fixture.debugElement.query(
      By.css('button[data-test="botao-cancelar"]'),
    ).nativeElement;
    const confirmButton = fixture.debugElement.query(
      By.css('button[data-test="botao-confirmar"]'),
    ).nativeElement;

    expect(cancelButton.textContent.trim()).toBe('Cancelar');
    expect(confirmButton.textContent.trim()).toBe('OK');
  });

  it('deve emitir o evento de cancel quando o botão cancelar for clicado', () => {
    spyOn(component.cancel, 'emit');

    const cancelButton = fixture.debugElement.query(
      By.css('button[data-test="botao-cancelar"]'),
    ).nativeElement;
    cancelButton.click();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('deve emitir o evento de confirmar quando o botão confirmar for clicado', () => {
    spyOn(component.confirm, 'emit');

    const confirmButton = fixture.debugElement.query(
      By.css('button[data-test="botao-confirmar"]'),
    ).nativeElement;
    confirmButton.click();

    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('deve apresentar os labels customizados para os botões', () => {
    component.btnCancel = 'No';
    component.btnConfirm = 'Yes';
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button[data-test="botao-cancelar"]'),
    ).nativeElement;
    const confirmButton = fixture.debugElement.query(
      By.css('button[data-test="botao-confirmar"]'),
    ).nativeElement;

    expect(cancelButton.textContent.trim()).toBe('No');
    expect(confirmButton.textContent.trim()).toBe('Yes');
  });
});
