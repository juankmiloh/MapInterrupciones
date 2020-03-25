import { Component, ViewChild   } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private breakpointObserver: BreakpointObserver) {}

  @ViewChild('sidenav') sidenav: MatSidenav;

  opcion = 'CIAD | SUPERSERVICIOS';

  close(reason: string) {
    if (reason !== 'na') {
      this.opcion = reason;
      this.sidenav.close();
    } else {
      this.sidenav.close();
    }
  }
}
