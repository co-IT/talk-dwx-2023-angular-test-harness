import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TableComponent } from './table.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  MatHeaderCellHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { phl } from '@angular-extensions/pretty-html-log';

describe('Table', () => {
  describe('When a camel cased title is provided', () => {
    it('separates the title', async () => {
      TestBed.configureTestingModule({
        imports: [TableComponent],
        providers: [provideNoopAnimations()],
      });

      type TableTestData = { workshopTitle: string };
      const columnName: keyof TableTestData = 'workshopTitle';

      const fixture = TestBed.createComponent(TableComponent<TableTestData>);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.componentInstance.columns = [columnName];
      fixture.componentInstance.data = [
        {
          workshopTitle: 'GitHub Bootcamp – Hands-On Workshop',
        },
        {
          workshopTitle:
            'Modern Angular Architectures: Standalone Components, Component Store & Co.',
        },
        {
          workshopTitle:
            'Hands-on-Workshop: Erste Schritte mit Docker für .NET Entwickler',
        },
      ];

      fixture.detectChanges();

      const workshopHeaderCell = await loader.getHarness(
        MatHeaderCellHarness.with({ columnName })
      );

      const headerText = await workshopHeaderCell.getText();

      expect(headerText).toBe('Workshop Title');
    });
  });

  describe('When data is provided', () => {
    it('renders the respective rows', async () => {
      TestBed.configureTestingModule({
        imports: [TableComponent],
        providers: [provideNoopAnimations()],
      });

      const fixture = TestBed.createComponent(TableComponent<TableTestData>);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      type TableTestData = { workshopTitle: string };
      const columnName: keyof TableTestData = 'workshopTitle';

      fixture.componentInstance.columns = [columnName];
      fixture.componentInstance.data = [
        {
          workshopTitle: 'GitHub Bootcamp – Hands-On Workshop',
        },
        {
          workshopTitle:
            'Modern Angular Architectures: Standalone Components, Component Store & Co.',
        },
        {
          workshopTitle:
            'Hands-on-Workshop: Erste Schritte mit Docker für .NET Entwickler',
        },
      ];

      fixture.detectChanges();

      const table = await loader.getHarness(MatTableHarness);

      phl(fixture);
      const rows = await table.getRows();

      expect(rows.length).toBe(3);
    });
  });
});
