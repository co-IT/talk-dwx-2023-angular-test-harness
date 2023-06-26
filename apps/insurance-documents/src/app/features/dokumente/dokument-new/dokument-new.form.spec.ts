import { DokumentNewForm } from './dokument-new.form';
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatErrorHarness } from "@angular/material/form-field/testing";

describe('DokumentNewForm', () => {
  describe('When "Berechnungsarten" are present', () => {
    it('makes "Berechnungsarten" selectable', async () => {
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
        MatSelectHarness.with({ selector: '[data-test=berechnungsart-select]' })
      );

      await select.open();

      const options = await select.getOptions();

      expect(options.length).toBe(2);
    });
  });

  describe('When no "Berechnungsart" is selected', () => {
    it('displays a validation message', async () => {
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
        MatSelectHarness.with({ selector: '[data-test=berechnungsart-select]' })
      );

      await select.open();
      await select.close();

      const error = await loader.getHarness(
        MatErrorHarness.with({ selector: '[data-test=berechnungsart-select-error]'})
      )

      const errorText = await error.getText();

      expect(errorText).toBe('Bitte wählen Sie eine Berechnungsart aus.');

    })
  });
});
