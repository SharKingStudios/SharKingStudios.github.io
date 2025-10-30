import type { APIRoute } from 'astro';

export const prerender = false;

import { contactFormSchema as ContactFormSchema } from '@/features/contact/type'; // Using alias for clarity if needed, or direct import
// import { sendEmail } from '@/lib/email'; // Example: Your email sending function would be imported here
import { ui, type LanguageCode } from '@/i18n/ui';
import type {
  ContactFormTranslations,
  ContactFormApiResponse,
} from '@/features/contact/type';

// Environment variables for a real email service would be typically accessed here.
// For example:
// const MY_EMAIL_SERVICE_API_KEY = import.meta.env.MY_EMAIL_SERVICE_API_KEY;
// const EMAIL_RECEIVER_ADDRESS = import.meta.env.EMAIL_RECEIVER_ADDRESS;
// const EMAIL_SENDER_ADDRESS = import.meta.env.EMAIL_SENDER_ADDRESS;
//
// Ensure these are defined in your .env file if you implement a real email service.
// For this template, we will simulate the email sending.

export const POST: APIRoute = async ({ request }) => {
  let lang: LanguageCode = 'en'; // Default language
  let currentTranslations: ContactFormTranslations = ui[lang]
    .contactPage as ContactFormTranslations; // Default translations
  // In a real implementation, you might check if your email service is configured:
  // if (!MY_EMAIL_SERVICE_API_KEY || !EMAIL_RECEIVER_ADDRESS || !EMAIL_SENDER_ADDRESS) {
  //   return new Response(
  //     JSON.stringify({
  //       message:
  //         'Server configuration error: Email service not properly configured.',
  //     }),
  //     { status: 500, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  let formDataForValidation;
  try {
    const requestBody = await request.json();
    const requestLang = requestBody.lang as LanguageCode | undefined;
    if (requestLang && ui[requestLang]) {
      lang = requestLang;
      currentTranslations = ui[lang].contactPage as ContactFormTranslations;
    }
    // Separate formData for Zod validation (without lang property)
    const { lang: _lang, ...restOfBody } = requestBody;
    formDataForValidation = restOfBody;
  } catch (error) {
    // Use default (English) translations if JSON parsing fails or lang is not available
    const errorResponse: ContactFormApiResponse = {
      status: 'error',
      message: currentTranslations.toastErrorUnexpected,
      error: 'Invalid JSON input',
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const validationResult = ContactFormSchema.safeParse(formDataForValidation);

  if (!validationResult.success) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: currentTranslations.toastErrorValidationFailed,
        errors: validationResult.error.flatten().fieldErrors,
      } as ContactFormApiResponse),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { firstName, lastName, email, message } = validationResult.data;

  // --- Template Placeholder: Email Sending Logic ---
  // The following section simulates email sending.
  // In a real application, you would integrate an email sending service here
  // (e.g., Resend, SendGrid, Nodemailer) using the validated data.

  console.log('Contact form submission received (simulation):');
  console.log('Language used for submission:', lang);
  console.log('Validated data:', validationResult.data);
  console.log('---');
  console.log('To implement actual email sending:');
  console.log('1. Choose an email service provider.');
  console.log('2. Install necessary SDKs (e.g., `bun add resend`).');
  console.log(
    '3. Configure API keys and sender/receiver emails in .env variables.'
  );
  console.log(
    '4. Write a function (e.g., in `src/lib/email.ts`) to send emails using the SDK.'
  );
  console.log('5. Import and call that function here, handling its response.');
  console.log('---');

  // Simulate a successful submission for the template
  return new Response(
    JSON.stringify({
      status: 'success',
      message: `${currentTranslations.toastSuccessMessageSent} (Simulated - No email was sent)`,
      // data: { simulatedId: `sim-${Date.now()}` } // Optionally, simulate some data in response
    } as ContactFormApiResponse),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
  // --- End Template Placeholder ---
};
