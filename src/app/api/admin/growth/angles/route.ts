import { NextResponse } from 'next/server';
import {
  getAllAngles,
  addCreativeAngle,
  validateAngle,
  publishAngle,
} from '@/lib/growth-telemetry';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get('app') || undefined;
  const angles = getAllAngles(app);
  return NextResponse.json({ angles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create') {
      const { app, title, cohort, format, hook3s, bodyScript, headline, cta, visualSpecs } = body;
      if (!title || !hook3s || !bodyScript) {
        return NextResponse.json(
          { error: 'Title, 3-second hook, and body script are required.' },
          { status: 400 }
        );
      }
      const created = addCreativeAngle({
        app: app || 'bank-of-gaga',
        title,
        cohort: cohort || 'General Audience',
        format: format || 'Meta Ad / Reel',
        hook3s,
        bodyScript,
        headline: headline || '',
        cta: cta || 'Learn More',
        visualSpecs: visualSpecs || '',
      });
      return NextResponse.json({ success: true, angle: created });
    }

    if (action === 'validate') {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: 'Angle ID is required' }, { status: 400 });
      }
      const result = validateAngle(id);
      if (!result) {
        return NextResponse.json({ error: 'Angle not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, ...result });
    }

    if (action === 'publish') {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: 'Angle ID is required' }, { status: 400 });
      }
      const published = publishAngle(id);
      if (!published) {
        return NextResponse.json({ error: 'Angle not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, angle: published });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (err) {
    console.error('[angles-api] Error processing angle action:', err);
    return NextResponse.json({ error: 'Failed to process angle action' }, { status: 500 });
  }
}
