import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MutationService, QueryService } from '@ngneat/query';
import { tap } from 'rxjs';
import { EnvironmentService } from '../../environment/environment.service';
import { QueryClient } from '../../infrastructure/ngneat';
import { DokumentenlisteEintragDto } from './models/dokumentenliste-eintrag.dto';
import { ErzeugeNeuesAngebotDto } from './models/erzeuge-neues-angebot.dto';

@Injectable({ providedIn: 'root' })
export class DokumenteClient {
  private readonly key = 'dokumente';
  private readonly endpoint = `${this.environment.configuration.apiUrl}/${this.environment.configuration.apiRoutes.dokumente}`;

  constructor(
    private readonly http: HttpClient,

    private readonly mutator: MutationService,
    private readonly querier: QueryService,
    private readonly queryClient: QueryClient,
    private readonly environment: EnvironmentService
  ) {}

  read() {
    return this.querier.use({
      queryKey: [this.key],
      queryFn: () => this.http.get<DokumentenlisteEintragDto[]>(this.endpoint)
    });
  }

  find(id: string) {
    return this.querier.use({
      queryKey: [this.key, id],
      queryFn: () => this.http.get<DokumentenlisteEintragDto>(`${this.endpoint}/${id}`)
    });
  }

  create() {
    return this.mutator.use((dto: ErzeugeNeuesAngebotDto) =>
      this.http
        .post<DokumentenlisteEintragDto>(this.endpoint, dto)
        .pipe(tap(() => this.queryClient.invalidateQueries([this.key])))
    );
  }

  annehmen() {
    return this.mutator.use((id: string) =>
      this.http
        .post<void>(`${this.endpoint}/${id}/annehmen`, null)
        .pipe(tap(() => this.queryClient.invalidateQueries([this.key])))
    );
  }

  ausstellen() {
    return this.mutator.use((id: string) =>
      this.http
        .post<void>(`${this.endpoint}/${id}/ausstellen`, null)
        .pipe(tap(() => this.queryClient.invalidateQueries([this.key])))
    );
  }
}