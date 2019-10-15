define([], function () {

    class CashierView {
        constructor() {
            // Page elements:
            this._clearButton = document.getElementById("clear");
            this._checkoutButton = document.getElementById("checkout");
            this._productButtons = document.getElementsByClassName("product");
            this._receiptDiv = document.getElementById("receipt");
            this._itemvalueSpan = document.getElementById("item-value");
            this._logContainer = document.getElementById("log-container");

            this._bTotalShown = false;
            this.init()
        }

        init () {
            this._initCommandButtons();
        }

        // remove captions
        _initCommandButtons() {
            this._clearButton.innerHTML = "";
            this._checkoutButton.innerHTML = "";
        }

        // set icons
        showProductButtons(items) {
            items.forEach((item, index)=>{
                this._productButtons[index].style.backgroundImage = `url('${item.icon}')`;
                this._productButtons[index].style.backgroundRepeat = 'no-repeat';
                this._productButtons[index].style.backgroundPosition = 'center';
            })
        }

        // bind handler for click event of clear button
        bindClearReceipt(handler) {
            this._clearButton.addEventListener('click', handler);
        }

        // bind handler for click event of checkout button
        bindCheckoutReceipt(handler) {
            this._checkoutButton.addEventListener('click', handler);
        }

        // bind handler for click event of product buttons
        bindProductButtons(handler) {
            for (let i = 0; i < this._productButtons.length; i++) {
                this._productButtons[i].addEventListener('click', (event)=>{
                    handler(i);
                });
            }
        }

        // Show Value
        showItemValue(value) {
            this._itemvalueSpan.innerHTML = value;
        }

        // Append Receipt Item
        appendReceiptItem(item) {
            // if (this._bTotalShown) {
            //     let total_elements = this._logContainer.getElementsByClassName("receipt-total-item");
            //     while (total_elements.length > 0) {
            //         total_elements[0].parentNode.removeChild(total_elements[0]);
            //     }
            //     this._bTotalShown = false;
            // }

            /** @NOTE 👆🏻 You don't need to do this, neither _bTotalShown boolean
             *
             */

            let receipt_item = document.createElement("div");
            receipt_item.classList.add("receipt-item");
            receipt_item.innerHTML = `<span>${item.name}</span><span class='item-value'>${item.value}&euro;</span>`;
            this._logContainer.appendChild(receipt_item);
        }

        // Append Total Item
        appendTotalItem(total) {
            let total_item = document.createElement("div");
            total_item.classList.add("receipt-total-item");
            total_item.innerHTML = `Total: ${parseFloat(total.toFixed(2))}&euro;`;
            this._logContainer.appendChild(total_item);

            /** @NOTE
             * restart parameters after append total items, see in CashierController -> _handleCheckoutReceipt()
             */
        }

        // Remove All Items from Receipt View
        remoteAllItems() {
            this._logContainer.innerHTML = "";
        }
    }

    return CashierView;
});