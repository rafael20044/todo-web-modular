import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-ui-pagination',
  templateUrl: './ui-pagination.html',
  styleUrl: './ui-pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPagination {
  readonly pageNumber = input<number>(0);
  readonly totalPages = input<number>(1);
  readonly totalElements = input<number>(0);
  readonly first = input<boolean>(true);
  readonly last = input<boolean>(true);

  readonly pageChange = output<number>();

  protected goPrevious(): void {
    if (!this.first()) {
      this.pageChange.emit(this.pageNumber() - 1);
    }
  }

  protected goNext(): void {
    if (!this.last()) {
      this.pageChange.emit(this.pageNumber() + 1);
    }
  }
}
