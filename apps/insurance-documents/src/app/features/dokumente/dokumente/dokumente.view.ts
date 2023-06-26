import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DokumenteClient } from '../dokumente.client';
import { DokumentenlisteEintragDto } from '../models';
import { TableComponent } from '../../../components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SearchComponent } from '../../../components/search/search.component';

import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dokumente',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TableComponent,
    SearchComponent,
    AsyncPipe,
  ],
  templateUrl: './dokumente.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DokumenteView {
  protected readonly dokumenteSearchTerm = signal('');
  protected readonly dokumenteResult = toSignal(
    this.dokumenteClient.read().result$.pipe(tap((r) => console.log(r.data)))
  );

  protected readonly dokumenteFiltered = computed(() => {
    console.log('COMPUTED');
    const searchTerm = this.dokumenteSearchTerm();
    const dokumente = this.dokumenteResult()?.data || [];
    if (!searchTerm) return dokumente;
    return dokumente.filter(
      (dokument) =>
        dokument.berechnungsart.match(new RegExp(searchTerm, 'i')) ||
        dokument.dokumenttyp.match(new RegExp(searchTerm, 'i')) ||
        dokument.risiko.match(new RegExp(searchTerm, 'i'))
    );
  });

  protected readonly current = signal<DokumentenlisteEintragDto | null>(null);

  constructor(private dokumenteClient: DokumenteClient) {}

  async dokumentAnnehmen(dto: DokumentenlisteEintragDto) {
    await this.dokumenteClient.annehmen().mutate(dto.id);
  }

  async dokumentAusstellen(dto: DokumentenlisteEintragDto) {
    await this.dokumenteClient.ausstellen().mutate(dto.id);
  }

  setCurrent($event: DokumentenlisteEintragDto | null) {
    this.current.set($event);
  }

  setSearchTerm(searchTerm: string) {
    this.dokumenteSearchTerm.set(searchTerm);
  }
}
