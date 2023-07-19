document.addEventListener('DOMContentLoaded', function() {
  // Connect Metamask wallet
  document.getElementById("connectButton").addEventListener("click", function() {
    if (window.ethereum) {
      // Request access to Metamask accounts
      ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts) {
          var address = accounts[0];
          var formattedAddress = address.slice(0, 6) + "..." + address.slice(-4);
          document.getElementById("address").value = formattedAddress;
        })
        .catch(function(error) {
          document.getElementById("address").value = "Error: " + error.message;
        });
    } else {
      alert("Metamask is not installed. Please install Metamask to continue.");
    }
  });

  document.getElementById('houseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadHouse();
  });
});

function uploadHouse() {
  const houseName = document.getElementById('seller').value;
  const housePrice = document.getElementById('price').value;
  const bedrooms = document.getElementById('rooms').value;
  const state = document.getElementById('state').value;
  const location = document.getElementById('street').value;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable()
      .then(function(accounts) {
        var account = accounts[0];
        var amount = web3.utils.toWei(housePrice, 'ether');

        // Prepare the transaction parameters
        var transactionParams = {
          from: account,
          to: '0xF7F765c4Eba30b2a10C36Aea3e3aBF85DDAa2f99', // Repace with the recipient's wallet address
          value: amount,
          gas: 200000 // Adjust the gas limit as per your requirement
        };

        // Send the transaction
        web3.eth.sendTransaction(transactionParams)
          .then(function(result) {
            console.log(result);
            alert('Payment successful!');
            // Perform house upload logic here
            // You can proceed with storing the data in a database or making API calls
            // Clear the form inputs
            document.getElementById('seller').value = '';
            document.getElementById('price').value = '';
            document.getElementById('rooms').value = '';
            document.getElementById('state').value = '';
            document.getElementById('street').value = '';
          })
          .catch(function(error) {
            console.error(error);
            alert('Payment failed. Please try again.');
          });
      })
      .catch(function(error) {
        console.error(error);
        alert('Failed to connect to Metamask or authorize account. Please make sure you have authorized access in Metamask.');
      });
  } else {
    alert("Metamask is not installed. Please install Metamask to continue.");
  }
}
