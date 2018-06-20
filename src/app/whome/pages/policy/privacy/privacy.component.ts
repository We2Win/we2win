/**
 * @file privacy.component.ts
 * @author
 * @brief a page for showing company's privacy info. (/policy/privacy)
 */
import { Component, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/contents.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  providers: [ContentsService]
})
export class PrivacyComponent implements OnInit {
  content;

  constructor(
    private contentsService: ContentsService
  ) { }

  ngOnInit() {
    this.contentsService.getCompanyInfo('privacy').subscribe(
      content => {
        console.log(content);
        this.content = content.content.contents;
      }
    );
  }
}
