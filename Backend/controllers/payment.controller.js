import Order from "../model/order.model.js";
import paystack from "../Lib/Paystack.js";

export const checkoutMomo = async (req, res) => {
  // Calculate amount with E-levy
  const calculateTotalAmount = (amount) => {
    const eLevy = amount * 0.01;
    return Math.round((amount + eLevy) * 100); // Convert to pesewas
  };

  // Initiate mobile money payment
  try {
    const { phone, provider } = req.body;
    const baseAmount = 64.5; // GHS 64.50 from UI

    // Validate provider
    const validProviders = ["MTN", "VODAFONE", "AIRTELTIGO"];
    if (!validProviders.includes(provider.toUpperCase())) {
      return res.status(400).json({ error: "Invalid mobile money provider" });
    }

    const paymentData = {
      amount: calculateTotalAmount(baseAmount),
      currency: "GHS",
      mobile_money: {
        phone,
        provider: provider.toUpperCase(), // mtn, vod (vodafone), tgo (airteltigo)
      },
      email: "customer@email.com", // Collect this in production
    };

    const response = await paystack.post("/charge", paymentData);

    res.json({
      message: "Payment initiated",
      data: response.data.data,
      authorizationUrl: response.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Payment initiation failed",
      details: error.response?.data || error.message,
    });
  }
};

export const cardPay = async (req, res) => {
  try {
    const { cardNumber, expiryMonth, expiryYear, cvv, email, saveCard } =
      req.body;

    // Validate required fields
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !email) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const baseAmount = 64.5; // GHS 64.50 from screenshot

    const calculateTotalAmount = (amount) => {
      const eLevy = amount * 0.01;
      return Math.round((amount + eLevy) * 100); // Convert to pesewas
    };

    const paymentData = {
      amount: calculateTotalAmount(baseAmount),
      email: email,
      currency: "GHS",
      card: {
        number: cardNumber.replace(/\s/g, ""), // Remove spaces from card number
        cvv: cvv,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
      },
      metadata: {
        save_card: saveCard === "true",
      },
    };

    const response = await paystack.post("/charge", paymentData);

    if (response.data.data.status === "send_pin") {
      return res.json({
        requiresPIN: true,
        reference: response.data.data.reference,
      });
    }

    if (response.data.data.status === "send_otp") {
      return res.json({
        requiresOTP: true,
        reference: response.data.data.reference,
      });
    }
  } catch (error) {
    console.error("Card payment error:", error.response?.data || error.message);

    // Handle specific Paystack error
    if (error.response?.data) {
      const { message, data, meta } = error.response.data;

      return res.status(400).json({
        error: "Card payment failed",
        details: {
          message,
          reference: data?.reference,
          nextStep: meta?.nextStep || "Please try again or contact support.",
        },
      });
    }

    // Handle generic error
    res.status(500).json({
      error: "Card payment failed",
      details: error.message,
    });
  }
};

export const paystackWebhook = async (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  if (!signature) return res.sendStatus(403);

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== signature) return res.sendStatus(400);

  const event = req.body;

  if (event.event === "charge.success") {
    const { reference, amount, customer } = event.data;

    try {
      const newOrder = new Order({
        user: customer.email, // Should link to your user system
        products: [], // Populate from your session/cart system
        totalAmount: amount / 100,
        paystackReference: reference,
        status: "completed",
      });

      await newOrder.save();
    } catch (error) {
      console.error("Order creation error:", error);
    }
  }

  res.sendStatus(200);
};

export const completeAuth = async (req, res) => {
  try {
    const { reference, pin, otp } = req.body;

    const authData = {};
    if (pin) authData.pin = pin;
    if (otp) authData.otp = otp;

    const response = await paystack.post(
      `/charge/submit_${pin ? "pin" : "otp"}`,
      {
        reference,
        ...authData,
      }
    );

    res.json({
      status: response.data.data.status,
      message: "Authentication completed",
    });
  } catch (error) {
    console.error("Auth completion error:", error);
    res.status(400).json({ error: "Authentication failed" });
  }
};
