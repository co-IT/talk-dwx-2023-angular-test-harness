import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TableDatasource } from './table.datasource';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';

import { TableColumnTitlePipe } from './table-column-titlte.pipe';
import { MatButtonModule } from '@angular/material/button';
import { KeyOf } from './key-of.type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    TableColumnTitlePipe,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<TModel> implements AfterViewInit {
  private readonly models = signal<TModel[]>([]);

  protected readonly selection = new SelectionModel<TModel>(false);
  protected readonly selectionChange = toSignal(this.selection.changed);
  protected readonly selectedModel = computed(() => {
    const selection = this.selectionChange()?.added[0];
    return selection ? selection : null;
  });

  @Input({ required: true }) set data(data: TModel[] | null) {
    this.models.set(data || []);
  }

  @Input({ required: true }) set columns(columns: KeyOf<TModel>[]) {
    this.tableColumns.set(columns || []);
  }

  @Output() selected = new EventEmitter<TModel | null>();
  @Output() changedCurrentPage = new EventEmitter<number>();

  @ViewChild(MatSort) protected sort!: MatSort;
  @ViewChild(MatTable) protected table!: MatTable<TModel>;

  protected tableColumns = signal<KeyOf<TModel>[]>([]);
  protected tableColumnsWithSingleSelect = computed(() => {
    const columns = this.tableColumns();

    return ['__single-select__', ...columns];
  });

  constructor() {
    effect(() => this.bindModelsToTable(), { allowSignalWrites: true });
    effect(() => this.propagateModelWhenSelectionChanged(), {
      allowSignalWrites: true,
    });
  }

  ngAfterViewInit() {
    this.bindModelsToTable();
  }

  private bindModelsToTable() {
    const models = this.models();

    if (!this.table) {
      return;
    }

    const dataSource = new TableDatasource(models || []);
    dataSource.sort = this.sort;
    this.table.dataSource = dataSource;

    // Clear Selection
    this.selection.clear();
    this.selected.emit(null);
  }

  private propagateModelWhenSelectionChanged() {
    const model = this.selectedModel();

    this.selected.emit(model);
  }
}
