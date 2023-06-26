import { getHarness } from '@jscutlery/cypress-harness';
import { MatTableHarness } from '@angular/material/table/testing';
import { TableComponent } from './table.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('insurance-documents', () => {
  it('should display welcome message', () => {
    type TableTestData = { workshopTitle: string };
    const columnName: keyof TableTestData = 'workshopTitle';

    cy.mount(TableComponent<TableTestData>, {
      componentProperties: {
        columns: [columnName],
        data: [
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
        ],
      },
      providers: [provideNoopAnimations()],
    });

    const table = getHarness(MatTableHarness);

    table.getRows().should('have.length', 3);
  });
});
