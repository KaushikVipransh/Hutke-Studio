import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

// Define division constants to ensure consistency with backend
const DIVISIONS = {
  COLLEGE: "Inter College Group Dance",
  CREW: "Open Crew Group Dance",
  SOLO: "Inter State Solo Dance Competition",
  FOLK: "Inter State Folk Dance Competition",
} as const;

// Define division options
const DIVISION_OPTIONS = [
  { label: DIVISIONS.COLLEGE, value: DIVISIONS.COLLEGE },
  { label: DIVISIONS.CREW, value: DIVISIONS.CREW },
  { label: DIVISIONS.SOLO, value: DIVISIONS.SOLO },
  { label: DIVISIONS.FOLK, value: DIVISIONS.FOLK },
] as const;

// Zod schema for validation, including conditional checks
const formSchema = z
  .object({
    division: z.enum([DIVISIONS.COLLEGE, DIVISIONS.CREW, DIVISIONS.SOLO, DIVISIONS.FOLK]),
    collegeName: z.string().optional(),
    city: z.string().optional(),
    teamName: z.string().min(2, "Name must be at least 2 characters."),
    memberCount: z.coerce.number().optional(),
    pocName: z.string().optional(),
    email: z.string().email("Please enter a valid email address."),
    contactNo: z.string().min(10, "Please enter a valid contact number."),
    videoUrl: z.string().url("Please enter a valid URL for your video."),
  })
  .superRefine((data, ctx) => {
    if (data.division === DIVISIONS.COLLEGE) {
      if (!data.collegeName || data.collegeName.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "College Name is required.", path: ["collegeName"] });
      }
      if (data.memberCount === undefined || data.memberCount < 5 || data.memberCount > 25) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Team must have 5-25 members.", path: ["memberCount"] });
      }
      if (!data.pocName || data.pocName.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "POC name is required.", path: ["pocName"] });
      }
    } else if (data.division === DIVISIONS.CREW) {
      if (data.memberCount === undefined || data.memberCount < 3 || data.memberCount > 30) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Team must have 3-30 members.", path: ["memberCount"] });
      }
      if (!data.pocName || data.pocName.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "POC name is required.", path: ["pocName"] });
      }
    } else if (data.division === DIVISIONS.SOLO) {
      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required.", path: ["city"] });
      }
    } else if (data.division === DIVISIONS.FOLK) {
      if (data.memberCount === undefined || data.memberCount < 3 || data.memberCount > 25) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Team must have 3-25 members.", path: ["memberCount"] });
      }
      if (!data.pocName || data.pocName.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "POC name is required.", path: ["pocName"] });
      }
    }
  });

const RegistrationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      division: DIVISIONS.COLLEGE,
      teamName: "",
      collegeName: "",
      pocName: "",
      email: "",
      contactNo: "",
      videoUrl: "",
    },
  });

  // Watch the 'division' field to conditionally render inputs
  const selectedDivision = form.watch("division");
  const { formState: { isSubmitting } } = form;
  const isSolo = selectedDivision === DIVISIONS.SOLO;
  const isCollege = selectedDivision === DIVISIONS.COLLEGE;
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    // Prepare payload based on division
    const payload = {
      division: values.division,
      teamName: values.teamName,
      email: values.email,
      contactNo: values.contactNo,
      videoUrl: values.videoUrl,
      pocName: isSolo ? values.teamName : values.pocName,
      memberCount: isSolo ? 1 : values.memberCount,
      ...(isSolo && { city: values.city }),
      ...(isCollege && { collegeName: values.collegeName }),
    };

    toast({
      title: "Submitting...",
      description: "Please wait while we process your registration.",
    });

    try {
      await api.post("/register", payload);

      toast({
        title: "Registration Successful",
        description: "We will review your submission and get back to you soon.",
      });
      form.reset();
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Registration failed. Server responded with:", error.response.data);
        
        // Check if the response is an HTML error page from Vercel (common for 500/404 errors)
        if (typeof error.response.data === 'string' && error.response.data.toLowerCase().includes('<!doctype html>')) {
          errorMessage = "Server Error. Please check the Vercel Function logs.";
        } else {
          errorMessage = error.response.data?.message || "Something went wrong on the server.";
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "Cannot connect to the server. Please check your connection.";
      }

      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    }
  }

  return (
    <Card className="bg-background/80 backdrop-blur-md border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-display tracking-wider">Audition Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Division Selection */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Your Division</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-2"
                    >
                      {DIVISION_OPTIONS.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">{option.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isSolo ? "Participant Name" : "Team Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder={isSolo ? "Enter your full name" : "Your awesome team name"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isCollege && (
                <FormField
                  control={form.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. St. Xavier's College" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isSolo && (
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!isSolo && (
                <>
                  <FormField
                    control={form.control}
                    name="memberCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No of Members</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pocName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>POC Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Point of Contact Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email ID</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="poc@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact No</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+91 98765 43210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Prelims Video Submission */}
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Submission Link</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Please upload your performance to Google Drive (set to 'Anyone with link can view') or YouTube (Unlisted) and paste the URL here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;