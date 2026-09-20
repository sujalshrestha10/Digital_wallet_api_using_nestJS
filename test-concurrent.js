const requests = [
  fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletId: 52,
      type: "withdraw",
      amount: "4000",
    }),
  }),

  fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletId: 52,
      type: "withdraw",
      amount: "4000",
    }),
  }),
];

const responses = await Promise.all(requests);

for (const response of responses) {
  console.log(response.status);
  console.log(await response.text());
}