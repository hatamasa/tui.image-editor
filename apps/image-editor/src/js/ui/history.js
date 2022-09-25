import Panel from '@/ui/panelMenu';
import templateHtml from '@/ui/template/submenu/history';
import { assignmentForDestroy } from '@/util';

const selectedClassName = 'selected-item';
const disabledClassName = 'disabled-item';

/**
 * History ui class
 * @class
 * @ignore
 */
class History extends Panel {
  constructor({ locale, makeSvgIcon }) {
    super({ name: 'history' });

    this.locale = locale;
    this.makeSvgIcon = makeSvgIcon;
    this._eventHandler = {};
    this._historyIndex = this.getListLength();
  }

  /**
   * Add history
   * @param {string} name - name of history
   * @param {?string} detail - detail information of history
   */
  add({ name, detail }) {
    if (this._hasDisabledItem()) {
      this.deleteListItemElement(this._historyIndex + 1, this.getListLength());
    }

    const html = templateHtml({ locale: this.locale, makeSvgIcon: this.makeSvgIcon, name, detail });
    const item = this.makeListItemElement(html);

    this.pushListItemElement(item);
    this._historyIndex = this.getListLength() - 1;
    this._selectItem(this._historyIndex);
  }

  /**
   * Init history
   */
  init() {
    this.deleteListItemElement(1, this.getListLength());
    this._historyIndex = 0;
    this._selectItem(this._historyIndex);
  }

  /**
   * Clear history
   */
  clear() {
    this.deleteListItemElement(0, this.getListLength());
    this._historyIndex = -1;
  }

  /**
   * Select previous history of current selected history
   */
  prev() {
    this._historyIndex -= 1;
    this._selectItem(this._historyIndex);
  }

  /**
   * Select next history of current selected history
   */
  next() {
    this._historyIndex += 1;
    this._selectItem(this._historyIndex);
  }

  /**
   * Whether history menu has disabled item
   * @returns {boolean}
   */
  _hasDisabledItem() {
    return this.getListLength() - 1 > this._historyIndex;
  }

  /**
   * Change item's state to selected state
   * @param {number} index - index of selected item
   */
  _selectItem(index) {
    for (let i = 0; i < this.getListLength(); i += 1) {
      this.removeClass(i, selectedClassName);
      this.removeClass(i, disabledClassName);
      if (i > index) {
        this.addClass(i, disabledClassName);
      }
    }
    this.addClass(index, selectedClassName);
  }

  /**
   * Destroys the instance.
   */
  destroy() {
    assignmentForDestroy(this);
  }

  /**
   * Add event for history
   * @param {Object} actions - actions for crop
   *   @param {Function} actions.undo - undo action
   *   @param {Function} actions.redo - redo action
   */
  addEvent(actions) {
    this._actions = actions;
  }
}

export default History;
