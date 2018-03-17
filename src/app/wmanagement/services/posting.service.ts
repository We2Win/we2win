import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { PostItem } from '../models/post-item';

@Injectable()
export class PostingService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  loadComponent(viewContainerRef: ViewContainerRef, postItem: PostItem) {
    const componentFactory = this.componentFactoryResolver
                                .resolveComponentFactory(postItem.component);
    // viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const myPost: any = <any>componentRef.instance;
    myPost.record = postItem.data;
  }
}
