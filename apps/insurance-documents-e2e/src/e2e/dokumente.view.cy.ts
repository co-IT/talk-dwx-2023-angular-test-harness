import { getHarness } from '@jscutlery/cypress-harness';
import { MatTableHarness } from '@angular/material/table/testing';

describe('insurance-documents', () => {
  it('should display welcome message', () => {
    cy.visit('/');
    const table = getHarness(MatTableHarness);

    table.getRows().should('have.length', 3);
  });
});
