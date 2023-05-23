import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MainService } from 'src/app/main.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss'],
})
export class CreateFolderComponent implements OnInit {
  constructor(
    private mainSvc: MainService,
    private toastSvc: ToastService,
    public ref: DynamicDialogRef
  ) {}
  folderName = '';

  ngOnInit(): void {}

  async onAddClick() {
    try {
      const path = localStorage.getItem('current-path') || '';
      await this.mainSvc.createFolder(this.folderName, path);

      this.toastSvc.success('Folder Added Successfully.', 'SUCCESS');
      this.ref.close(path);
    } catch (error) {
      console.error(error);
      this.toastSvc.error('Failed to add folder.', 'ERROR');
    }
  }
}
