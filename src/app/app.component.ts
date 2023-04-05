import { Component } from '@angular/core';
import { MaterialModule } from 'src/Material-Module';
import * as Popper from '@popperjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
}
