import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  constructHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };
  }

  loadDirectory(folderPath = '') {
    let url = `${this.serverUrl}/drive/list?reqDir=${encodeURIComponent(
      folderPath
    )}`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  createFolder(name: string, folderPath = '/') {
    let url = '';
    url = `${this.serverUrl}/api/create-folder`;
    return this.http
      .post(url, { name: name, path: folderPath }, this.constructHttpOptions())
      .toPromise();
  }

  upload(file: any, folderPath = '/') {
    let fileData: FormData = new FormData();
    fileData.append('file', file, file.name);
    fileData.append('path', folderPath);
    let url = `${this.serverUrl}/api/upload`;
    return this.http
      .post(url, fileData, this.constructHttpOptions())
      .toPromise();
  }
}
