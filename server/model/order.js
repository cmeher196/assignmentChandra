module.exports = class Order {
    constructor(date, phone, name, amount) {
        this.date = date;
        this.phone = phone;
        this.name = name;
        this.amount = amount;
    }
}