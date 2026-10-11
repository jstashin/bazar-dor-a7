const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("ক্যাটাগরি লোড করা যায়নি");
  }

  const categories = await response.json();

  return categories;
}
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  return response.json();
}