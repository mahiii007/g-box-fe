import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { UploadComponent } from '../upload/upload.component';
import { ToastService } from 'src/app/toast.service';
import prettyBytes from 'pretty-bytes';

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
  currentPathArr: string[] = [];

  items = [{ label: 'My Drive' }];

  searchValue: string = '';
  browseFiles = false;

  public currentFile: any = {};

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
      const path = localStorage.getItem('current-path') || '';
      this.currentPath = path;
      this.currentPathArr = path ? path.split('/') : [];
      this.items = [...this.setBreadCumb()];
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

  async openAddNewFolderPanel(event: any) {
    const ref = this.dialogSvc.open(CreateFolderComponent, {
      header: 'Add New Folder',
      width: '30%',
      contentStyle: { height: '150px', overflow: 'hidden' },
      baseZIndex: 10000,
    });
    ref.onClose.subscribe((path) => {
      this.mainSvc
        .loadDirectory(path)
        .then((res) => (this.driveDetails = [...(res as [])]))
        .catch((error) => {
          console.error(error);
        });
    });
  }

  openUploadFileOrFolderPanel(event: any) {
    const ref = this.dialogSvc.open(UploadComponent, {
      header: 'Upload',
      width: '40%',
      baseZIndex: 10000,
    });
    ref.onClose.subscribe((path) => {
      this.mainSvc
        .loadDirectory(path)
        .then((res) => (this.driveDetails = [...(res as [])]))
        .catch((error) => {
          console.error(error);
        });
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
          currentCompRef.downloadFile(event);
        },
      },
    ];
  }

  async onRowDoubleClick(data: IDirectory) {
    try {
      this.loading = true;
      if (!data.dir) {
        const res: any = await this.mainSvc.loadFile(
          data.name,
          this.currentPath
        );
        if (res) {
          const file = new Blob([res], { type: data.type });
          const url = URL.createObjectURL(file);
          window.open(url);
          return;
        }
        return;
      }

      this.items.push({ label: data.name });
      this.items = [...this.items];
      let pathList = this.items.map((item) => item.label);
      pathList = pathList.slice(1);
      this.currentPathArr = [...pathList];
      this.currentPath = pathList.join('/');
      localStorage.setItem('current-path', this.currentPath);

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

  async previewFile() {
    try {
      const res: any = await this.mainSvc.loadFile(
        this.currentFile.name,
        this.currentPath
      );
      if (res) {
        const file = new Blob([res], { type: this.currentFile.type });
        const url = URL.createObjectURL(file);
        window.open(url);
        return;
      }
      this.toastSvc.success('Successfully download', 'Success');
    } catch (error) {
      this.toastSvc.error('fialed to download');
      console.error();
    }
  }

  onRowClick(event: any) {
    this.currentFile = event;
  }

  async downloadFile(event: any) {
    try {
      const res: any = await this.mainSvc.loadFile(
        this.currentFile.name,
        this.currentPath
      );
      console.log(res);
      if (res) {
        const file = new Blob([res], { type: this.currentFile.type });
        const url = URL.createObjectURL(file);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = this.currentFile.name;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
      this.toastSvc.success('Successfully download', 'Success');
    } catch (error) {
      this.toastSvc.error('fialed to download');
      console.error();
    }
  }

  handleFiles(event: any) {}

  async onBreadcrumbItemClick(event: any) {
    try {
      this.loading = true;
      const currentClickedItem = event?.item?.label;
      if (currentClickedItem) {
        if (currentClickedItem === 'My Drive') {
          this.currentPath = '';
          this.currentPathArr = [];
          localStorage.removeItem('current-path');
          this.items = [{ label: 'My Drive' }];
        } else {
          const clickedIndex = this.currentPathArr.findIndex(
            (label) => label === currentClickedItem.toString()
          );
          if (clickedIndex !== -1) {
            this.currentPathArr = this.currentPathArr.slice(
              0,
              clickedIndex + 1
            );
            this.currentPath = this.currentPathArr.join('/');
            this.items = [...this.setBreadCumb()];
            localStorage.setItem('current-path', this.currentPath);
          }
        }
        const res: any = await this.mainSvc.loadDirectory(this.currentPath);
        if (res) {
          this.driveDetails = [...res];
        }
      }
    } catch (error: any) {
      console.error(error);
      this.toastSvc.showIfError(error);
    } finally {
      this.loading = false;
    }
  }

  setBreadCumb() {
    let arr = this.currentPathArr.map((each) => {
      const output = {
        label: each,
      };
      return output;
    });

    const output = [{ label: 'My Drive' }, ...arr];

    return output;
  }

  convertBytoToKb(byte: any) {
    return prettyBytes(byte, { minimumFractionDigits: 3 });
  }
}

interface IDirectory {
  name: string;
  type: string;
  dir: boolean;
  lastModifiedAt: string;
  size: number;
}
