import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  serverUrl = 'http://localhost:2424';

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
    let url = '';
    if (folderPath) {
      url = `${this.serverUrl}/api/load?foldername=${folderPath}`;
    } else {
      url = `${this.serverUrl}/api/load/`;
    }
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }
}
