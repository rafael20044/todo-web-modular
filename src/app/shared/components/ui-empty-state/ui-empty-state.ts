import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-empty-state',
  templateUrl: './ui-empty-state.html',
  styleUrl: './ui-empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiEmptyState {
  readonly title = input<string>('No hay elementos para mostrar');
  readonly description = input<string>('Comienza creando una nueva tarea para organizar tu día.');
}
