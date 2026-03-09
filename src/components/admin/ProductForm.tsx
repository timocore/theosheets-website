"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileUploadField } from "./FileUploadField";

interface SerializedVariant {
  id: string;
  productId: string;
  key: string;
  name: string;
  price: number;
  sortOrder: number;
}

interface SerializedProduct {
  id: string;
  sku: string;
  slug: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  aboutThePiece?: string;
  whatBuyersShouldKnow?: string;
  composer?: string;
  instrument?: string;
  difficulty?: string;
  mood?: string;
  category?: string;
  collection?: string;
  tags?: string[];
  durationSeconds?: number | null;
  pageCount?: number | null;
  format?: string;
  productImage?: string;
  previewPdfAsset?: string;
  previewAudioUrl?: string;
  fullPdfFile?: string;
  accompanimentFile?: string;
  multitrackFile?: string;
  standaloneMp3File?: string;
  price: number;
  compareAtPrice: number | null;
  status?: string;
  featured?: boolean;
  sortOrder?: number;
  enablePreviewAudio?: boolean;
  enableStandaloneMp3?: boolean;
  enableAccompaniment?: boolean;
  enableMultitrack?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  adminNotes?: string;
  internalName?: string;
  variants: SerializedVariant[];
}

interface ProductFormProps {
  product?: SerializedProduct;
}

interface FormState {
  sku: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  aboutThePiece: string;
  whatBuyersShouldKnow: string;
  composer: string;
  instrument: string;
  difficulty: string;
  mood: string;
  category: string;
  collection: string;
  tags: string;
  durationSeconds: string | number;
  pageCount: string | number;
  format: string;
  productImage: string;
  previewPdfAsset: string;
  previewAudioUrl: string;
  fullPdfFile: string;
  accompanimentFile: string;
  multitrackFile: string;
  standaloneMp3File: string;
  price: string | number;
  compareAtPrice: string | number;
  status: string;
  featured: boolean;
  sortOrder: number;
  enablePreviewAudio: boolean;
  enableStandaloneMp3: boolean;
  enableAccompaniment: boolean;
  enableMultitrack: boolean;
  availableVariants: string[];
  seoTitle: string;
  seoDescription: string;
  adminNotes: string;
  internalName: string;
  variants: { key: string; name: string; price: number }[];
}

const VARIANT_OPTIONS = [
  { key: "pdf", name: "PDF Score" },
  { key: "accompaniment", name: "Accompaniment Track Pack" },
  { key: "multitrack", name: "Multitrack Pack" },
  { key: "bundle", name: "Complete Bundle" },
  { key: "mp3", name: "Standalone MP3" },
];

const INSTRUMENT_OPTIONS = [
  "Piano",
  "Organ",
  "Guitar",
  "Vocals",
  "Choir",
  "Strings",
  "Brass",
  "Woodwinds",
  "Percussion",
  "Mixed",
];

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Intermediate", "Advanced"];

const MOOD_OPTIONS = [
  "Contemplative",
  "Joyful",
  "Uplifting",
  "Reflective",
  "Worshipful",
  "Peaceful",
  "Celebratory",
  "Solemn",
];

const CATEGORY_OPTIONS = [
  "Worship",
  "Hymn",
  "Contemporary",
  "Classical",
  "Seasonal",
  "Original",
  "Arrangement",
];

const COLLECTION_OPTIONS = ["Seasonal", "Worship Series", "Hymns", "Originals"];

const FORMAT_OPTIONS = ["PDF", "Digital", "Print"];

function ClassificationSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "— Select —",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
  placeholder?: string;
}) {
  const hasCustomValue = value && !options.includes(value);
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-border-warm rounded text-sm"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
        {hasCustomValue && (
          <option value={value}>{value}</option>
        )}
      </select>
    </div>
  );
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    sku: product?.sku ?? "",
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    shortDescription: product?.shortDescription ?? "",
    longDescription: product?.longDescription ?? "",
    aboutThePiece: product?.aboutThePiece ?? "",
    whatBuyersShouldKnow: product?.whatBuyersShouldKnow ?? "",
    composer: product?.composer ?? "",
    instrument: product?.instrument ?? "",
    difficulty: product?.difficulty ?? "",
    mood: product?.mood ?? "",
    category: product?.category ?? "",
    collection: product?.collection ?? "",
    tags: (product?.tags ?? []).join(", "),
    durationSeconds: product?.durationSeconds ?? "",
    pageCount: product?.pageCount ?? "",
    format: product?.format ?? "",
    productImage: product?.productImage ?? "",
    previewPdfAsset: product?.previewPdfAsset ?? "",
    previewAudioUrl: product?.previewAudioUrl ?? "",
    fullPdfFile: product?.fullPdfFile ?? "",
    accompanimentFile: product?.accompanimentFile ?? "",
    multitrackFile: product?.multitrackFile ?? "",
    standaloneMp3File: product?.standaloneMp3File ?? "",
    price: product ? Number(product.price) : "",
    compareAtPrice: product?.compareAtPrice ? Number(product.compareAtPrice) : "",
    status: product?.status ?? "DRAFT",
    featured: product?.featured ?? false,
    sortOrder: product?.sortOrder ?? 0,
    enablePreviewAudio: product?.enablePreviewAudio ?? false,
    enableStandaloneMp3: product?.enableStandaloneMp3 ?? false,
    enableAccompaniment: product?.enableAccompaniment ?? false,
    enableMultitrack: product?.enableMultitrack ?? false,
    availableVariants:
      product?.variants?.map((v) => v.key) ?? ["pdf"],
    seoTitle: product?.seoTitle ?? "",
    seoDescription: product?.seoDescription ?? "",
    adminNotes: product?.adminNotes ?? "",
    internalName: product?.internalName ?? "",
    variants:
      product?.variants?.map((v) => ({
        key: v.key,
        name: v.name,
        price: Number(v.price),
      })) ?? [{ key: "pdf", name: "PDF Score", price: product ? Number(product.price) : 0 }],
  });

  function update(f: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...f }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        durationSeconds: form.durationSeconds ? parseInt(String(form.durationSeconds), 10) : null,
        pageCount: form.pageCount ? parseInt(String(form.pageCount), 10) : null,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        availableVariants: form.variants.map((v) => v.key),
        variants: form.variants.map((v) => ({
          key: v.key,
          name: v.name,
          price: Number(v.price),
        })),
      };

      if (isEdit) {
        const res = await fetch(`/api/admin/products/${product.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Failed to save");
        }
        router.refresh();
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to create");
        router.push(`/admin/products/${data.id}/edit`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Basic info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">SKU *</label>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => update({ sku: e.target.value })}
              required
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update({ slug: e.target.value })}
              required
              placeholder="product-slug"
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
            required
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Short description</label>
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) => update({ shortDescription: e.target.value })}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Long description</label>
          <textarea
            value={form.longDescription}
            onChange={(e) => update({ longDescription: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">About the piece</label>
          <textarea
            value={form.aboutThePiece}
            onChange={(e) => update({ aboutThePiece: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">What buyers should know</label>
          <textarea
            value={form.whatBuyersShouldKnow}
            onChange={(e) => update({ whatBuyersShouldKnow: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Classification</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Composer</label>
            <input
              type="text"
              value={form.composer}
              onChange={(e) => update({ composer: e.target.value })}
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <ClassificationSelect
            label="Instrument"
            value={form.instrument}
            onChange={(v) => update({ instrument: v })}
            options={INSTRUMENT_OPTIONS}
          />
          <ClassificationSelect
            label="Difficulty"
            value={form.difficulty}
            onChange={(v) => update({ difficulty: v })}
            options={DIFFICULTY_OPTIONS}
          />
          <ClassificationSelect
            label="Mood"
            value={form.mood}
            onChange={(v) => update({ mood: v })}
            options={MOOD_OPTIONS}
          />
          <ClassificationSelect
            label="Category"
            value={form.category}
            onChange={(v) => update({ category: v })}
            options={CATEGORY_OPTIONS}
          />
          <ClassificationSelect
            label="Collection"
            value={form.collection}
            onChange={(v) => update({ collection: v })}
            options={COLLECTION_OPTIONS}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update({ tags: e.target.value })}
            placeholder="piano, worship, contemplative"
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Duration (seconds)</label>
            <input
              type="number"
              value={form.durationSeconds}
              onChange={(e) => update({ durationSeconds: e.target.value })}
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Page count</label>
            <input
              type="number"
              value={form.pageCount}
              onChange={(e) => update({ pageCount: e.target.value })}
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <ClassificationSelect
            label="Format"
            value={form.format}
            onChange={(v) => update({ format: v })}
            options={FORMAT_OPTIONS}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Media</h2>
        <FileUploadField
          label="Product image"
          value={form.productImage}
          onChange={(v) => update({ productImage: v })}
          prefix="preview"
          accept="image/*"
        />
        <FileUploadField
          label="Preview PDF"
          value={form.previewPdfAsset}
          onChange={(v) => update({ previewPdfAsset: v })}
          prefix="preview"
          accept="application/pdf"
        />
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Preview audio URL</label>
          <input
            type="url"
            value={form.previewAudioUrl}
            onChange={(e) => update({ previewAudioUrl: e.target.value })}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <FileUploadField
          label="Full PDF (private)"
          value={form.fullPdfFile}
          onChange={(v) => update({ fullPdfFile: v })}
          prefix="private"
          accept="application/pdf"
        />
        <FileUploadField
          label="Accompaniment file (private)"
          value={form.accompanimentFile}
          onChange={(v) => update({ accompanimentFile: v })}
          prefix="private"
        />
        <FileUploadField
          label="Multitrack file (private)"
          value={form.multitrackFile}
          onChange={(v) => update({ multitrackFile: v })}
          prefix="private"
        />
        <FileUploadField
          label="Standalone MP3 (private)"
          value={form.standaloneMp3File}
          onChange={(v) => update({ standaloneMp3File: v })}
          prefix="private"
          accept="audio/*"
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Commerce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => update({ price: e.target.value })}
              required
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Compare at price</label>
            <input
              type="number"
              step="0.01"
              value={form.compareAtPrice}
              onChange={(e) => update({ compareAtPrice: e.target.value })}
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Sort order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => update({ sortOrder: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3 py-2 border border-border-warm rounded text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.status === "PUBLISHED"}
              onChange={(e) => update({ status: e.target.checked ? "PUBLISHED" : "DRAFT" })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update({ featured: e.target.checked })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.enablePreviewAudio}
              onChange={(e) => update({ enablePreviewAudio: e.target.checked })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Preview audio</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.enableStandaloneMp3}
              onChange={(e) => update({ enableStandaloneMp3: e.target.checked })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Standalone MP3</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.enableAccompaniment}
              onChange={(e) => update({ enableAccompaniment: e.target.checked })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Accompaniment</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.enableMultitrack}
              onChange={(e) => update({ enableMultitrack: e.target.checked })}
              className="rounded border-border-warm text-honey"
            />
            <span className="text-sm text-charcoal">Multitrack</span>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Variants</h2>
        {form.variants.map((v, i) => (
          <div key={i} className="flex gap-4 items-end p-4 border border-border-warm rounded">
            <div className="flex-1">
              <label className="block text-xs text-charcoal-light mb-1">Variant</label>
              <select
                value={v.key}
                onChange={(e) => {
                  const opt = VARIANT_OPTIONS.find((o) => o.key === e.target.value);
                  const next = [...form.variants];
                  next[i] = { ...next[i], key: e.target.value, name: opt?.name ?? e.target.value };
                  update({ variants: next });
                }}
                className="w-full px-3 py-2 border border-border-warm rounded text-sm"
              >
                {VARIANT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-charcoal-light mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={v.price}
                onChange={(e) => {
                  const next = [...form.variants];
                  next[i] = { ...next[i], price: parseFloat(e.target.value) || 0 };
                  update({ variants: next });
                }}
                className="w-full px-3 py-2 border border-border-warm rounded text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => update({ variants: form.variants.filter((_, j) => j !== i) })}
              className="text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update({
              variants: [...form.variants, { key: "pdf", name: "PDF Score", price: Number(form.price) || 0 }],
            })
          }
          className="text-sm text-honey hover:text-honey-dark"
        >
          + Add variant
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">SEO</h2>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO title</label>
          <input
            type="text"
            value={form.seoTitle}
            onChange={(e) => update({ seoTitle: e.target.value })}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO description</label>
          <textarea
            value={form.seoDescription}
            onChange={(e) => update({ seoDescription: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-lg text-charcoal">Internal</h2>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Internal name</label>
          <input
            type="text"
            value={form.internalName}
            onChange={(e) => update({ internalName: e.target.value })}
            placeholder="Internal reference"
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Admin notes</label>
          <textarea
            value={form.adminNotes}
            onChange={(e) => update({ adminNotes: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-border-warm rounded text-sm"
          />
        </div>
      </section>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-honey hover:bg-honey-light text-charcoal-dark font-medium px-6 py-2 rounded transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save" : "Create product"}
        </button>
        {isEdit && (
          <Link
            href={`/sheet-music/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-border-warm rounded text-sm text-charcoal hover:bg-parchment-dark transition-colors"
          >
            View on site
          </Link>
        )}
      </div>
    </form>
  );
}
