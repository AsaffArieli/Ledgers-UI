import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterOutlet, Routes, UrlSegment } from '@angular/router';
import { Subscription, withLatestFrom } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  links: Routes = [];

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      withLatestFrom(this.route.url)
    ).subscribe(([params, url]: [Params, UrlSegment[]]) => {
      this.profileService.read(url[0].path, params['id']);
    });
    this.subscription.add(
      this.profileService.profile.subscribe(client => {
        if (client) {
          const parentRoute = this.router.config.find(r => r.path === `${client.class}/:id`);
          if (parentRoute && parentRoute.children) {
            this.links = parentRoute.children.filter(childRoute => childRoute.path !== '**');
          }
        }
      })
    );
  }
}
