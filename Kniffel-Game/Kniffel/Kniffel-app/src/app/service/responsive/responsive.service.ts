import { Injectable, computed, inject } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private readonly small = '(max-width: 800px)';
  private readonly normal = '(min-width:801px)';

  breakpointObserver = inject(BreakpointObserver);

  screenWidth = toSignal(
    this.breakpointObserver.observe([this.small, this.normal])
  );

  smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  normalWidth = computed(() => this.screenWidth()?.breakpoints[this.normal]);
}
