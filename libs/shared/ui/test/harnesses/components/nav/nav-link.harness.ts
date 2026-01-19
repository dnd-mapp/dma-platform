import { ComponentHarness } from '@angular/cdk/testing';

export class NavLinkHarness extends ComponentHarness {
    public static readonly hostSelector = 'li[dma-nav-link]';
}
