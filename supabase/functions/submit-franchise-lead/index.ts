
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FranchiseLeadRequest {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  investmentRange: string;
  sourceCta: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: FranchiseLeadRequest = await req.json();

    // Send confirmation email to lead
    const leadEmailResponse = await resend.emails.send({
      from: "CleanCraft Franchise <franchise@cleancraftapp.com>",
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
              We're excited about the possibility of partnering with you in ${leadData.city}.
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
                <strong>62% ROI = ₹12,000+ monthly profit potential</strong>
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
              📞 +91-XXXX-XXXX-XX | 📧 franchise@cleancraftapp.com
            </p>
          </div>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "CleanCraft Franchise <franchise@cleancraftapp.com>",
      to: ["hello@cleancraftapp.com"],
      subject: `New Franchise Lead: ${leadData.name} from ${leadData.city}`,
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
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">City:</td>
                <td style="padding: 8px 0; color: #6b7280;">${leadData.city}, ${leadData.country}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Investment Range:</td>
                <td style="padding: 8px 0; color: #6b7280;">${leadData.investmentRange}</td>
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

    console.log("Emails sent:", { leadEmailResponse, adminEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadEmail: leadEmailResponse,
        adminEmail: adminEmailResponse 
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
    console.error("Error in submit-franchise-lead function:", error);
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
