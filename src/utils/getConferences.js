export async function getConferences() {
  const res = await fetch(
    "https://ek5vkt4dxb.execute-api.eu-central-1.amazonaws.com/dev/conferences",
    {
      method: "GET",
    }
  );

  const data = await res.json();

  return data;
}
