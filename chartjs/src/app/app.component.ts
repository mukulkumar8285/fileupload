import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HttpClientModule , UploadfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chartjs';
}
