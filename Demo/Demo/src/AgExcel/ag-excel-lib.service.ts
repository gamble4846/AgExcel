import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgExcelLibService {

  constructor() { }

  setupExternalFiles(): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      let loadedCount = 0;
      let totalCount = 5;

      var cssId = 'jexcelCss';
      if (!document.getElementById(cssId)) {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'assets/AgExcel/Styles/jexcel.css';
        link.media = 'all';
        head.appendChild(link);

        link.onload = () => {
          loadedCount++;
          if (loadedCount >= totalCount) {
            observer.next(true);
            observer.complete();
          }
        };

        link.onerror = () => {
          observer.next(false);
          observer.complete();
        }
      }
      else {
        loadedCount++;
        if (loadedCount >= totalCount) {
          observer.next(true);
          observer.complete();
        }
      }

      cssId = 'jsuitesCss';
      if (!document.getElementById(cssId)) {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'assets/AgExcel/Styles/jsuites.css';
        link.media = 'all';
        head.appendChild(link);

        link.onload = () => {
          loadedCount++;
          if (loadedCount >= totalCount) {
            observer.next(true);
            observer.complete();
          }
        };

        link.onerror = () => {
          observer.next(false);
          observer.complete();
        }
      }
      else {
        loadedCount++;
        if (loadedCount >= totalCount) {
          observer.next(true);
          observer.complete();
        }
      }

      cssId = 'jexcelCustomCss';
      if (!document.getElementById(cssId)) {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'assets/AgExcel/Styles/jexcelCustom.css';
        link.media = 'all';
        head.appendChild(link);

        link.onload = () => {
          loadedCount++;
          if (loadedCount >= totalCount) {
            observer.next(true);
            observer.complete();
          }
        };

        link.onerror = () => {
          observer.next(false);
          observer.complete();
        }
      }
      else {
        loadedCount++;
        if (loadedCount >= totalCount) {
          observer.next(true);
          observer.complete();
        }
      }

      var jsId = 'jsuitesJs';
      if (!document.getElementById(jsId)) {
        let body = document.getElementsByTagName('body')[0];
        let scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = "assets/AgExcel/Scripts/jsuites.js";
        body.appendChild(scriptElement);

        scriptElement.onload = () => {
          loadedCount++;
          if (loadedCount >= totalCount) {
            observer.next(true);
            observer.complete();
          }
        };

        scriptElement.onerror = () => {
          observer.next(false);
          observer.complete();
        }
      }
      else {
        loadedCount++;
        if (loadedCount >= totalCount) {
          observer.next(true);
          observer.complete();
        }
      }

      jsId = 'jexcelJs';
      if (!document.getElementById(jsId)) {
        let body = document.getElementsByTagName('body')[0];
        let scriptElement = document.createElement('script');
        scriptElement.type = "text/javascript";
        scriptElement.src = "assets/AgExcel/Scripts/jexcel.js";
        body.appendChild(scriptElement);

        scriptElement.onload = () => {
          loadedCount++;
          if (loadedCount >= totalCount) {
            observer.next(true);
            observer.complete();
          }
        };

        scriptElement.onerror = () => {
          observer.next(false);
          observer.complete();
        }
      }
      else {
        loadedCount++;
        if (loadedCount >= totalCount) {
          observer.next(true);
          observer.complete();
        }
      }
    });
  }
}
