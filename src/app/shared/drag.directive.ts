import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  private unsubscribeMouseDown;
  private unsubscribeMouseMove;
  private unsubscribeMouseUp;
  private unsubscribeContextMenu;
  public domElement;
  public isDragging = false;
  @Input('appDrag') buttonEnable;

  private positionState = {
    currentPosY: 0,
    currentPosX: 0,
    startingCursorY: 0,
    startingCursorX: 0
  };


  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.domElement = element.nativeElement;
    this.resetPosition();
  }

  public moveTo(x, y) {
    this.domElement.scrollLeft = x;
    this.domElement.scrollTop = y;
  }

  public moveCenterTo(x, y) {
    this.moveTo(x - this.domElement.clientWidth / 2, y - this.domElement.clientHeight / 2)
  }

  public moveCenterToCenter() {
    this.moveCenterTo(this.domElement.scrollWidth / 2, this.domElement.scrollHeight / 2);
  }

  ngAfterViewInit() {
    this.subscribeToContextMenu();
    this.subscribeToMouseDown();
  }

  ngOnDestroy() {
    this.unsubscribeContextMenu();
    this.unsubscribeMouseDown();
  }

  public resetPosition() {
    this.positionState = {
      currentPosY: 0,
      currentPosX: 0,
      startingCursorY: 0,
      startingCursorX: 0
    };
  }

  private setCurrentPosition(x, y) {
    this.positionState.currentPosX = x;
    this.positionState.currentPosY = y;
  }

  private setStatingCursor(x, y) {
    this.positionState.startingCursorX = x;
    this.positionState.startingCursorY = y;
  }

  private subscribeToMouseDown() {
    this.unsubscribeMouseDown = this.renderer.listen(this.domElement, "mousedown", event => {
      if (this.buttonEnable.indexOf(event.which) > -1 || this.buttonEnable === "") {
        this.isDragging = true;
        this.setCurrentPosition(this.domElement.scrollLeft, this.domElement.scrollTop);
        this.setStatingCursor(event.clientX, event.clientY);
        this.subscribeToMouseUp();
        this.subscribeToMouseMove();
        event.stopPropagation();
        event.preventDefault();
      }
    });
  }


  private subscribeToMouseMove() {
    this.unsubscribeMouseMove = this.renderer.listen(window, "mousemove", event => {
      const X = this.positionState.currentPosX - event.clientX + this.positionState.startingCursorX;
      const Y = this.positionState.currentPosY - event.clientY + this.positionState.startingCursorY;
      this.moveTo(X, Y);
      event.stopPropagation();
      event.preventDefault();
    });
  }

  private subscribeToMouseUp() {
    this.unsubscribeMouseUp = this.renderer.listen(window, "mouseup", event => {
      this.unsubscribeMouseMove();
      this.unsubscribeMouseUp();
      this.isDragging = false;
      event.stopPropagation();
      event.preventDefault();
    });
  }

  private subscribeToContextMenu() {
    this.unsubscribeContextMenu = this.renderer.listen(this.domElement, "contextmenu", event => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
