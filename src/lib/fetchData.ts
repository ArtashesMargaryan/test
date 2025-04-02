export default async function fetchData(): Promise<Item[]> {
  try {
    const res = await fetch(
      "https://api.qumiqo.com/api/posts?_limit=100&type=newest&page=1"
    );
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error("Error fetching:", e);
    return [];
  }
}
