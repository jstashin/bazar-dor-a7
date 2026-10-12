const BASE_URL = "https://openapi.programming-hero.com/api/bazardor"

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("ক্যাটাগরি লোড করা যায়নি");
  }

  return response.json();
}

export async function getProducts(category) {
  const endpoint = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  return response.json();
}