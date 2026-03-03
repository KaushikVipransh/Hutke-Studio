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
      let errorMessage = "An unexpected error occurred";
      
      if (error.response) {
        // Server responded with a status code (400, 401, 500)
        errorMessage = error.response.data?.message || "Invalid credentials";
      } else if (error.request) {
        // Request was made but no response received (Server is down)
        errorMessage = "Cannot connect to server. Is the backend running on port 5000?";
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