import { supabase } from "./client";

const BUCKET = "images-products";

export async function uploadProductImage(
  file: File,
  productCode: string,
): Promise<string> {
  const ext = file.name.split(".").pop() || "webp";
  const fileName = `${productCode}_${Date.now()}.${ext}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 60 * 60 * 24 * 365);

  if (signedUrlError) throw signedUrlError;

  return signedUrlData.signedUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  const pathMatch = imageUrl.match(/images-products\/(.+?)(\?|$)/);
  if (!pathMatch) return;

  const filePath = decodeURIComponent(pathMatch[1]);
  await supabase.storage.from(BUCKET).remove([filePath]);
}