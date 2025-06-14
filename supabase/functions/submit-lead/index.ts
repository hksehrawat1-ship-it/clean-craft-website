import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadRequest {
  name: string;
  email: string;
  phone: string;
  city?: string; // Optional
  country: string;
  investmentRange?: string; // Optional for course leads
  sourceCta: string;
  leadType: 'franchise' | 'course';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadRequest = await req.json();
    const { leadType } = leadData;

    console.log(`Processing ${leadType} lead:`, leadData);

    // Send emails based on lead type
    let leadEmailResponse;
    let adminEmailResponse;

    if (leadType === 'franchise') {
      // Franchise lead emails
      leadEmailResponse = await resend.emails.send({
        from: "CleanCraft Franchise <hello@cleancraftapp.com>",
        to: [leadData.email],
        subject: "Welcome to CleanCraft Franchise Family!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin-bottom: 10px;">Welcome to CleanCraft!</h1>
              <p style="color: #666; font-size: 16px;">India's Most Trusted Laundry Franchise</p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e40af; margin-bottom: 15px;">Hi ${leadData.name},</h2>
              <p style="color: #374151; line-height: 1.6;">
                Thank you for your interest in CleanCraft franchise opportunity! 
                We're excited about the possibility of partnering with you.
              </p>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin-bottom: 15px;">What Happens Next?</h3>
              
              <div style="margin-bottom: 15px; padding: 15px; border-left: 4px solid #10b981; background: #f0fdf4;">
                <h4 style="color: #059669; margin: 0 0 5px 0;">✅ Step 1: Information Submitted</h4>
                <p style="color: #065f46; margin: 0; font-size: 14px;">Your details are now in our system</p>
              </div>
              
              <div style="margin-bottom: 15px; padding: 15px; border-left: 4px solid #3b82f6; background: #eff6ff;">
                <h4 style="color: #2563eb; margin: 0 0 5px 0;">📞 Step 2: Discovery Call (Next 24 Hours)</h4>
                <p style="color: #1e40af; margin: 0; font-size: 14px;">Our franchise consultant will contact you to discuss the opportunity in detail</p>
              </div>
              
              <div style="padding: 15px; border-left: 4px solid #8b5cf6; background: #faf5ff;">
                <h4 style="color: #7c3aed; margin: 0 0 5px 0;">🚀 Step 3: Franchise Up & Running</h4>
                <p style="color: #6b21a8; margin: 0; font-size: 14px;">
                  <strong>62% ROI ~= ₹100,000+ monthly profit potential</strong>
                </p>
              </div>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #d97706; margin-bottom: 10px;">🛡️ Zero Risk Promise</h3>
              <p style="color: #92400e; margin: 0;">
                Break even in 7 months or receive 100% royalty-free operations for the lifetime of your franchise.
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                <strong>The CleanCraft Franchise Team</strong><br>
                📞 +91-88-00-77-1349 | 📧 hello@cleancraftapp.com
              </p>
            </div>
          </div>
        `,
      });

      adminEmailResponse = await resend.emails.send({
        from: "CleanCraft Franchise <hello@cleancraftapp.com>",
        to: ["hello@cleancraftapp.com"],
        subject: `New Franchise Lead: ${leadData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e40af; margin-bottom: 20px;">New Franchise Lead</h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-bottom: 15px;">Lead Details:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Country:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Source CTA:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.sourceCta}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
              <p style="color: #d97706; margin: 0; font-weight: bold;">
                📞 Action Required: Contact within 24 hours for best conversion rates
              </p>
            </div>
          </div>
        `,
      });
    } else if (leadType === 'course') {
      // Course lead emails
      leadEmailResponse = await resend.emails.send({
        from: "CleanCraft Training <hello@cleancraftapp.com>",
        to: [leadData.email],
        subject: "Welcome to CleanCraft Professional Training!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin-bottom: 10px;">Welcome to CleanCraft Training!</h1>
              <p style="color: #666; font-size: 16px;">India's Premier Laundry & Dry Cleaning Training Institute</p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e40af; margin-bottom: 15px;">Hi ${leadData.name},</h2>
              <p style="color: #374151; line-height: 1.6;">
                Thank you for your interest in our professional laundry and dry cleaning training course! 
                We're excited to help you master the art of professional garment care.
              </p>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin-bottom: 15px;">Next Steps:</h3>
              
              <div style="margin-bottom: 15px; padding: 15px; border-left: 4px solid #10b981; background: #f0fdf4;">
                <h4 style="color: #059669; margin: 0 0 5px 0;">✅ Step 1: Registration Submitted</h4>
                <p style="color: #065f46; margin: 0; font-size: 14px;">Your training registration is confirmed</p>
              </div>
              
              <div style="margin-bottom: 15px; padding: 15px; border-left: 4px solid #3b82f6; background: #eff6ff;">
                <h4 style="color: #2563eb; margin: 0 0 5px 0;">💳 Step 2: Complete Payment</h4>
                <p style="color: #1e40af; margin: 0; font-size: 14px;">Secure your spot with our easy payment process</p>
              </div>
              
              <div style="padding: 15px; border-left: 4px solid #8b5cf6; background: #faf5ff;">
                <h4 style="color: #7c3aed; margin: 0 0 5px 0;">🎓 Step 3: Start Your Training Journey</h4>
                <p style="color: #6b21a8; margin: 0; font-size: 14px;">
                  Begin your path to becoming a certified laundry professional
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-bottom: 20px;">
              <a href="https://cleancraft.mojo.page/best-laundry-training-institute-in-india" 
                 style="display: inline-block; background: #10b981; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Complete Payment & Start Training
              </a>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #d97706; margin-bottom: 10px;">🏆 What You'll Learn</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Professional dry cleaning techniques</li>
                <li>Stain removal expertise</li>
                <li>Equipment operation and maintenance</li>
                <li>Business operations and customer service</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                <strong>The CleanCraft Training Team</strong><br>
                📞 +91-88-00-77-1349 | 📧 hello@cleancraftapp.com
              </p>
            </div>
          </div>
        `,
      });

      adminEmailResponse = await resend.emails.send({
        from: "CleanCraft Training <hello@cleancraftapp.com>",
        to: ["hello@cleancraftapp.com"],
        subject: `New Course Registration: ${leadData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1e40af; margin-bottom: 20px;">New Course Registration</h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-bottom: 15px;">Student Details:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Country:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Source:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${leadData.sourceCta}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
              <p style="color: #d97706; margin: 0; font-weight: bold;">
                📞 Follow up required: Student awaiting payment confirmation
              </p>
            </div>
          </div>
        `,
      });
    }

    console.log("Emails sent:", { leadEmailResponse, adminEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadEmail: leadEmailResponse,
        adminEmail: adminEmailResponse,
        leadType
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
