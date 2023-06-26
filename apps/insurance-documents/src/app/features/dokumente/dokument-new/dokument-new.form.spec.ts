import { DokumentNewForm } from './dokument-new.form';
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('DokumentNewForm', () => {
  describe('When "Berechnungsarten" are loaded', () => {
    it('contains "AnzahlMitarbeiter"', async () => {
      await TestBed.configureTestingModule({
        imports: [DokumentNewForm],
        providers: [provideNoopAnimations()]
      }).compileComponents();

      const fixture = TestBed.createComponent(DokumentNewForm);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentInstance.voreinstellungen = {
        berechnungsarten: ['Anzahl Mitarbeiter', 'Risiko'],
        risiken: [],
        zusatzaufschlaege: []
      };

      fixture.detectChanges();

      const select = await loader.getHarness(
        MatSelectHarness.with({ selector: '[formControlName=berechnungsart]' })
      );

      await select.open();

      const options = await select.getOptions();

      expect(options.length).toBe(1);
    });
  });
});
