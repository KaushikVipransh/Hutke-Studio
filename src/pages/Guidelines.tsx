import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const Guidelines = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (isChecked) {
      navigate("/register");
    }
  };

  const collegeRules = [
    "The team size must be between 5 and 25 members.",
    "The time limit for prelims is 3 to 5 minutes. Exceeding the time frame will lead to negative marking.",
    "Any kind of editing or sound effects will not be accepted.",
    "The decision of the judges will be final and binding.",
  ];

  const crewRules = [
    "The time limit for prelims is 2 to 4 minutes. Exceeding the time frame will lead to negative marking.",
    "Any kind of editing or sound effects will not be accepted.",
    "The minimum team size limit is 3 and maximum team size limit is 30 members.",
    "The decision of the judges will be final and binding.",
  ];

  const soloRules = [
    "Time Limit: 1 to 2 minutes. Exceeding the time frame will lead to negative marking.",
    "Video Rules: No editing or sound effects allowed.",
    "The decision of the judges will be final and binding.",
  ];

  const folkRules = [
    "Video Prelims: Free of Cost.",
    "Stage Limit: Minimum 5 & Maximum 15 members.",
    "Time Limit: 2 to 5 minutes (Negative marking for exceeding).",
    "Team Size Limit: Minimum 3 & Maximum 25 members.",
    "Video Rules: No editing or sound effects.",
    "Finality: Judge's decision is final and binding.",
  ];

  return (
    <main className="container mx-auto px-4 pt-24 pb-12 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl tracking-wider text-foreground text-glow sm:text-5xl md:text-6xl">
            Competition Guidelines
          </h1>
        </div>

        <Alert className="mb-10 border-primary text-primary box-glow">
          <Megaphone className="h-4 w-4" />
          <AlertTitle className="text-lg font-bold">Important Notice</AlertTitle>
          <AlertDescription className="text-base">
            Video Prelims Are Free Of Cost
          </AlertDescription>
        </Alert>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          <Card className="bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wider">
                Inter College Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
                {collegeRules.map((rule, index) => (
                  <li key={`college-rule-${index}`}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wider">
                Open Crew Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
                {crewRules.map((rule, index) => (
                  <li key={`crew-rule-${index}`}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wider">
                Solo Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
                {soloRules.map((rule, index) => (
                  <li key={`solo-rule-${index}`}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="font-display text-2xl tracking-wider">
                Inter State Folk Dance Competition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
                {folkRules.map((rule, index) => (
                  <li key={`folk-rule-${index}`}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked as boolean)}
              className="h-5 w-5"
            />
            <label
              htmlFor="terms"
              className="cursor-pointer text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and understand all guidelines.
            </label>
          </div>

          <Button
            onClick={handleProceed}
            disabled={!isChecked}
            size="lg"
            className={cn(
              "w-full max-w-md text-lg text-primary-foreground transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
              isChecked ? "gradient-neon" : "bg-muted hover:bg-muted",
            )}
          >
            Proceed to Register Your Team
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Guidelines;