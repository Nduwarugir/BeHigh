import { TestBed } from '@angular/core/testing';

import { LoadingGuard } from './loading.guard';

describe('LoadingGuard', () => {
	let guard: LoadingGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(LoadingGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
