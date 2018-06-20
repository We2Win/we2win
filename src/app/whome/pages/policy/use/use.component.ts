/**
 * @file use.component.ts
 * @author
 * @brief a page for showing company's use info. (/policy//use)
 */
import { Component, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.css'],
  providers: [ContentsService]
})
export class UseComponent implements OnInit {
  content;

  constructor(
    private contentsService: ContentsService
  ) { }

  ngOnInit() {
    this.contentsService.getCompanyInfo('use').subscribe(
      content => {
        console.log(content);
        this.content = content.content.contents;
      }
    );
  }

}
