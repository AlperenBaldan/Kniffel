import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {


}
