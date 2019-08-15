import {TabbedTableDataSource} from "./tabbed-table/tabbed-table-datasource";

export interface TableTab {
  dataSource: TabbedTableDataSource;
  tabName: string;
}
