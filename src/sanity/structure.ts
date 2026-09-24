import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .id("socialMedia")
        .title("Sosyal medya")
        .child(
          S.document()
            .schemaType("socialMedia")
            .documentId("socialMedia")
            .title("Sosyal medya"),
        ),
      S.divider(),
      S.documentTypeListItem("certificate").title("Sertifikalar"),
      S.divider(),
      S.documentTypeListItem("product").title("Ürünler"),
      S.documentTypeListItem("category").title("Kategoriler"),
    ]);
