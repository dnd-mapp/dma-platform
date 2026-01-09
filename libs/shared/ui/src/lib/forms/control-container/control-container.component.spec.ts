import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainerComponent } from './control-container.component';

describe('ControlContainerComponent', () => {
    let component: ControlContainerComponent;
    let fixture: ComponentFixture<ControlContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ControlContainerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ControlContainerComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
