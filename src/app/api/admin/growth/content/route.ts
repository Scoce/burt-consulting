import { NextResponse } from 'next/server';
import {
  getAllStagedArticles,
  validateStagedArticle,
  publishArticleToRepository,
  updateStagedArticle,
} from '@/lib/growth-content';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get('app') || undefined;
  const articles = getAllStagedArticles(app);
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required' }, { status: 400 });
    }

    if (action === 'validate') {
      const result = validateStagedArticle(slug);
      if (!result) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, ...result });
    }

    if (action === 'update') {
      const { title, description, targetKeyword, contentMarkdown } = body;
      const updated = updateStagedArticle(slug, {
        title,
        description,
        targetKeyword,
        contentMarkdown,
      });
      if (!updated) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      // Re-run validation so audit badges stay accurate
      const validated = validateStagedArticle(slug);
      return NextResponse.json({ success: true, article: validated?.article || updated });
    }

    if (action === 'publish') {
      const result = publishArticleToRepository(slug);
      if (!result) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[growth-content-api] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
