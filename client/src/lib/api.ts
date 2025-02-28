import axios from "axios";

// Initialize Shipper API client
export const shipperApi = axios.create({
  baseURL: process.env.SHIPPER_API_URL || "https://api.shipper.tn",
  headers: {
    Authorization: `Bearer ${process.env.SHIPPER_API_KEY}`
  }
});

// Initialize TunisieSMS API client
export const smsApi = axios.create({
  baseURL: process.env.TUNISIE_SMS_API_URL || "https://api.tunisiesms.tn",
  headers: {
    Authorization: `Bearer ${process.env.TUNISIE_SMS_API_KEY}`
  }
});

// Initialize Sellmax API client
export const sellmaxApi = axios.create({
  baseURL: process.env.SELLMAX_API_URL || "https://api.sellmax.tn",
  headers: {
    Authorization: `Bearer ${process.env.SELLMAX_API_KEY}`
  }
});

export const sendSmsNotification = async (phoneNumber: string, message: string) => {
  try {
    await smsApi.post("/send", {
      to: phoneNumber,
      message
    });
  } catch (error) {
    console.error("Failed to send SMS:", error);
  }
};

export const cloneShipperProduct = async (shipperId: string) => {
  try {
    const { data } = await shipperApi.get(`/products/${shipperId}`);
    return {
      shipperId: data.id,
      title: data.title,
      description: data.description,
      price: data.wholesale_price * 1.3, // 30% markup
      wholesalePrice: data.wholesale_price,
      images: data.images,
      metadata: data
    };
  } catch (error) {
    console.error("Failed to clone product:", error);
    throw error;
  }
};
