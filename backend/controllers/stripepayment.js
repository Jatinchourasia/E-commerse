require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPR_KEY);
const { v4: uuidv4 } = require("uuid");

exports.makePayment = (req, res) => {
  const { product, token } = req.body;

  let amount = 0;
  product.map((p) => {
    amount = amount + p.price;
  });
  // idmpkey so user charge only once
  const idempotencykey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charge.create(
        {
          amount: amount,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: "a test account",

          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        { idempotencykey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
