export async function getAllUsers() {
  const res = await fetch(
    "https://ek5vkt4dxb.execute-api.eu-central-1.amazonaws.com/dev/users",
    {
      method: "GET",
    }
  );

  const data = await res.json();

  return data;
}
