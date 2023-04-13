import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})

// define a @Input() property named title to receive the page title from the parent component.
// The parent component is the AppComponent.
export class PageHeaderComponent {
  @Input()
  title!: string;
}
