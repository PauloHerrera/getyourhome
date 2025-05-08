// scripts/migrate-db.ts
import { execSync } from "child_process";
import fs from "fs";

// Run migrations
async function main() {
  try {
    // Only run migrations in production environment or when forced
    if (process.env.VERCEL_ENV === "production" || process.env.FORCE_MIGRATION === "true") {
      console.log("Running Supabase migrations...");

      // Ensure we have the required environment variables
      const projectRef = process.env.SUPABASE_PROJECT_REF;
      const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

      if (!projectRef || !accessToken) {
        throw new Error(
          "Missing required environment variables: SUPABASE_PROJECT_REF or SUPABASE_ACCESS_TOKEN"
        );
      }

      // Create a temporary .supabase config file with credentials
      const supabaseConfig = {
        access_token: accessToken,
        project_id: projectRef,
      };

      // Write config to a temporary file
      fs.writeFileSync(".supabase.json", JSON.stringify(supabaseConfig, null, 2));

      // Link to your Supabase project
      execSync(`bunx supabase link --project-ref ${projectRef}`, { stdio: "inherit" });

      // Push migrations to the linked project
      execSync("bunx supabase db push", { stdio: "inherit" });

      // Clean up
      fs.unlinkSync(".supabase.json");

      console.log("Migrations completed successfully!");
    } else {
      console.log("Skipping migrations in non-production environment");
    }
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
