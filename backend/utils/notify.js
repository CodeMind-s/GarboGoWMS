// Function to send a message using the notify.lk API
async function sendMessage(to, message) {
  const apiUrl = "https://app.notify.lk/api/v1/send";
  const userId = "27132"; // Replace with your user ID
  const apiKey = "JWVZfc6LN8YWvfCIDyyR"; // Replace with your API key
  const senderId = "NotifyDEMO"; // Replace with your sender ID

  const data = {
    user_id: userId,
    api_key: apiKey,
    sender_id: senderId,
    to: to,
    message: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); // Assuming the API responds with JSON
    console.log("Success:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

export { sendMessage };
