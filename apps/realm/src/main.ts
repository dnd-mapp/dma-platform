import { appConfig } from '@/core/config/app.config';
import { RootComponent } from '@/core/root/root.component';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(RootComponent, appConfig).catch((error) => console.error(error));
