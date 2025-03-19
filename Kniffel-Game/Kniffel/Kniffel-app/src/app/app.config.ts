import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import routes from "./app.routes";
import { GameService } from './service/game/game.service';
import { ResponsiveService } from './service/responsive/responsive.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), GameService, ResponsiveService]
};
