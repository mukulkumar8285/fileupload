import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  uploadedFileUrl: string | null = null;
  isUploadVisible: boolean = false;
  name: string = '';
  headers: string = 'false';

  constructor(private http: HttpClient) {}
  


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  openUpload() {
    this.isUploadVisible = true;
  }

  closeUpload() {
    this.isUploadVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.uploadedFileUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    this.selectedFile = null; // Resetting selected file
    this.name = '';           // Resetting file name
    this.headers = 'false';   // Resetting headers to default
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Name:', this.name); // Correct usage of console.log
    console.log('Headers:', this.headers);

    if (this.selectedFile) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.name);
      formData.append('headers', this.headers);
      

      const req = new HttpRequest('POST', 'http://localhost:8080/upload', formData, {
        reportProgress: true,
      });

      this.http.request(req).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
              }
              break;
            case HttpEventType.Response:
              this.isUploading = false;
              this.uploadedFileUrl = `http://localhost:8080/uploads/${event.body.file.filename}`;
              console.log('File uploaded successfully', event.body);
              break;
          }
        },
        (error) => {
          this.isUploading = false;
          console.error('File upload failed', error);
        }
      );
    }
  }
}
