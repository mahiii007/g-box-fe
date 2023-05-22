import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { UploadComponent } from '../upload/upload.component';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  providers: [DialogService, ToastService],
})
export class MainContentComponent implements OnInit {
  public loading = false;
  driveDetails: IDirectory[] = [];
  menuItems: MenuItem[] = [];
  actionItems: MenuItem[] = [];
  currentPath = '';

  items = [{ label: 'My Drive' }];

  value: string = '';
  browseFiles = false;

  constructor(
    private mainSvc: MainService,
    private dialogSvc: DialogService,
    private toastSvc: ToastService
  ) {
    this.setAddNewMenu(this);
    this.setActionMenu(this);
    this.load();
  }

  ngOnInit(): void {}

  save() {
    return;
  }

  async load() {
    try {
      this.loading = true;
      const res: any = await this.mainSvc.loadDirectory();
      if (res) {
        this.driveDetails = [...res];
      }
    } catch (error: any) {
      this.toastSvc.showIfError(error);
    } finally {
      this.loading = false;
    }
  }

  openAddNewFolderPanel(event: any) {
    this.dialogSvc.open(CreateFolderComponent, {
      header: 'Add New Folder',
      width: '30%',
      contentStyle: { height: '150px', overflow: 'hidden' },
      baseZIndex: 10000,
    });
  }

  openUploadFileOrFolderPanel(event: any) {
    this.dialogSvc.open(UploadComponent, {
      header: 'Upload',
      width: '40%',
      baseZIndex: 10000,
    });
  }

  setAddNewMenu(currentCompRef: MainContentComponent) {
    this.menuItems = [
      {
        label: 'New Folder',
        icon: 'pi pi-folder',
        command(event) {
          currentCompRef.openAddNewFolderPanel(event);
        },
      },
      {
        label: 'File/Folder Upload',
        icon: 'pi pi-cloud-upload',
        command(event) {
          currentCompRef.openUploadFileOrFolderPanel(event);
        },
      },
    ];
  }

  setActionMenu(currentCompRef: MainContentComponent) {
    this.actionItems = [
      {
        label: 'Preview',
        icon: 'pi pi-eye',
        command(event) {
          currentCompRef.previewFile();
        },
      },
      {
        label: 'Download',
        icon: 'pi pi-cloud-download',
        command(event) {
          currentCompRef.downloadFile();
        },
      },
    ];
  }

  async onRowDoubleClick(data: IDirectory) {
    console.log('🚀 ~ data:', data);
    if (!data.dir) {
      const res: any = await this.mainSvc.loadFile(data.name, this.currentPath);
      if (res) {
        const file = new Blob(res, { type: data.type });
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    }
    try {
      this.loading = true;
      this.items.push({ label: data.name });
      this.items = [...this.items];
      let pathList = this.items.map((item) => item.label);
      pathList = pathList.slice(1);
      this.currentPath = pathList.join('/');

      const res: any = await this.mainSvc.loadDirectory(this.currentPath);
      if (res) {
        this.driveDetails = [...res];
      }
    } catch (error: any) {
      this.toastSvc.showIfError(error);
    } finally {
      this.loading = false;
    }
  }

  previewFile() {}

  downloadFile() {}

  handleFiles(event: any) {
    console.log('🚀 ~ event:', event);
  }
}

interface IDirectory {
  name: string;
  type: string;
  dir: boolean;
  lastModifiedAt: string;
  size: number;
}
