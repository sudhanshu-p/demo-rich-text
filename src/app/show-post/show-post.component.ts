import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrl: './show-post.component.css'
})
export class ShowPostComponent implements OnInit{
  post: { id: string; body: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownService
  ) { }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    console.log("Post Id: " + postId)
    if (postId) {
      this.fetchPost(+postId);
    }
  }

  fetchPost(postId: number) {
    fetch(`http://localhost:3000/post/${postId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          this.post = null; // Post not found
          return 
        } else {
          throw new Error('Error fetching post');
        }
      })
      .then((post) => {
        this.post = post;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
