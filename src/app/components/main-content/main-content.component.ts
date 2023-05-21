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
  driveDetails: any = [];
  menuItems: MenuItem[] = [];
  actionItems: MenuItem[] = [];

  childData = [
    {
      id: 7,
      name: 'OdioOdioElementum.mp3',
      type: 'Transcof',
      dir: false,
      modifiedDate: '9/11/2022',
      size: '3XL',
    },
    {
      id: 8,
      name: 'AtDiam.xls',
      type: 'Overhold',
      dir: true,
      modifiedDate: '1/25/2023',
      size: 'XL',
    },
    {
      id: 9,
      name: 'NuncVestibulum.mp3',
      type: 'Cardify',
      dir: true,
      modifiedDate: '11/27/2022',
      size: '2XL',
    },
    {
      id: 10,
      name: 'SuscipitLigula.tiff',
      type: 'Kanlam',
      dir: true,
      modifiedDate: '11/10/2022',
      size: 'S',
    },
  ];

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
      this.mainSvc.loadDirectory();
      setTimeout(() => {
        this.driveDetails = [
          {
            id: 1,
            name: 'At.doc',
            type: 'Tres-Zap',
            dir: false,
            modifiedDate: '12/19/2022',
            size: '3XL',
          },
          {
            id: 2,
            name: 'NullaSedVel.ppt',
            type: 'Zontrax',
            dir: true,
            modifiedDate: '5/13/2023',
            size: '3XL',
          },
          {
            id: 3,
            name: 'VivamusTortorDuis.tiff',
            type: 'Konklux',
            dir: true,
            modifiedDate: '11/13/2022',
            size: 'M',
          },
          {
            id: 4,
            name: 'PorttitorLorem.doc',
            type: 'Konklux',
            dir: true,
            modifiedDate: '9/6/2022',
            size: 'L',
          },
          {
            id: 5,
            name: 'Vestibulum.doc',
            type: 'Sonair',
            dir: false,
            modifiedDate: '4/14/2023',
            size: 'L',
          },
          {
            id: 6,
            name: 'TinciduntEgetTempus.mp3',
            type: 'Lotlux',
            dir: true,
            modifiedDate: '11/24/2022',
            size: 'M',
          },
          {
            id: 7,
            name: 'OdioOdioElementum.mp3',
            type: 'Transcof',
            dir: false,
            modifiedDate: '9/11/2022',
            size: '3XL',
          },
          {
            id: 8,
            name: 'AtDiam.xls',
            type: 'Overhold',
            dir: true,
            modifiedDate: '1/25/2023',
            size: 'XL',
          },
          {
            id: 9,
            name: 'NuncVestibulum.mp3',
            type: 'Cardify',
            dir: true,
            modifiedDate: '11/27/2022',
            size: '2XL',
          },
          {
            id: 10,
            name: 'SuscipitLigula.tiff',
            type: 'Kanlam',
            dir: true,
            modifiedDate: '11/10/2022',
            size: 'S',
          },
          {
            id: 1,
            name: 'At.doc',
            type: 'Tres-Zap',
            dir: false,
            modifiedDate: '12/19/2022',
            size: '3XL',
          },
          {
            id: 2,
            name: 'NullaSedVel.ppt',
            type: 'Zontrax',
            dir: true,
            modifiedDate: '5/13/2023',
            size: '3XL',
          },
          {
            id: 3,
            name: 'VivamusTortorDuis.tiff',
            type: 'Konklux',
            dir: true,
            modifiedDate: '11/13/2022',
            size: 'M',
          },
          {
            id: 4,
            name: 'PorttitorLorem.doc',
            type: 'Konklux',
            dir: true,
            modifiedDate: '9/6/2022',
            size: 'L',
          },
          {
            id: 5,
            name: 'Vestibulum.doc',
            type: 'Sonair',
            dir: false,
            modifiedDate: '4/14/2023',
            size: 'L',
          },
          {
            id: 6,
            name: 'TinciduntEgetTempus.mp3',
            type: 'Lotlux',
            dir: true,
            modifiedDate: '11/24/2022',
            size: 'M',
          },
          {
            id: 7,
            name: 'OdioOdioElementum.mp3',
            type: 'Transcof',
            dir: false,
            modifiedDate: '9/11/2022',
            size: '3XL',
          },
          {
            id: 8,
            name: 'AtDiam.xls',
            type: 'Overhold',
            dir: true,
            modifiedDate: '1/25/2023',
            size: 'XL',
          },
          {
            id: 9,
            name: 'NuncVestibulum.mp3',
            type: 'Cardify',
            dir: true,
            modifiedDate: '11/27/2022',
            size: '2XL',
          },
          {
            id: 10,
            name: 'SuscipitLigula.tiff',
            type: 'Kanlam',
            dir: true,
            modifiedDate: '11/10/2022',
            size: 'S',
          },
        ];
        this.toastSvc.success('SUCCESS', 'FILE/FOLDER LOADED SUCCESSFULLY');
        this.loading = false;
      }, 2000);
      if (this.driveDetails.length > 0) {
      }
    } catch (error: any) {
      this.toastSvc.showIfError(error);
    } finally {
      // this.loading = false;
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

  onRowDoubleClick(data: IDirectory) {
    console.log('🚀 ~ data:', data);
    if (!data.dir) {
      return;
    }
    try {
      this.loading = true;
      setTimeout(() => {
        this.driveDetails = [...this.childData];
        this.items.push({ label: data.name });
        this.items = [...this.items];
        this.loading = false;
      }, 4000);
    } catch (error: any) {
      this.toastSvc.showIfError(error);
    } finally {
      // this.loading = false;
    }
  }

  previewFile() {}

  downloadFile() {}

  handleFiles(event: any) {
    console.log('🚀 ~ event:', event);
  }
}

interface IDirectory {
  id: number;
  name: string;
  type: string;
  dir: boolean;
  modifiedDate: string;
  size: string;
}
