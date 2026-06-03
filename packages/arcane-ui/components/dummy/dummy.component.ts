import { Component, input } from '@angular/core';

@Component({
    selector: 'dma-dummy',
    template: `<p>{{ label() }}</p>`,
})
export class DummyComponent {
    label = input('Dummy component');
}
