import { paths } from "@/config/paths";
import { appConfig } from "@/config/env";
import { createServiceClient } from "@/lib/supabase/service";
import { SignUpFormData, signUpSchema } from "@/schemas/sign-up-schema";
import { SupabaseClient } from "@supabase/supabase-js";

const sampleUsers = [
  {
    name: "Lead One",
    lastName: "Sample",
    email: "lead1@example.com",
    password: "101010",
    phone: "11999999991",
    role: "lead",
    termsAccepted: true,
    transactionType: "sale",
    city: "Sao Paulo",
  },
  {
    name: "Lead Two",
    lastName: "Sample",
    email: "lead2@example.com",
    password: "101010",
    phone: "11999999992",
    role: "lead",
    termsAccepted: true,
    transactionType: "rent",
    city: "Rio de Janeiro",
  },
  {
    name: "Broker One",
    lastName: "Sample",
    email: "broker1@example.com",
    password: "101010",
    phone: "11999999993",
    role: "broker",
    termsAccepted: true,
    licenseNumber: "BRK001",
  },
  {
    name: "Broker Two",
    lastName: "Sample",
    email: "broker2@example.com",
    password: "101010",
    phone: "11999999994",
    role: "broker",
    termsAccepted: true,
    licenseNumber: "BRK002",
  },
  {
    name: "Admin",
    lastName: "Sample",
    email: "admin@example.com",
    password: "101010",
    phone: "11999999995",
    role: "admin",
    termsAccepted: true,
  },
];

export async function POST(request: Request) {
  const supabase = createServiceClient();

  const body = await request.json();

  // If valid user, add it
  if (body) {
    const parseResult = signUpSchema.safeParse(body);
    if (parseResult.success) {
      const { error } = await supabase.from("users").insert([body]);
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
      }
      return new Response(JSON.stringify({ user: body }), { status: 201 });
    }
  }

  sampleUsers.map(async (user) => {
    const result = await insertUsers(supabase, user as SignUpFormData);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }
  });

  return new Response(JSON.stringify({ users: sampleUsers.map((user) => user.email) }), {
    status: 201,
  });
}

// Helper to insert users
async function insertUsers(supabase: SupabaseClient, user: SignUpFormData) {
  const { data: userData, error } = await supabase.auth.signUp({
    email: user.email,
    phone: user.phone,
    password: user.password,
    options: {
      emailRedirectTo: paths.auth.callback.getHref(appConfig.url),
      data: {
        name: user.name,
        last_name: user.lastName,
        role: user.role || "lead",
        terms_accepted: user.termsAccepted,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // If the user is a broker, create a broker record
  if (user.role === "broker") {
    await supabase.from("brokers").insert({
      id: userData.user?.id,
      license_number: user.licenseNumber || "",
    });
  }

  // If the user is a lead, create a basic property ad
  if (user.role === "lead") {
    await supabase.from("property_ads").insert({
      lead_id: userData.user?.id,
      transaction_type: user.transactionType,
      city: user.city,
      status: "pending",
    });
  }

  return { success: true };
}
