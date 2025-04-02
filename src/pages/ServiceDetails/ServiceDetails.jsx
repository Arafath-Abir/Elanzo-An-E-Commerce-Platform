const onSubmit = (data) => {
  console.log(data);
  data.productId = id;

  // Show loading state
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) loadingMessage.style.display = 'block';

  fetch("http://localhost:5000/order", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((res) => res.json())
  .then((result) => {
    console.log('Payment response:', result);
    if (result.status === 'success' && result.url) {
      // Redirect to SSLCommerz payment gateway
      console.log("Redirecting to: ", result.url);
      window.location.href = result.url;
    } else {
      // Hide loading state
      if (loadingMessage) loadingMessage.style.display = 'none';
      
      console.error('Payment initialization failed:', result.message);
      // Show error message to user
      alert('Payment initialization failed: ' + (result.message || 'Unknown error'));
    }
  })
  .catch(error => {
    // Hide loading state
    if (loadingMessage) loadingMessage.style.display = 'none';
    
    console.error('Payment request failed:', error);
    alert('Payment request failed: ' + error.message);
  });
};

const submitDirectForm = () => {
  // You can use this in your JSX instead of the form with onSubmit
  // This creates a form and submits it directly to the server, which then redirects to SSL Commerz
  
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'http://localhost:5000/init-payment-redirect';
  
  // Add form fields for your data
  const addField = (name, value) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  
  // Get values from your form or state
  const name = document.getElementById('name')?.value || '';
  const price = document.getElementById('price')?.value || '';
  const address = document.getElementById('address')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  
  // Add all necessary fields
  addField('name', name);
  addField('price', price);
  addField('address', address);
  addField('phone', phone);
  addField('productId', id);
  
  // Append to body and submit
  document.body.appendChild(form);
  form.submit();
}; 