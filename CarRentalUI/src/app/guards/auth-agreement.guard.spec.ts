import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAgreementGuard } from './authAgreementGuard';

describe('authAgreementGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authAgreementGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
