import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // Vercel serverless function max duration

export async function POST(req: NextRequest) {
  let browser;
  
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid URL' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = `https://${validUrl}`;
    }

    try {
      new URL(validUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Launch browser with Chromium for Vercel
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Set desktop viewport
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Navigate to the page and wait for it to be fully loaded
    await page.goto(validUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for body to be present (ensures DOM is loaded)
    await page.waitForSelector('body');

    // Additional wait to ensure all content is rendered
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );

    const screenshotBuffer = await page.screenshot({ 
      type: 'png',
      fullPage: false,
    });
    
    await browser.close();
    browser = undefined;

    return new NextResponse(screenshotBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error taking screenshot:', error);
    
    // Ensure browser is closed on error
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    
    return NextResponse.json(
      {
        error: 'Failed to take screenshot',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

