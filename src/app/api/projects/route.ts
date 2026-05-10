import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getProjects, getPublishedProjects, createProject } from "@/lib/db";

// GET /api/projects — list projects
// ?published=true → only published (for public page)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const projects = publishedOnly ? await getPublishedProjects() : await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/projects — create project (admin only)
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const project = await createProject({
      title: body.title || "",
      title_en: body.title_en || "",
      category: body.category || "Automatisation",
      description: body.description || body.desc || "",
      description_en: body.description_en || "",
      long_description: body.long_description || body.longDesc || "",
      long_description_en: body.long_description_en || "",
      result: body.result || "",
      result_en: body.result_en || "",
      tools: body.tools || "",
      status: body.status || "draft",
      image_url: body.image_url || body.img || "",
      video_url: body.video_url || "",
      images: Array.isArray(body.images) ? body.images.filter((u: unknown) => typeof u === "string") : [],
      sort_order: body.sort_order || body.order || 0,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Erreur creation projet" }, { status: 500 });
  }
}
