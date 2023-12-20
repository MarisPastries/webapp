const API_URL = process.env.API_URL;

const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`, { cache: 'no-store' });
  const products = response.json();
  return products;
};

const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
  const categories = response.json();
  return categories;
};

export { getProducts, getCategories };
