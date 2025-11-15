import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
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

      const screenshotBuffer = await page.screenshot({ type: 'png' });
      await browser.close();

      return new NextResponse(screenshotBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return NextResponse.json(
      {
        error: 'Failed to take screenshot',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

