import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="flex w-full h-full items-center justify-center">

    
    <Card className="w-full max-w-sm">
      <form>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}
