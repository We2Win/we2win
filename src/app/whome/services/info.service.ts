import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Info } from '../models/info';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Card } from '../models/card';
import { DataItem } from '../models/data-item';
import { InfoCardComponent } from '../micro/info-card/info-card.component';


@Injectable()
export class InfoService {
    constructor(
        private http: HttpClient,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    loadComponent(
        viewContainerRef: ViewContainerRef,
        dataItem: DataItem
    ) {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(dataItem.component);
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const card: Card = <Card>componentRef.instance;
        card.data = DataItem.data;
    }

    getSample() {
        return [
            new DataItem(InfoCardComponent, {
                'Title': 'afacascsac',
                'Description': 'csacsac',
                'createdAt': '2018-03-03T14:33:41.000Z',
                'updatedAt': '2018-03-03T14:33:41.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing1',
                'Description': 'Done1',
                'createdAt': '2018-03-03T07:17:09.000Z',
                'updatedAt': '2018-03-03T07:17:09.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing13',
                'Description': 'Done1',
                'createdAt': '2018-03-03T07:17:06.000Z',
                'updatedAt': '2018-03-03T07:17:06.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing2',
                'Description': 'Done1',
                'createdAt': '2018-03-03T07:17:12.000Z',
                'updatedAt': '2018-03-03T07:17:12.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing3',
                'Description': 'Done1',
                'createdAt': '2018-03-03T07:17:14.000Z',
                'updatedAt': '2018-03-03T07:17:14.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing3uh',
                'Description': 'Done1',
                'createdAt': '2018-03-03T09:04:31.000Z',
                'updatedAt': '2018-03-03T09:04:31.000Z'
            }),
            new DataItem(InfoCardComponent, {
                'Title': 'Testing3uhju',
                'Description': 'Done1',
                'createdAt': '2018-03-03T09:36:02.000Z',
                'updatedAt': '2018-03-03T09:36:02.000Z'
            })
        ];
    }

    getAll() {
        // return this.http.get<Info[]>('/api/v1/infos')
        return this.http.get('/api/v1/infos')
            .map(data =>
                new DataItem(InfoCardComponent, data)
            );
    }
    getById(id: string) {
        return this.http.get('/api/v1/infos');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }
}
