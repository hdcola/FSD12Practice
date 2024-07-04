export async function search(input) {
  try {
    const res = await fetch(`http://100.89.152.5:8080/api/direct?q=${input}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return {
      display_name: data.display_name,
      lat: data.lat,
      lon: data.lon,
    };
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return null;
  }
}
