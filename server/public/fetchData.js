function getReport() {

    let button = document.querySelector('button');
    button.disabled =true;
    let header = document.getElementById('head');
    header.innerHTML = "Generated Report"
    var ordersData = [];
    fetch('/api/orders').then(res => res.json()).then(res => {
        ordersData = res;

        //number of orders received and total amount.....
        let orderCount = 0;
        let totalAmount = 0;

        ordersData.map(order => {
            if (!isNaN(Number(order.amount))) {
                let amount = (Number(order.amount))
                orderCount++;                     //orders did the site receive
                totalAmount += amount             //calculating total amount.
            }
        })

        let orderNumber = document.getElementById('orderCount')
        let totalOrders = document.getElementById('totalOrders')
        orderNumber.innerHTML = orderCount
        totalOrders.innerHTML = totalAmount
        //added the field in index.html file..............


        //separation of parsed data w.r.t distribution of customers and stored them separate arrays
        let lookup = {};
        ordersData.shift();
        ordersData.forEach(element => {
            if (element.name in lookup) {
                lookup[element.name] = ++lookup[element.name];
            } else {
                lookup[element.name] = 1;
            }
        });

        let orderWithOne = []; // to store distribution of customers with exactly 1 order
        let orderWithTwo = []; //to store distribution of customers with exactly 2 order
        let orderWithThree = []; //to store distribution of customers with exactly 3 order
        let orderWithFour = [];  //to store distribution of customers with exactly 4 order
        let orderWithFive = [];  //to store distribution of customers with exactly 5+ order

        Object.keys(lookup).forEach((key, index) => { // pushing names with wrt to no of orders
            if (lookup[key] === 1) {
                orderWithOne.push(key);
            }
            else if (lookup[key] === 2) {
                orderWithTwo.push(key);
            }
            else if (lookup[key] === 3) {
                orderWithThree.push(key);
            }
            else if (lookup[key] === 4) {
                orderWithFour.push(key);
            }
            else if (lookup[key] >= 5) {
                orderWithFive.push(key);
            }
        })


        //create Table to store customers name who ordered exactly once.....
        var oneTable = document.getElementById('oneValue');
        let outerRow = document.createElement('tr');
        outerRow.appendChild(document.createElement('td'));
        outerRow.appendChild(document.createElement('td'));
        outerRow.cells[0].appendChild(document.createTextNode(`Customer with exact 1 orders`))
        oneTable.appendChild(outerRow)

        orderWithOne.forEach(ele => {
            let newRow = document.createElement('tr');
            newRow.appendChild(document.createElement('td'))
            newRow.cells[0].appendChild(document.createTextNode(`${ele}`))
            oneTable.appendChild(newRow)
        })
        //end of the section.....

        //creating table to display the data
        var dataTable = document.getElementById('dataTable'),
            table = document.createElement('table');

        var outerRowAll = document.createElement('tr');
        for (let i = 0; i < 5; i++) {
            outerRowAll.appendChild(document.createElement('td'));
            outerRowAll.cells[i].appendChild(document.createTextNode(`Customer with exact ${i + 1} orders`))
        }
        dataTable.appendChild(outerRowAll)

        //creating row and cols
        var outertr = document.createElement('tr');
        outertr.appendChild(document.createElement('td'));
        outertr.appendChild(document.createElement('td'));
        outertr.appendChild(document.createElement('td'));
        outertr.appendChild(document.createElement('td'));
        outertr.appendChild(document.createElement('td'));

        //adding customer names in table who have no of order 1
        var innertr_1 = document.createElement('tr');
        innertr_1.setAttribute('scope', 'row')
        for (let val_1 = 0; val_1 < orderWithOne.length; val_1++) {
            innertr_1.appendChild(document.createElement('tr'));
            innertr_1.appendChild(document.createTextNode(`${orderWithOne[val_1]}`))
            outertr.cells[0].appendChild(innertr_1);
        }

        // adding customer names in table who have no of order 2
        var innertr_2 = document.createElement('tr');
        for (let val_1 = 0; val_1 < orderWithTwo.length; val_1++) {
            if (orderWithTwo[val_1] != "undefined") {
                innertr_2.appendChild(document.createElement('tr'));
                innertr_2.appendChild(document.createTextNode(`${orderWithTwo[val_1]}`))
                outertr.cells[1].appendChild(innertr_2);
            }
        }

        //adding customer names in table who have no of order 3
        var innertr_3 = document.createElement('tr');
        for (let val_1 = 0; val_1 < orderWithThree.length; val_1++) {
            // var innertr_2 = document.createElement('tr');
            innertr_3.appendChild(document.createElement('tr'));
            innertr_3.appendChild(document.createTextNode(`${orderWithThree[val_1]}`))
            outertr.cells[2].appendChild(innertr_3);
        }

        //adding customer names in table who have no of order 4
        var innertr_4 = document.createElement('tr');
        for (let val_1 = 0; val_1 < orderWithFour.length; val_1++) {
            innertr_4.appendChild(document.createElement('tr'));
            innertr_4.appendChild(document.createTextNode(`${orderWithFour[val_1]}`))
            outertr.cells[3].appendChild(innertr_4);
        }

        //adding customer names in table who have no of order 5+
        var innertr_5 = document.createElement('tr');
        for (let val_1 = 0; val_1 < orderWithFive.length; val_1++) {
            innertr_5.appendChild(document.createElement('tr'));
            innertr_5.appendChild(document.createTextNode(`${orderWithFive[val_1]}`))
            outertr.cells[4].appendChild(innertr_5);
        }
        dataTable.appendChild(outertr); 

        //creating bar graph using anychart..
        anychart.onDocumentReady(function () { // to draw Bar Graph!!
            // set the data
            var data = {
                header: ["Name", "No of Customer"],
                rows: [
                    ["Orders exactly 1", orderWithOne.length],
                    ["Orders exactly 2", orderWithTwo.length],
                    ["Orders exactly 3", orderWithThree.length],
                    ["Orders exactly 4", orderWithFour.length],
                    ["Orders exactly 5+", orderWithFive.length],
                ]
            };
            // create the chart
            var chart = anychart.bar();
            // add data
            chart.data(data);
            // set the chart title
            chart.title("Distribution of customers ");
            // draw
            chart.container("container");
            chart.draw();
        });
    });
}