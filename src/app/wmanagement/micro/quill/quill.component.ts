import { Component, OnInit, ElementRef } from '@angular/core';
import * as Quill from 'quill';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.css']
})
export class QuillComponent implements OnInit {
  editor;
  _editor;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this._editor = this.elementRef.nativeElement.querySelector('#editor');
    console.log('editor: ', this._editor);

    const options = {
      debug: 'info',
      placeholder: 'Compose an epic...',
      theme: 'snow'
    };

    this.editor = new Quill(this._editor, options);
  }

}
