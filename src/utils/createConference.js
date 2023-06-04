export default async function createConference(body) {
  const response = await fetch(
    "https://ek5vkt4dxb.execute-api.eu-central-1.amazonaws.com/dev/conferences",
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
