import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { MediaComponent } from '../../shared/media.component';
import { BLOG_POSTS } from '../../core/site-data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, IconComponent, MediaComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h1>Pool Care Blog</h1>
          <p>Practical advice from technicians who service Arizona pools every day.</p>
        </div>

        @if (featured(); as post) {
          <article class="card feature">
            <app-media
              class="feature__media"
              [image]="post.image"
              ratio="16 / 10"
              sizes="(max-width: 860px) 100vw, 560px"
              [priority]="true"
            />
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
              <app-media
                class="post__media media--flush-top"
                [image]="post.image"
                ratio="16 / 10"
                sizes="(max-width: 900px) 50vw, 360px"
              />
              <span class="pill">{{ post.category }}</span>
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

      .post {
        overflow: hidden;
      }

      .post__media {
        margin: -20px -20px 12px;
      }

      .post .pill {
        margin-bottom: 8px;
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
