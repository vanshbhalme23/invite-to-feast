import { createFileRoute } from "@tanstack/react-router";

// Organizer gate code for the Excel export. Change it here if it needs to rotate.
const ORGANIZER_CODE = "FRESHAURA2K26";

export const Route = createFileRoute("/api/public/invite-entries")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const code = new URL(request.url).searchParams.get("code");
        if (!code || code !== ORGANIZER_CODE) {
          return Response.json({ error: "Invalid organizer code" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("invite_responses")
          .select("name, roll_no, food_choice, created_at")
          .order("created_at", { ascending: true });
        if (error) {
          console.error("Failed to load invite entries", error);
          return Response.json({ error: "Failed to load entries" }, { status: 500 });
        }

        const XLSX = await import("xlsx");
        const rows: (string | number)[][] = [
          ["#", "Name", "Roll No", "Food", "Submitted (IST)"],
          ...(data ?? []).map((row, index) => [
            index + 1,
            row.name,
            row.roll_no,
            row.food_choice === "veg" ? "Veg" : "Non-Veg",
            new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          ]),
        ];
        const sheet = XLSX.utils.aoa_to_sheet(rows);
        sheet["!cols"] = [{ wch: 5 }, { wch: 28 }, { wch: 16 }, { wch: 10 }, { wch: 24 }];
        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, sheet, "Entries");
        const buffer = XLSX.write(book, { type: "array", bookType: "xlsx" }) as ArrayBuffer;

        return new Response(buffer, {
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="fresh-aura-2k26-entries.xlsx"',
          },
        });
      },
    },
  },
});
