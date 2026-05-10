import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import {
  getProjectById,
  updateProject,
  deleteProjectById,
  toggleProjectStatus,
  duplicateProjectById,
} from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/projects/[id]
export async function GET(_request: Request, context: Ctx) {
  try {
    const { id } = await context.params;
    const project = await getProjectById(parseInt(id));
    if (!project) return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(request: Request, context: Ctx) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    // Handle special actions
    if (body.action === "toggle") {
      const project = await toggleProjectStatus(parseInt(id));
      return NextResponse.json(project);
    }
    if (body.action === "duplicate") {
      const project = await duplicateProjectById(parseInt(id));
      return NextResponse.json(project, { status: 201 });
    }

    const project = await updateProject(parseInt(id), {
      title: body.title,
      title_en: body.title_en,
      category: body.category,
      description: body.description ?? body.desc,
      description_en: body.description_en,
      long_description: body.long_description ?? body.longDesc,
      long_description_en: body.long_description_en,
      result: body.result,
      result_en: body.result_en,
      tools: body.tools,
      status: body.status,
      image_url: body.image_url ?? body.img,
      video_url: body.video_url,
      images: Array.isArray(body.images) ? body.images.filter((u: unknown) => typeof u === "string") : undefined,
      sort_order: body.sort_order ?? body.order,
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ error: "Erreur mise a jour" }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(_request: Request, context: Ctx) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteProjectById(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
