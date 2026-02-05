import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DestroyRef, Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const positions: ConnectedPosition[] = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
    },
];

@Directive({
    selector: '[dmaDropdownAnchor]',
    host: {
        '(click)': 'onToggle()',
    },
})
export class DropdownAnchorDirective {
    private readonly overlay = inject(Overlay);
    private readonly elementRef = inject(ElementRef<unknown>);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly destroyRef = inject(DestroyRef);

    public readonly menuTemplateRef = input.required<TemplateRef<unknown>>({ alias: 'dmaDropdownAnchor' });

    private overlayRef: OverlayRef | null = null;

    protected onToggle() {
        this.toggle();
    }

    private toggle() {
        if (this.overlayRef) this.close();
        else this.open();
    }

    private open() {
        const positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions(positions);

        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });

        this.overlayRef
            .backdropClick()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.close(),
            });

        const portal = new TemplatePortal(this.menuTemplateRef(), this.viewContainerRef);
        this.overlayRef.attach(portal);
    }

    private close() {
        if (!this.overlayRef) return;
        this.overlayRef.detach();
        this.overlayRef = null;
    }
}
