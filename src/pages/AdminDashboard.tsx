import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Copy, LogOut, Download, Check, X, PauseCircle, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 1. Data Types and Enums
enum SubmissionStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
  StandBy = "STAND_BY",
}

enum Division {
  College = "Inter College Group Dance",
  Crew = "Open Crew Group Dance",
}

interface Submission {
  id: string;
  teamName: string;
  division: Division;
  pocName: string;
  memberCount: number;
  videoUrl: string;
  status: SubmissionStatus;
  createdAt: string;
  email: string;
  contactNo: string;
  collegeName?: string;
}

// 3. Helper for status badges styling
const statusBadgeConfig = {
  [SubmissionStatus.Pending]: {
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
    text: "Pending",
  },
  [SubmissionStatus.Approved]: {
    className: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
    text: "Approved",
  },
  [SubmissionStatus.Rejected]: {
    className: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
    text: "Rejected",
  },
  [SubmissionStatus.StandBy]: {
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
    text: "Stand By",
  },
};

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch submissions on load
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get("/admin/submissions");
        // Map MongoDB _id to frontend id
        const formattedData = response.data.map((item: any) => ({
          ...item,
          id: item._id,
        }));
        setSubmissions(formattedData);
      } catch (error: any) {
        console.error("Failed to fetch submissions:", error);
        toast({
          variant: "destructive",
          title: "Failed to load data",
          description: error.response?.data?.message || "Could not connect to the server.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, [toast]);

  // 4. Function for API call to update status
  const handleStatusUpdate = async (id: string, newStatus: SubmissionStatus) => {
    const originalSubmissions = [...submissions];

    // Optimistic UI Update
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );

    try {
      await api.patch(`/admin/submissions/${id}`, { status: newStatus });
      toast({
        title: "Status Updated",
        description: `Team status changed to ${newStatus}.`,
      });
    } catch (error: any) {
      console.error("Failed to update status:", error);
      // Revert the state on API call failure
      setSubmissions(originalSubmissions);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          error.response?.data?.message ||
          "The status could not be updated. Please try again.",
      });
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((sub) => statusFilter === "ALL" || sub.status === statusFilter)
      .filter((sub) => {
        const query = searchQuery.toLowerCase();
        return (
          (sub.teamName?.toLowerCase() || "").includes(query) ||
          (sub.pocName?.toLowerCase() || "").includes(query) ||
          (sub.email?.toLowerCase() || "").includes(query) ||
          (sub.contactNo?.toLowerCase() || "").includes(query)
        );
      });
  }, [submissions, statusFilter, searchQuery]);

  const filterOptions: (SubmissionStatus | "ALL")[] = [
    "ALL",
    SubmissionStatus.Pending,
    SubmissionStatus.Approved,
    SubmissionStatus.StandBy,
    SubmissionStatus.Rejected,
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${label} copied to clipboard`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin-login");
  };

  const handleExportCSV = () => {
    const approvedTeams = submissions.filter(
      (sub) => sub.status === SubmissionStatus.Approved
    );

    if (approvedTeams.length === 0) {
      toast({
        variant: "destructive",
        title: "No Approved Teams",
        description: "There are no teams with 'Approved' status to export.",
      });
      return;
    }

    const headers = [
      "Team/College Name",
      "Division",
      "POC Name",
      "Email",
      "Contact Number",
      "Member Count",
      "Video URL",
      "Submission Date",
    ];

    const csvRows = [
      headers.join(","),
      ...approvedTeams.map((sub) => {
        const name = sub.collegeName ? `${sub.teamName} (${sub.collegeName})` : sub.teamName;
        return [
          `"${name.replace(/"/g, '""')}"`,
          `"${sub.division}"`,
          `"${sub.pocName.replace(/"/g, '""')}"`,
          `"${sub.email}"`,
          `"${sub.contactNo}"`,
          sub.memberCount,
          `"${sub.videoUrl}"`,
          `"${new Date(sub.createdAt).toLocaleDateString()}"`,
        ].join(",");
      }),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Hutke_Approved_Teams_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 pt-24 pb-12 sm:pt-32">
        <div className="mb-8 relative">
          <Button
            variant="outline"
            className="absolute right-0 top-0 hidden sm:flex"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <h1 className="font-display text-4xl tracking-wider text-center text-glow sm:text-5xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground text-center">
            Review and manage team auditions.
          </p>
          <div className="mt-4 flex justify-center sm:hidden">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="bg-background/60 backdrop-blur-md border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option}
                    variant={statusFilter === option ? "default" : "outline"}
                    onClick={() => setStatusFilter(option)}
                    className="capitalize whitespace-nowrap"
                  >
                    {option.toLowerCase()}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by team or POC..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Export Button */}
                <Button
                  onClick={handleExportCSV}
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px] px-2">Team Name</TableHead>
                    <TableHead className="px-2">Division</TableHead>
                    <TableHead className="px-2">POC</TableHead>
                    <TableHead className="px-2">Email</TableHead>
                    <TableHead className="px-2">Contact</TableHead>
                    <TableHead className="text-center px-2">Members</TableHead>
                    <TableHead className="text-center px-2">Status</TableHead>
                    <TableHead className="px-2">Submitted</TableHead>
                    <TableHead className="text-right px-2">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                        Loading submissions...
                      </TableCell>
                    </TableRow>
                  ) : filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium px-2">{sub.teamName}</TableCell>
                        <TableCell className="text-muted-foreground px-2 max-w-[140px] whitespace-normal text-xs">{sub.division}</TableCell>
                        <TableCell className="text-muted-foreground px-2">{sub.pocName}</TableCell>
                        <TableCell className="px-2">
                          <div className="flex items-center gap-1">
                            <span className="truncate max-w-[120px]" title={sub.email}>
                              {sub.email}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(sub.email, "Email")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="px-2">
                          <div className="flex items-center gap-1">
                            <span className="whitespace-nowrap">{sub.contactNo}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(sub.contactNo, "Contact")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground px-2">{sub.memberCount}</TableCell>
                        <TableCell className="text-center px-2">
                          <Badge
                            variant="outline"
                            className={statusBadgeConfig[sub.status]?.className}
                          >
                            {statusBadgeConfig[sub.status]?.text || sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground px-2">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right px-2">
                          <div className="flex items-center justify-end gap-1">
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8" title="Watch Audition">
                              <a href={sub.videoUrl} target="_blank" rel="noopener noreferrer">
                                <Play className="h-4 w-4" />
                              </a>
                            </Button>
                            {sub.status === SubmissionStatus.Pending && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                                  onClick={() => handleStatusUpdate(sub.id, SubmissionStatus.Approved)}
                                  title="Approve"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                                  onClick={() => handleStatusUpdate(sub.id, SubmissionStatus.StandBy)}
                                  title="Stand By"
                                >
                                  <PauseCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  onClick={() => handleStatusUpdate(sub.id, SubmissionStatus.Rejected)}
                                  title="Reject"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {sub.status === SubmissionStatus.StandBy && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                                  onClick={() => handleStatusUpdate(sub.id, SubmissionStatus.Approved)}
                                  title="Approve"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  onClick={() => handleStatusUpdate(sub.id, SubmissionStatus.Rejected)}
                                  title="Reject"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                        No submissions match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminDashboard;