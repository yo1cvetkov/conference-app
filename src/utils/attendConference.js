export async function attendConference(id, body) {
  const res = await fetch(
    `https://bujmdxjfm0.execute-api.eu-central-1.amazonaws.com/dev/conference/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = res.json();

  return data;
}
