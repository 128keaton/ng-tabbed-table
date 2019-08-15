import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from "@angular/material";
import {TabbedTableDataSource, TabbedTableItem} from "../tabbed-table/tabbed-table-datasource";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {delay, map, takeWhile, tap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {animate, query, sequence, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  animations: [
    trigger('rowsAnimation', [
      transition('void => *', [
        style({height: '*', opacity: '0', transform: 'translateX(10px)', 'box-shadow': 'none'}),
        sequence([
          animate(".50s ease", style({height: '*', opacity: 1, transform: 'translateX(0)'}))
        ])
      ])
    ])
  ]
})
export class TableWrapperComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<MatTableDataSource<TabbedTableItem>>;

  @Input()
  dataSource: TabbedTableDataSource;

  private _dataSource: MatTableDataSource<TabbedTableItem>;

  @Output()
  isLoading = new EventEmitter<boolean>(true);


  private showPaginator = new EventEmitter<boolean>(true);
  private length = new EventEmitter<number>(true);


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    console.log('Constructed');
    this.isLoading.emit(true);
    this.showPaginator.emit(false);
    this._dataSource =  new MatTableDataSource<TabbedTableItem>([]);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.dataSource) {
      this.isLoading.emit(false);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.data.forEach((item, index) => {
        setTimeout(() => {
          this._dataSource.data.push(item);
          this._dataSource.data = this._dataSource.data.slice();
          this.length.emit(this.dataSource.data.length);

          if (index >= (this.dataSource.data.length - 1)) {
            console.log('SHOW BB');
            this.showPaginator.emit(true);
          }
        }, 40 * index)
      })
    }, 500);
    this._dataSource.paginator = this.paginator;
  }

}
