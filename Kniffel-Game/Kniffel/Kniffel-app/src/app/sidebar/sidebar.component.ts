import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isScreenWidthNormal: boolean = true;
  open: boolean = false;

  constructor(private breakpointService: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.isScreenWidthNormal = true;
        if (result.matches) {
          this.isScreenWidthNormal = false;
        } else {
          this.isScreenWidthNormal = true;
        }
      });
  }

  openOrClose() {
    this.open = this.open ? false : true;
  }
}
