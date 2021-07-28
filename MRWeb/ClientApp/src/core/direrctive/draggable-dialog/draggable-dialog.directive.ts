import { ChangeDetectorRef, Directive, ElementRef, NgZone, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subject, of as observableOf } from "rxjs";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { map, takeUntil } from "rxjs/operators";

@Directive({
  selector: '[draggableDialog]',
})
export class DraggableDialogDirective implements OnInit, OnDestroy {
  // Element to be dragged
  private _target: HTMLElement;

  // dialog container element to resize
  private _container: HTMLElement;

  // Drag handle
  private _handle: HTMLElement;
  private _delta = { x: 0, y: 0 };
  private _offset = { x: 0, y: 0 };

  private _destroy$ = new Subject<void>();

  private _isResized = false;

  constructor(
    private _elementRef: ElementRef,
    private _zone: NgZone,
    private _cd: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {

    this._elementRef.nativeElement.style.cursor = 'default';
    this._handle = this._elementRef.nativeElement.parentElement.parentElement.parentElement;
    this._target = this._elementRef.nativeElement.parentElement.parentElement.parentElement;
    this._container = this._elementRef.nativeElement.parentElement.parentElement;
    this._container.style.resize = 'both';
    this._container.style.overflow = 'hidden';

    this._setupEvents();
  }

  public ngOnDestroy(): void {

    if (!!this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  private _setupEvents() {

    this._zone.runOutsideAngular(() => {
      const mousedown$ = fromEvent(this._handle, 'mousedown');
      const mousemove$ = fromEvent(document, 'mousemove');
      const mouseup$ = fromEvent(document, 'mouseup');

      const mousedrag$ = mousedown$.pipe(
        switchMap((event: MouseEvent) => {
          const startX = event.clientX;
          const startY = event.clientY;

          const rectX = this._container.getBoundingClientRect();
          if (
            // if the user is clicking on the bottom-right corner, he will resize the dialog
            startY > rectX.bottom - 15 &&
            startY <= rectX.bottom &&
            startX > rectX.right - 15 &&
            startX <= rectX.right
          ) {
            this._isResized = true;
            return observableOf(null);
          }

          return mousemove$.pipe(
            map((innerEvent: MouseEvent) => {
              innerEvent.preventDefault();
              this._delta = {
                x: innerEvent.clientX - startX,
                y: innerEvent.clientY - startY,
              };
            }),
            takeUntil(mouseup$),
          );
        }),
        takeUntil(this._destroy$),
      );

      mousedrag$.subscribe(() => {
        if (this._delta.x === 0 && this._delta.y === 0) {
          return;
        }

        this._translate();
      });

      mouseup$.pipe(takeUntil(this._destroy$)).subscribe(() => {
        if (this._isResized) {
          this._handle.style.width = 'auto';
        }

        this._offset.x += this._delta.x;
        this._offset.y += this._delta.y;
        this._delta = { x: 0, y: 0 };
        this._cd.markForCheck();
      });
    });
  }

  private _translate() {
    // this._target.style.left = `${this._offset.x + this._delta.x}px`;
    // this._target.style.top = `${this._offset.y + this._delta.y}px`;
    // this._target.style.position = 'relative';
    requestAnimationFrame(() => {
      this._target.style.transform = `
          translate(${this._offset.x + this._delta.x}px,
                    ${this._offset.y + this._delta.y}px)
        `;
    });
  }
}
