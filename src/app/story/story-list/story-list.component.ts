import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Story } from 'src/app/shared/models/story.model';
import { StoriesService } from 'src/app/shared/services/stories.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories$: Observable<Story[]>;

  constructor(public storiesService: StoriesService) {}

  ngOnInit() {
    this.stories$ = this.storiesService.getStories();
  }
}
