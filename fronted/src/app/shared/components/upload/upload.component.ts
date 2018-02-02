import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UploadService } from "../../../shared/services/upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() label: string;

  @Input() icon: string;

  @Input() multiple: boolean = false;

  uploader: FileUploader = this.uploadService.uploader;

  public identifier = `form-upload-${identifier++}`;
  constructor(public uploadService: UploadService) { }

  ngOnInit() {
  }

}
let identifier = 0;
