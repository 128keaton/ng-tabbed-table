import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TabbedTableComponent} from "./tabbed-table/tabbed-table.component";
import {TabbedTableDataSource} from "./tabbed-table/tabbed-table-datasource";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'tabbed-tables-example';

  @ViewChild(TabbedTableComponent, {static: false}) tabbedTable: TabbedTableComponent;

  ngAfterViewInit(): void {
    this.tabbedTable.tabs = [
      {
        tabName: 'One',
        dataSource: new TabbedTableDataSource()
      },
      {
        tabName: 'Two',
        dataSource: new TabbedTableDataSource()
      },      {
        tabName: 'Three',
        dataSource: new TabbedTableDataSource()
      },
    ];
  }


}
