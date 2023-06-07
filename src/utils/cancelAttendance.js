export async function cancelAttendance(id, body) {
  const res = await fetch(
    `https://ek5vkt4dxb.execute-api.eu-central-1.amazonaws.com/dev/my-events/${id}`,
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
