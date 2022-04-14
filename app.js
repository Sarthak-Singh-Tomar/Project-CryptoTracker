const form = document.querySelector("#selectForm");
const result = document.querySelector("#tableResult");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const coinType = form.elements.coins.value;

  fetchPrice(coinType);
});

const fetchPrice = async (coinType) => {
  const r = await axios.get(
    `https://api.coinstats.app/public/v1/coins/${coinType}?/currency=INR`
  );
  const name = r.data.coin.name;
  const rank = r.data.coin.rank;
  const price = r.data.coin.price;
  const volume = r.data.coin.volume;
  const change = r.data.coin.priceChange1d;
  const target = "INR";
  var col = "green";
  if (change < 0) {
    col = "red";
  }
  result.innerHTML = `
  <tr class="bg-primary" style = "color:white">
  <td>Property</td>
  <td>Value</td>
</tr>
<tr>
  <td style="color:${col}">${name}</td>
  <td style="color:${col}">${price}</td>
</tr>
<tr>
  <td>Rank</td>
  <td>${rank}</td>
</tr>
<tr>
  <td>Volume (24 hrs)</td>
  <td>${volume}</td>
</tr>
<tr>
  <td style="color:${col}">Change (24 hrs)</td>
  <td style="color:${col}">${change}</td>
</tr>
  `;
};
