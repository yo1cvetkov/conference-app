export async function editConference(id, body) {
  const res = await fetch(
    `https://ek5vkt4dxb.execute-api.eu-central-1.amazonaws.com/dev/conference/${id}/edit`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  console.log(res);
}
