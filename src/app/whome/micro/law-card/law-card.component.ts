import { Component, OnInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Card } from '../../models/card';
import { FbShareService } from '../../services/fb-share.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ContentsService } from '../../services/contents.service';

@Component({
  selector: 'app-law-card',
  templateUrl: './law-card.component.html',
  styleUrls: ['./law-card.component.css']
})
export class LawCardComponent implements OnInit {
  @Input('record') record;
  @Input() level = 'standard';

  imageUrl = '/assets/img/icon_document.png';

  constructor(
    private _elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private fbShareService: FbShareService,
    private auth: AuthService,
    private contentsService: ContentsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // console.log(this.record);
    if (this.record['file']) {
      switch (this.record['file'].split('.')[1]) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
          this.imageUrl = environment.bucket.downloadUrl + this.record['file'];
          break;
      }
    }

    this._elementRef.nativeElement.classList.add(this.record['level'].toLowerCase());
  }

  bookmark() {
    const bookmark = this._elementRef.nativeElement.querySelector('#bookmark');

    if (bookmark.classList.contains('selected')) {
      bookmark.src = '/assets/img/icon_bookmark.png';
      bookmark.classList.remove('selected');
    } else {
      bookmark.src = '/assets/img/icon_bookmark_selected.png';
      bookmark.classList.add('selected');
    }
  }

  fbShare() {
    this.fbShareService.share(environment.homeUrl + '//report' + this.record['id']);
  }

  download() {
    if (this.auth.isAuthenticated()) {
      this.contentsService.getFilePath(this.record['c-id']);
      window.location.assign(environment.bucket.downloadUrl + this.record['file']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
