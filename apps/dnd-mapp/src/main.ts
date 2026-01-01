import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, RootComponent } from './app';

bootstrapApplication(RootComponent, appConfig).catch((err) => console.error(err));
