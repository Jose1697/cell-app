import { CellsPage } from "@cells/cells-page";
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from "lit-element";
import "@cells-components/cells-template-paper-drawer-panel";
import "@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js";
import "@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js";
import "@bbva-web-components/bbva-web-header-landing/bbva-web-header-landing.js";
import '@bbva-web-components/bbva-header-main';
import '@traning-igh/stories-component/stories-component.js';
import '@traning-igh/profile-component/profile-component.js';
import '@traning-igh/post-card-component/post-card-component.js';

import { getListPosts, getListStories, getProfile, getSuggestions} from '../../elements/movements-dm/movements-dm';

class FeedPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return "feed-page";
  }
  static get properties() {
    return {
      posts: { type: Array },
      stories: { type: Array },
      profile: { type: Object },
      sugerence: { type: Array }
    };
  }
  constructor() {
    super();
    this.stories = [];
    this.posts = [];
    this.profile = {};
    this.sugerence = [];

  }

  async firstUpdated()  {
    await this.updateComplete;
    getListPosts().then( e => {
      this.posts = e.posts;
    });

    getListStories().then( e => {
      this.stories = e.stories;
    });

    getProfile().then( e => {
      this.profile = e;
    });
    
    getSuggestions().then( e => {
      this.sugerence = e.sugerence;
    });
    
  }

  _findPost(name){
    let post
    this.posts.map(i =>{
      console.log(name == i.name);
      if(name == i.name){
        post = i;
      }
    })
    return post;
  }

  _onPostSelection(ev){
    let name = ev.path[4].__heading;
    console.log(typeof(name));
    let post = this._findPost(name);
    console.log(post);
    this.publish('total-items',post);
    this.navigate('post');
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f1ecec;
        padding-top: 10px;
      }
      .feed{
        display: flex;
        width:73%;
      }
      .publications{
        width: 65%;
      }
      .profile{
        padding-top: 13%;
        padding-left: 5%;
      }
      .post{
        text-decoration:none;
      }
      .suggestion-profile profile-component{
        margin-bottom:10px;
      }
      .suggestion-profile :host{
        --width--profile--card: 20px;
      }
      stories-component{
        margin-bottom: 30px;
      }
      post-card-component{
        margin-bottom: 8%;
        background: white;
      }
      :host {
        max-width: 34.5rem;
        --height--profile--card:70px;
        --width--profile--card:70px

      }
         
    `;
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel>
        <div slot="app__header" >       
          <bbva-header-main
            text="Instagram" >
          </bbva-header-main>
        </div>

        <div slot="app__main" class="main">
          
          <div class="container">
            <div class="feed">
              <div class="publications">
                <stories-component .stories=${this.stories}></stories-component>
                ${this.posts.map(i => 
                html`
                  <a class="post"  @click="${this._onPostSelection}">
                    <post-card-component .post=${i}></post-card-component>
                  </a>
                `
                )}
              </div>
              <div class="profile">
                <div class="my-profile">
                  <profile-component .item=${this.profile}></profile-component>
                </div>
                <div class="suggestion">
                  <div class="suggestion-title">
                    <p>Sugerencias para ti</p>
                  </div>
                  <div class="suggestion-profile">
                    ${this.sugerence.map(i => 
                    html`<profile-component .item=${i}></profile-component>`
                    )}
                  </div>
                  
                </div>

                
              </div>
            </div> 
          </div>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  
}
window.customElements.define(FeedPage.is, FeedPage);
