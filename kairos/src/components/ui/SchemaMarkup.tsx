interface SchemaMarkupProps {
  schema: Record<string, unknown>;
  id?: string;
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
