import {Injectable} from '@angular/core';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';

import {Cookie} from 'ng2-cookies';
import {environment} from "../../../environments/environment";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {ApiService} from "../../core/services/api.service";

@Injectable()
export class UploadService {
  public uploader: FileUploader;

  private responseSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private response$: Observable<any[]> = this.responseSubject.asObservable();
  private responseList: any[] = [];
  private additionalParameters: Object;

  constructor(private apiService: ApiService) {
  }

  public getItems(): FileItem [] {
    return this.uploader.queue;
  }

  public addItem(item: FileItem) {
    const items = [];
    items.push(item);
    this.uploader.addToQueue(items);
  }

  public saveAll(): Observable<any[]> {
    this.uploader.uploadAll();
    return this.response$;
  }

  public remove(item: FileItem) {
    this.uploader.removeFromQueue(item);
  }

  public removeAll(): any {
    this.uploader.clearQueue();
  }

  public getFile(id: number): Observable<any> {
    return this.apiService.get(environment.api_url_resource + '/adjunto/' + id);

  }
  public getFiles(ids: number[]): Observable<any> {
    console.log(environment.api_url_resource);
    return this.apiService.post('/adjunto/adjuntos', ids);
  }

  public setConfig(url?: string): void {

    const urlSource =  (url || environment.api_url_resource + '/adjunto/upload');

    this.uploader = new FileUploader({url: urlSource});

    this.uploader.authToken = `Bearer ${Cookie.get('access_token')}`;

    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (response) {
        const data = JSON.parse(response);
        this.responseList.push(data);
        return data;
      }
    };
    this.uploader.onCompleteAll = () => {
      this.responseSubject.next(this.responseList);
      return true;
    };
  }
  public getAdditionalParameters () {
    return this.additionalParameters;
  }
  public setAdditionalParameters(pObjectArray)  {
    this.additionalParameters = pObjectArray;
    this.uploader.onBuildItemForm = (item, form) => {
       for (const prop in pObjectArray) {
         if (pObjectArray.hasOwnProperty(prop)) {
          form.append(prop, pObjectArray[prop]);
        }
      }
    };
  this.uploader.options.additionalParameter = this.additionalParameters;
  }
}
