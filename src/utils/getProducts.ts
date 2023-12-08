const API_URL = process.env.API_URL;

const getData = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = response.json();
  return products;
};

export default getData;
