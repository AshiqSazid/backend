"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import { fetchLogin } from "@/api_request/auth/authApi";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      // First authenticate with your external server
      const response = await fetchLogin(value);

      if (response?.token) {
        // Then use Next-Auth to create a session
        const result = await signIn('credentials', {
          redirect: false,
          token: response.token,
          user: JSON.stringify(response.user),
          callbackUrl: '/dashboard'
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/dashboard' });
      console.log("🚀 ~ handleGoogleSignIn ~ result:", result)
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              value={value.email}
              type="email"
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              value={value.password}
              type="password"
              placeholder="Password"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handleSignin}
            className="w-full border-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </Button>
{/* 
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex gap-2"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </Button> */}
          
          <div className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}