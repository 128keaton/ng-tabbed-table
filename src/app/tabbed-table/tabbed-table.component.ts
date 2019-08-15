import {AfterViewInit, Component, EventEmitter, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material";
import {TableWrapperComponent} from "../table-wrapper/table-wrapper.component";
import {BehaviorSubject} from "rxjs";
import {TableTab} from "../table-tab.interface";
import {animate, query, sequence, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'tabbed-table',
  templateUrl: './tabbed-table.component.html',
  styleUrls: ['./tabbed-table.component.scss'],
  animations: [
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
  ]
})
export class TabbedTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTabGroup, {static: false}) tabGroup: MatTabGroup;
  @ViewChildren(TableWrapperComponent) tableWrappers: QueryList<TableWrapperComponent>;

  private isLoading = new BehaviorSubject<boolean>(true);

  private _tabs = new EventEmitter<TableTab[]>(true);

  private _tabLength = 0;

  ngOnInit(): void {
    this._tabs.emit([]);
  }

  ngAfterViewInit() {
    console.log(this.tableWrappers);
   // console.log(this.materialTabs);
  }

  get materialTabs(): QueryList<MatTab> {
    return this.tabGroup._tabs;
  }

  @Input()
  set tabs(newValue: TableTab[]) {
    if (newValue) {
      this._tabs.emit(newValue);
      this._tabLength = newValue.length;
    }
  }

  receiveIsLoading(newValue: boolean) {
    this.isLoading.next(newValue);
    this.isLoading.complete();
  }
}
