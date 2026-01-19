module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookTitle } = req.body;

    if (!bookTitle || typeof bookTitle !== 'string') {
      return res.status(400).json({ error: 'Book title is required' });
    }

    // Check environment variables
    const envCheck = {
      hasSanityToken: !!process.env.SANITY_WRITE_TOKEN,
      hasResendKey: !!process.env.RESEND_API_KEY,
    };

    if (!envCheck.hasSanityToken) {
      return res.status(500).json({ error: 'Missing SANITY_WRITE_TOKEN', envCheck });
    }

    // Dynamic require to catch import errors
    let createClient, Resend;
    try {
      createClient = require('@sanity/client').createClient;
      Resend = require('resend').Resend;
    } catch (importError) {
      return res.status(500).json({ error: 'Failed to import dependencies', details: String(importError) });
    }

    // Create Sanity client with token
    const sanityClient = createClient({
      projectId: 'am3v0x1c',
      dataset: 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    // Store in Sanity
    let sanityDoc;
    try {
      sanityDoc = await sanityClient.create({
        _type: 'bookSuggestion',
        bookTitle: bookTitle.trim(),
        submittedAt: new Date().toISOString(),
        status: 'new',
      });
    } catch (sanityError) {
      return res.status(500).json({ error: 'Failed to save to database', details: String(sanityError) });
    }

    // Send email notification
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Library <onboarding@resend.dev>',
      to: 'michelletheresaliu@gmail.com',
      subject: `New Book Suggestion: ${bookTitle}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 16px;">New Book Suggestion!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Someone suggested a new book for your library:
          </p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #333; font-size: 18px; font-weight: 500; margin: 0;">
              "${bookTitle}"
            </p>
          </div>
          <p style="color: #999; font-size: 14px; margin-top: 24px;">
            Submitted via liumichelle.com/library
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
    }

    return res.status(200).json({ 
      success: true, 
      emailId: data?.id,
      sanityId: sanityDoc._id,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: String(error), stack: error.stack });
  }
};
