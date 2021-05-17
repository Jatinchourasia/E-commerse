// const braintree = require("braintree");

// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//  merchantId: "zsrjvv2n8jzwh6c2",
//   publicKey: "8xr4mkszqqf9tzz6",
//   privateKey: "803fc1b152473a072785555974479642",
// });

  

// exports.getToken = (req, res) => {
//   gateway.clientToken.generate({}, (err, response) => {
//     // pass clientToken to your front-end
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send(response);
//     }
//   });
// };

// exports.processPayment = (req, res) => {
//   let nonceFromTheClient = req.body.paymentMethodNonce;
//   let amountFromTheClient = req.body.amount;

//   gateway.transaction.sale(
//     {
//       amount: amountFromTheClient,
//       paymentMethodNonce: nonceFromTheClient,
      
//       options: {
//         submitForSettlement: true,
//       },
//     },
//     (err, result) => {
//       if (err) {
//         res.status(500).json(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// };
