import { TestBed } from '@angular/core/testing';
import { NxWelcome } from '../../nx-welcome';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RootComponent, NxWelcome],
        }).compileComponents();
    });

    it('should render title', async () => {
        const fixture = TestBed.createComponent(RootComponent);
        await fixture.whenStable();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Welcome dnd-mapp');
    });
});
