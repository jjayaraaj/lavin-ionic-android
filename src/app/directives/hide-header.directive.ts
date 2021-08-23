import {
  Directive,
  Input,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements OnInit {
  @Input('appHideHeader') toolbar: any;
  toolbarHeight = 100;

  constructor(
    private renderer: Renderer2,
    private domController: DomController
  ) {}

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const scrollTop = $event.detail.scrollTop;
    //console.log(scrollTop);
    let newPosition = -scrollTop / 5;

    if (newPosition < -this.toolbarHeight) {
      newPosition = -this.toolbarHeight;
    }

    let newOpacity = 1 - newPosition / -this.toolbarHeight;

    this.domController.write(() => {
      this.renderer.setStyle(this.toolbar, 'top', `${newPosition}px`);
      this.renderer.setStyle(this.toolbar, 'opacity', `${newOpacity}`);
    });
  }

  ngOnInit() {
    this.toolbar = this.toolbar.el;
    console.log(this.toolbar);
    this.domController.read(() => {
      // this.toolbarHeight = this.toolbar.clientHeight;
    });
  }
}
