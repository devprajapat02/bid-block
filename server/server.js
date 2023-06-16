const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

/*

1. Owner lists the product
2. Owner begins the auction
3. Bidders bid on the product
    a. Bidders can see the current highest bid, previous bids
    b. Bidder bids with money on top of her previous bid
        i. Bid validation (value, time, current highest bid)
        ii. Previous highest bidder withdraw enabled
    c. Bidder can withdraw her bid (if she is not the highest bidder)
4. Auction time ends
5. Winner approves the product and then the contract pays the owner
6. Unsuccesful bids can still be withdrawn

*/