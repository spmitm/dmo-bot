function graphApiUrl() {
  const version = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  return `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
}

export async function sendWhatsAppText(to, body) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.log("WhatsApp credentials are missing. Outbound message skipped.");
    console.log({ to, body });
    return { skipped: true };
  }

  const response = await fetch(graphApiUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        preview_url: false,
        body
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${response.status} ${JSON.stringify(data)}`);
  }

  return data;
}
