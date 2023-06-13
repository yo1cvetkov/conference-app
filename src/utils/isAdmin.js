export async function checkIsAdmin(id) {
  const res = await fetch(
    `https://bujmdxjfm0.execute-api.eu-central-1.amazonaws.com/dev/users/${id}/isAdmin`,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  return data;
}
