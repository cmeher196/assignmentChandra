const fs = require('fs');
const Order = require('./model/order');

module.exports = {
    parseOrderData,
}

/**
   * This method is used to parse raw data read from text file to array of object of type Order.
   *
   * @memberof service
   */

function parseOrderData() {
    let orders = [];
    return new Promise(async (resolve, reject) => {
        try {
            const rawData = await getRawData();
            const rows = rawData.split('\r\n');
            rows.forEach(row => {
                let col = row.split(',');
                if (col) {
                    let order = new Order(col[0], col[1], col[2], col[3]);
                    orders.push(order);
                }

            });
            resolve(orders);

        } catch (error) {
            console.log("Data Parse Failed.");
            reject(error);
        }
    });
}

/**
  * This method is used to parse the text data(raw) to JSON.
  *
  * @memberof service
  */
function getRawData() {
    return new Promise((resolve, reject) => {
        fs.readFile('customerdata.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}
