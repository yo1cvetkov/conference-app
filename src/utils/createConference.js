export default async function createConference(body) {
  const response = await fetch(
    "https://bujmdxjfm0.execute-api.eu-central-1.amazonaws.com/dev/conferences",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return response;
}
