export default class Section {  
  
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
 
  render() {
    this._items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element, isArray) { 
    if (isArray) { 
      this._containerSelector.append(element); 
    } else { 
      this._containerSelector.prepend(element); 
    } 
  }
  
}