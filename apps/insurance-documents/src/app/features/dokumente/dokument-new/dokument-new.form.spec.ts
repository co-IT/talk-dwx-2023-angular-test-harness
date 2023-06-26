import { DokumentNewForm } from './dokument-new.form';
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatErrorHarness } from '@angular/material/form-field/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

describe('DokumentNewForm', () => {
  describe('When "Berechnungsarten" are present', () => {
    it('makes "Berechnungsarten" selectable', async () => {
      await TestBed.configureTestingModule({
        imports: [DokumentNewForm],
        providers: [provideNoopAnimations()],
      }).compileComponents();

      const fixture = TestBed.createComponent(DokumentNewForm);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentInstance.voreinstellungen = {
        berechnungsarten: ['Anzahl Mitarbeiter', 'Risiko'],
        risiken: [],
        zusatzaufschlaege: [],
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
        providers: [provideNoopAnimations()],
      }).compileComponents();

      const fixture = TestBed.createComponent(DokumentNewForm);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentInstance.voreinstellungen = {
        berechnungsarten: ['Anzahl Mitarbeiter', 'Risiko'],
        risiken: [],
        zusatzaufschlaege: [],
      };

      fixture.detectChanges();

      const select = await loader.getHarness(
        MatSelectHarness.with({ selector: '[data-test=berechnungsart-select]' })
      );

      await select.open();
      await select.close();

      const error = await loader.getHarness(
        MatErrorHarness.with({
          selector: '[data-test=berechnungsart-select-error]',
        })
      );

      const errorText = await error.getText();

      expect(errorText).toBe('Bitte wählen Sie eine Berechnungsart aus.');
    });
  });
});

describe('When "Zusatzschutzaufschlag" is checked', () => {
  it('makes "Zusatzschutzaufschläge" selectable', async () => {
    await TestBed.configureTestingModule({
      imports: [DokumentNewForm],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    const fixture = TestBed.createComponent(DokumentNewForm);

    fixture.componentInstance.voreinstellungen = {
      berechnungsarten: ['Anzahl Mitarbeiter', 'Risiko'],
      risiken: [],
      zusatzaufschlaege: ['10%', '20%'],
    };

    const loader = TestbedHarnessEnvironment.loader(fixture);

    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({
        selector: '[data-test=will-zusatzschuts-checkbox]',
      })
    );

    await checkbox.check();
    const isChecked = await checkbox.isChecked();

    expect(isChecked).toBe(true);

    fixture.detectChanges();

    // Finding: we put the data-test on the wrong element.
    //          The error says that the MatSelectHarness could not be found
    //          It would be nice if the error says. Found an element but it is no MatSelect.
    const select = await loader.getHarness(
      MatSelectHarness.with({
        selector: '[data-test=zusatzschutzaufschlag-select]',
      })
    );

    await select.open();

    const options = await select.getOptions();

    expect(options.length).toBe(2);
  });
});

describe('[👶🏻 Child Loader] Dokument New Form', () => {
  it('allows having a single test entry from which we access test harnesses', async () => {
    await TestBed.configureTestingModule({
      imports: [DokumentNewForm],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    const fixture = TestBed.createComponent(DokumentNewForm);

    fixture.componentInstance.voreinstellungen = {
      berechnungsarten: ['Anzahl Mitarbeiter', 'Risiko'],
      risiken: [],
      zusatzaufschlaege: [],
    };

    fixture.detectChanges();

    const loader = TestbedHarnessEnvironment.loader(fixture);

    const fieldLoader = await loader.getChildLoader(
      '[data-test=berechnungsart-field]'
    );

    const select = await fieldLoader.getHarness(MatSelectHarness);
    await select.open();
    await select.close();

    // It is not possible to arrange the test before.
    // <mat-error> needs to be present in the DOM otherwise the test crashes.
    const error = await fieldLoader.getHarness(MatErrorHarness);
    const errorMessage = await error.getText();

    expect(errorMessage).toBe('Bitte wählen Sie eine Berechnungsart aus.');
  });
});
