import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { BLOG_POSTS } from '../../core/site-data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h1>Pool Care Blog</h1>
          <p>Practical advice from technicians who service Arizona pools every day.</p>
        </div>

        @if (featured(); as post) {
          <article class="card feature">
            <div class="media-placeholder feature__media"><span>Featured article</span></div>
            <div>
              <p class="muted small">{{ post.date }} · {{ post.category }} · {{ post.readMinutes }} min read</p>
              <h2>{{ post.title }}</h2>
              <p class="muted">{{ post.excerpt }}</p>
              <a class="link" routerLink="/contact">Read More <app-icon name="arrow" [size]="16" /></a>
            </div>
          </article>
        }

        <div class="grid grid--3">
          @for (post of rest(); track post.slug) {
            <article class="card post">
              <div class="media-placeholder post__media"><span>{{ post.category }}</span></div>
              <p class="muted small">{{ post.date }} · {{ post.readMinutes }} min read</p>
              <h3>{{ post.title }}</h3>
              <p class="muted">{{ post.excerpt }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .feature {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 24px;
        align-items: center;
        margin-bottom: 26px;
      }

      .feature__media {
        min-height: 240px;
      }

      .post__media {
        min-height: 130px;
        margin-bottom: 12px;
      }

      .post p:last-child {
        font-size: 0.875rem;
      }

      .small {
        font-size: 0.78rem;
      }

      .link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-weight: 600;
      }

      @media (max-width: 860px) {
        .feature {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class BlogComponent {
  readonly posts = BLOG_POSTS;
  readonly featured = computed(() => this.posts.find(post => post.featured));
  readonly rest = computed(() => this.posts.filter(post => !post.featured));
}
