"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/pet-listing");
    }
  }, [isAuthenticated, router]);

  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Invalid mobile number');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await login(mobile, password);
      await router.push('/pet-listing');
    } catch (err) {
      setError("Invalid Login Credentials");
    }
  };

  return (
    <main className="min-h-screen  bg-creme flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex  bg-white items-center justify-center p-8 ">
        <Card className="bg-[#A67C52] p-8 rounded-lg shadow-lg w-full max-w-sm">
          <CardHeader className="space-y-3 text-center">
            <div className="space-y-2">
              <h1 className="text-white text-2xl font-bold mb-6 text-center">Vet Vault</h1>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="block text-white mb-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full p-3 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                />
              </div>
              <div className="block text-white mb-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 pr-10 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-black text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-[#4CAF50] hover:bg-[#45A049] text-white font-bold py-3 rounded-md mt-4">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}