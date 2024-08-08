// frontend/app.js
const API_URL = "http://localhost:5000/api/transactions";

const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

// Fetch transactions
const fetchTransactions = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayTransactions(data);
};

// Display transactions
const displayTransactions = (transactions) => {
  transactionList.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${transaction.type}: $${transaction.amount} - ${transaction.category}</span>
      <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
    `;
    transactionList.appendChild(li);
  });
};

// Add transaction
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const newTransaction = { type, amount, category, description };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTransaction),
  });

  const data = await res.json();
  displayTransactions([data, ...transactions]);
  form.reset();
});

// Delete transaction
const deleteTransaction = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  fetchTransactions();
};

// Initial fetch
fetchTransactions();
