import { TestBed } from '@angular/core/testing';
import { DokumenteView } from './dokumente.view';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Dokumente View', () => {
  describe('When "Dokumente" are filtered', () => {
    it('displays the matching "Dokument"', () => {
      TestBed.configureTestingModule({
        imports: [DokumenteView],
        providers: [provideNoopAnimations(), provideHttpClientTesting()],
      });

      const fixture = TestBed.createComponent(DokumenteView);
    });
  });
});
