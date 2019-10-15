define([
  '../models/Items.js',
  '../models/Receipt.js',
  '../views/CashierView.js'
], function (
  Items, 
  Receipt, 
  CashierView
  ) {

  class CashierController {
    constructor() {
      this.items = new Items();
      this.receipt = new Receipt();
      this.cashierView = new CashierView();

      this.cashierView.bindClearReceipt(this._handleEmptyReceipt);
      this.cashierView.bindCheckoutReceipt(this._handleCheckoutReceipt);
      
      // set icons to buttons
      this.cashierView.showProductButtons(this.items.getItems());
      this.cashierView.bindProductButtons(this._handleClickProductButtons);

    }

    run() {

    }

    _handleEmptyReceipt = () => {
      this.receipt.clearReceiptList();
      this.cashierView.showItemValue("0");
      this.cashierView.remoteAllItems();
    }

    _handleCheckoutReceipt = () => {
      /** @NOTE Before checkout, check if total is 0 to avoid bugs */
      if (this.receipt.getTotalValue() === 0) {
        console.log('No Product Purchased!');
        this.cashierView.showItemValue("Error");
        return
      }

      this.cashierView.showItemValue(this.receipt.getTotalValue());
      this.cashierView.appendTotalItem(this.receipt.getTotalValue());

      /** @NOTE
       * Instead of bTotalShown boolean, restart parameters after append total items
       */
      this.receipt.clearReceiptList()
    }

    _handleClickProductButtons = (index) => {
      let product = this.items.getItem(index);

      /** @NOTE
       * instead IF ELSE clause, just catch in an IF the case you think can crash
       * Take a look at this Design Pattern called Anti-If
       * https://code.joejag.com/2016/anti-if-the-missing-patterns.html
       **/
      if (!product) {
        console.log('unknown product');
        this.cashierView.showItemValue("Error");
        return
      }

      /** @NOTE Before adding a product, check if total is 0, in that case remoteAllItems() */
      if (this.receipt.getTotalValue() === 0) {
        this.cashierView.remoteAllItems()
      }

      this.receipt.addItemToReceipt(product);
      this.cashierView.showItemValue(product.value);
      this.cashierView.appendReceiptItem(product);
    }
  }

  return CashierController;
});
