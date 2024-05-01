import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public treeControl = new NestedTreeControl<any>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<any>();
  public hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  @Output() sidebar = new EventEmitter<void>();

  constructor() {
    this.dataSource.data = SIDEBAR_DATA;
  }
}

const SIDEBAR_DATA = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    route: '/'
  },
  {
    name: 'Database',
    icon: 'business',
    children: [
      {
        name: 'Funders',
        route: '/database/funders'
      },
      {
        name: 'Merchants',
        route: '/database/merchants'
      },
      {
        name: 'Owners',
        route: '/database/owners'
      },
    ],
  },
  {
    name: 'Parser',
    icon: 'edit',
    children: [
      {
        name: 'Schemes',
        route: '/parser/schemes'
      },
      {
        name: 'Keys',
        route: '/parser/keys'
      },
    ],
  },/*
  {
    name: 'Orange',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },*/
];