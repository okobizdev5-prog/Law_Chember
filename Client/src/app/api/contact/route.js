import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Save to MongoDB via Express Backend
    const saveResponse = await fetch("http://localhost:5000/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, subject, message }),
    });

    if (!saveResponse.ok) {
      throw new Error("Failed to save legal inquiry to database");
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"Juris Point Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,

      subject: `📩 New Contact Request - ${subject}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
          
          <div style="background:#111827; color:#fff; padding:20px; text-align:center;">
            <h2 style="margin:0;">Juris Point</h2>
            <p style="margin:8px 0 0;">New Contact Form Submission</p>
          </div>

          <div style="padding:25px;">
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px; font-weight:bold;">Name</td>
                <td style="padding:10px;">${name}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px; font-weight:bold;">Email</td>
                <td style="padding:10px;">${email}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Phone</td>
                <td style="padding:10px;">${phone}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px; font-weight:bold;">Subject</td>
                <td style="padding:10px;">${subject}</td>
              </tr>

              <tr>
                <td style="padding:10px; font-weight:bold;">Message</td>
                <td style="padding:10px;">
                  ${message.replace(/\n/g, "<br/>")}
                </td>
              </tr>
            </table>
          </div>

          <div
            style="
              background:#111827;
              color:#fff;
              text-align:center;
              padding:15px;
              font-size:13px;
            "
          >
            This email was sent from the Juris Point Contact Form.
          </div>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}