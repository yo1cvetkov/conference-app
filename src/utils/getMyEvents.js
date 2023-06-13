export async function getMyEvents(id) {
  const res = await fetch(
    `https://bujmdxjfm0.execute-api.eu-central-1.amazonaws.com/dev/my-events/${id}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();

  return data;
}
