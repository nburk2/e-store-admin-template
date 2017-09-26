import { Component, Input } from '@angular/core';

@Component({
    selector: 'item-navigation',
    templateUrl: './item-header.component.html'
})
export class ItemNavigationComponent {
    @Input() heading: string;
    @Input() icon: string;
    @Input() modifyAction: string;
    @Input() actionUrl: string;
}
