import { TestBed } from '@angular/core/testing';
import { UniqueIdService } from 'src/app/core/services/unique-id/unique-id.service';

describe('UniqueIdService', () => {
  let service: UniqueIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueIdService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve gerar a unique id', () => {
    const uuidSpy = spyOn(service, 'generateUniqueId').and.callThrough();
    service.generateUniqueIdWithPrefix('prefix');
    expect(uuidSpy).toHaveBeenCalled();
  });
});
