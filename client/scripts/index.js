document.getElementById('prediction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const location = document.getElementById('location').value;
    const sqft = document.getElementById('sqft').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
  
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location,
        sqft: parseFloat(sqft),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms)
      })
    });
  
    const data = await response.json();
  
    document.getElementById('result').innerText =
      data.price ? `Estimated Price: ₹ ${data.price.toLocaleString()} Lakhs` : 'Prediction failed.';
  });
  