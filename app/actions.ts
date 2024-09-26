"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminService } from "./services/admin.service";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const mobile = formData.get("mobile")?.toString();
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();

  console.log(email, password, mobile, firstName, lastName);
  
  if (!email || !password || !mobile || !firstName || !lastName) {
    return { error: "Required firld missing" };
  }
  let redirectTo = ''
  try {
    const adminData = {
      email,
      password,
      mobile,
      firstName,
      lastName
    }
    console.log(adminData);
    const response = await AdminService.createAdmin(adminData);
    if (response) {
      console.log("response", response);
      redirectTo = '/sign-in'
    }
  } catch (error) {
    console.log(error);
    redirectTo = '/sign-up'
    
  } finally {
    return encodedRedirect("success", redirectTo, "");
  }

};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  let redirectTo = '/'
  try {
    const response = await AdminService.login({email, password});
    if (response) {
      console.log("response", response);
      redirectTo = '/dashboard'
      
    }
  } catch (error) {
    console.log(error);
    redirectTo = '/sign-in'
  } finally {
    return encodedRedirect("success", redirectTo, "Sign in successful");
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
