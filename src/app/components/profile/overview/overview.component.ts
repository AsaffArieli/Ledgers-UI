import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileService } from '../../../services/profile.service';
import { MerchantModel, OwnerModel } from '../../../models/database';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {

  class: string;
  profileImage: string;
  ownershipsColumns = [];
  info: MatTableDataSource<any> = new MatTableDataSource([]);
  ownerships: MatTableDataSource<any> = new MatTableDataSource([]);

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.profile.subscribe(client => {
      if (client) {
        this.class = client.class;
        this.info = new MatTableDataSource([
          {'category': 'Name', 'value': client.name},
          {'category': 'Address', 'value': ''},
          {'category': 'Phone', 'value': ''},
          {'category': 'Email', 'value': ''}
        ]);
        switch(client.class) {
          case 'merchant':
            this.ownerships = new MatTableDataSource((client as MerchantModel).owners);
            this.ownershipsColumns = ['owner_name', 'ownership', 'link'];
            this.profileImage = 'assets/images/merchant.jpg';
            break;
          case 'owner':
            this.ownerships = new MatTableDataSource((client as OwnerModel).merchants);
            this.ownershipsColumns = ['merchant_name', 'ownership', 'link'];
            this.profileImage = 'assets/images/owner.jpg';
            break;
          case 'funder':
            this.profileImage = 'assets/images/funder.jpg';
            break;
        }
      }
    });
  }
}
