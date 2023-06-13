export async function cancelAttendance(id, body) {
  const res = await fetch(
    `https://bujmdxjfm0.execute-api.eu-central-1.amazonaws.com/dev/my-events/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
}
