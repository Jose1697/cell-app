import { ComponentObject, ComponentContext } from '@testing/wdio-page-objects';
import {Movement} from "src/common/model/movement";

@ComponentContext({
  wrapper: 'bbva-list-movement',
})
export class MovementComponent extends ComponentObject {
  get title() {
    return $('.title');
  }

  titleText(): string {
    return $('.title').getText();
  }

  getMovement(): Movement {
    return {
      title: this.titleText()
    }
  }

  viewDetail() {
    this.title.click()
  }
}