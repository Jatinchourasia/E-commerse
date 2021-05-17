import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  // console.log("from order helper", userId, token, orderData);
  const stringfyData = JSON.stringify({ order: orderData });
  // console.log("stringfyData", stringfyData);
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};
