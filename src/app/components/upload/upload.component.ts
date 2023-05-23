import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MainService } from 'src/app/main.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(
    private toastSvc: ToastService,
    private mainSvc: MainService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {}

  async myUploader(event: any) {
    try {
      const path = localStorage.getItem('current-path') || '';
      const files = event.files;
      let res: any = null;
      if (files.length > 1) {
        res = await this.mainSvc.upload(files, path, 'MULTIPLE');
        console.log('multiple file', res);
      } else if (files.length === 1) {
        res = await this.mainSvc.upload(files[0], path, 'SINGLE');
      }
      if (res) {
        if (res.length) {
          const successDocCount = res?.filter(
            (docResponse: any) => docResponse?.status === 1
          )?.length;
          const failedDocDocCount = res?.filter(
            (docResponse: any) => docResponse?.status === -1
          )?.length;
          const duplicateDocDocCount = res?.filter(
            (docResponse: any) => docResponse?.status === 0
          )?.length;

          this.toastSvc.success(
            'Success',
            `(${successDocCount}) - upload succesful. (${failedDocDocCount}) - failed document. (${duplicateDocDocCount}) - duplicate document`
          );
        }
        if (res?.status === 1)
          this.toastSvc.success('upload succesful.', 'Success');
        if (res?.status === 0)
          this.toastSvc.warning('File already exists.', 'Warning');
        if (res?.status === -1) this.toastSvc.error('uploaed Failed.', 'Error');
        this.ref.close(path);
      }
    } catch (error) {
      console.error(error);
      this.toastSvc.error('failed to upload');
    }
  }
}
