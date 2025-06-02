"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { fetchRegister } from "@/api_request/auth/authApi";

export default function Register() {
    const router = useRouter();
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        // Basic validation
        if (!value.name || !value.email || !value.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        await fetchRegister(value);
        setTimeout(() => {
            router.push('/login');
        }, 1500);
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-[400px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details to register
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            onChange={(e) => setValue({ ...value, name: e.target.value })}
                            value={value.name}
                            type="text"
                            placeholder="Full Name"
                            className="w-full"
                        />
                    </div>
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
                        onClick={handleRegister}
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </Button>

                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={() => router.push('/login')}
                        variant="outline"
                        className="w-full"
                    >
                        Sign in instead
                    </Button>
                </CardFooter>
            </Card>
            <ToastContainer />
        </div>
    );
}