import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'date-picker-header',
  templateUrl: './date-picker-header.component.html',
  styleUrls: ['./date-picker-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerHeaderComponent<D> implements OnDestroy {

  private destroyed = new Subject<void>();

  constructor(
    private calendar: MatCalendar<D>,
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef) {

    calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  get periodLabel() {

    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {

    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {

    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }

  ngOnDestroy() {

    this.destroyed.next();
    this.destroyed.complete();
  }
}