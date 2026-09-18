import { NextResponse } from 'next/server';
import {
  getAllCommunityThreads,
  updateThreadStatus,
} from '@/lib/community-listener';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get('app') || undefined;
  const threads = getAllCommunityThreads(app);
  return NextResponse.json({ threads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, status } = body;

    if (action === 'update_status') {
      if (!id || !status) {
        return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
      }
      const updated = updateThreadStatus(id, status);
      if (!updated) {
        return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, thread: updated });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[community-api] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
