import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Info } from '../../models/info';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  private record: Info = {
    Title: 'No name',
    Description: 'nothing.'
  };
  @Input() level: string;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
    this.record.Title = 'Testing';
    this.record.Description = 'This is testing description';
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

}
