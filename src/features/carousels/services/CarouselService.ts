import { supabase } from "../../../services/supabase/client";
import type { CarouselSlide } from "../types/carousel";

export async function getSlides(section: string): Promise<CarouselSlide[]> {
  const { data, error } = await supabase
    .from("carousel_slides")
    .select("*")
    .eq("section", section)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAllSlides(): Promise<CarouselSlide[]> {
  const { data, error } = await supabase
    .from("carousel_slides")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createSlide(
  section: string,
  image_url: string,
  title?: string,
  description?: string,
  link?: string,
) {
  const { error } = await supabase
    .from("carousel_slides")
    .insert({ section, image_url, title, description, link });
  if (error) throw error;
}

export async function updateSlide(
  id: string,
  updates: Partial<Pick<CarouselSlide, "image_url" | "title" | "description" | "link" | "sort_order" | "is_active">>,
) {
  const { error } = await supabase
    .from("carousel_slides")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSlide(id: string) {
  const { error } = await supabase
    .from("carousel_slides")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function reorderSlides(
  section: string,
  orderedIds: string[],
) {
  const updates = orderedIds.map((id, index) => ({
    id,
    section,
    sort_order: index,
  }));
  const { error } = await supabase
    .from("carousel_slides")
    .upsert(updates);
  if (error) throw error;
}
