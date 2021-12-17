import { CellsPage } from "@cells/cells-page";
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from "lit-element";
import "@cells-components/cells-template-paper-drawer-panel";
import '@bbva-web-components/bbva-header-main';
import '@traning-igh/post-component/post-component.js';
import "@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js"


class PostPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return "post-page";
  }
  static get properties() {
    return {
      post: { type: Object },
    };
  }
  constructor() {
    super();
    this.post = {};
  }

  async firstUpdated()  {
    await this.updateComplete;
    this.subscribe('total-items',param => this.post = param);  
  }
  
  
  updated(changedProps) {
    console.log(changedProps);
  }

  

  async prueba(ev){
    this.post.coments.push(ev.detail);
  }

  static get styles() {
    return css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      width: 100%;
    }
    .main{
      height: calc(90vh);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    post-component{
      width: 80%;
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
            <post-component
              image=${this.post.image}
              date=${this.post.date}
              name=${this.post.name}
              description=${this.post.description}
              .coments=${this.post.coments}
              @add-coment=${this.prueba}
              @input=${this.test}
            >
            </post-component>
          </div>
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  
}
window.customElements.define(PostPage.is, PostPage);