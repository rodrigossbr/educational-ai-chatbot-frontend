import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppDialogComponent } from '@shared/dialog';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIcon } from '@angular/material/icon';

describe('AppDialogComponent', () => {
  let component: AppDialogComponent;
  let fixture: ComponentFixture<AppDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<unknown>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AppDialogComponent],
      imports: [CommonModule, MatButton, A11yModule, MatIcon, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com disableClose true', () => {
    component.ngOnInit();
    expect(dialogRefSpy.disableClose).toBe(true);
  });

  it('deve fechar o diálogo sem confirmação se confirmacaoHabilitada for false', () => {
    component.confirmacaoHabilitada = false;
    component.fecharModal();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('deve fechar o diálogo se o usuário confirmar no diálogo de confirmação', () => {
    component.confirmacaoHabilitada = true;
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as never);

    component.fecharModal();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('não deve fechar o diálogo se o usuário cancelar no diálogo de confirmação', () => {
    component.confirmacaoHabilitada = true;
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(false),
    } as never);

    component.fecharModal();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('deve definir overflow como "hidden" quando inScrollBlock for true', () => {
    component.inScrollBlock = true;
    const div = document.createElement('div');
    div.className = 'cdk-global-scrollblock';
    document.body.appendChild(div);

    component['ajustarEstiloScrollBlock']();

    expect(div.style.overflow).toBe('hidden');

    document.body.removeChild(div);
  });

  it('deve definir overflow como "auto" quando inScrollBlock for false', () => {
    component.inScrollBlock = false;
    const div = document.createElement('div');
    div.className = 'cdk-global-scrollblock';
    document.body.appendChild(div);

    component['ajustarEstiloScrollBlock']();

    expect(div.style.overflow).toBe('auto');

    document.body.removeChild(div);
  });
});
