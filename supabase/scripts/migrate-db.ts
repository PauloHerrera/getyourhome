// scripts/migrate-db-env.ts
import { execSync } from "child_process";

async function main() {
  try {
    console.log("Running Supabase migrations with environment variables...");

    const projectRef = process.env.SUPABASE_PROJECT_REF;
    const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

    if (!projectRef || !accessToken) {
      throw new Error("Missing required environment variables");
    }

    // Set environment variables for the Supabase CLI
    process.env.SUPABASE_ACCESS_TOKEN = accessToken;
    process.env.SUPABASE_PROJECT_ID = projectRef;

    // Run db push directly
    console.log("Pushing migrations...");
    execSync("bunx supabase db push", {
      stdio: "inherit",
      env: {
        ...process.env,
        SUPABASE_ACCESS_TOKEN: accessToken,
        SUPABASE_PROJECT_ID: projectRef,
      },
    });

    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
