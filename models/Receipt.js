define([], function () {

   class Receipt {
        constructor() {
            this._receiptList = [];
            this._totalValue = 0;
        }

        // add Item to Receipt List
        addItemToReceipt = (item) => {
            this._receiptList.push(item);
            this._totalValue += item.value;
        }

        // clear Receipt List
        clearReceiptList = () => {
            this._receiptList.length = 0;
            this._totalValue = 0;
        }

        // get Receipt List
        getReceiptList = () => this._receiptList

        // get Total Receipt Value
        getTotalValue = () => parseFloat(this._totalValue.toFixed(2))
    }

    return Receipt;
})