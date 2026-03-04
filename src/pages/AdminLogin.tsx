import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Login Successful",
          description: "Welcome back, Admin.",
        });
        navigate("/admin");
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        console.error("Login failed. Server responded with:", error.response.data);

        // Vercel might return an HTML page for server errors.
        if (typeof error.response.data === 'string' && error.response.data.toLowerCase().includes('<html>')) {
          errorMessage = "Server error. Please check the backend logs on Vercel.";
        } else {
          // Use the error message from the backend if available.
          errorMessage = error.response.data?.message || "Invalid username or password.";
        }
      } else if (error.request) {
        // The request was made but no response was received.
        errorMessage = "Cannot connect to server. Please check your internet connection or try again later.";
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-center font-display text-2xl tracking-wider">
            Admin Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default AdminLogin;