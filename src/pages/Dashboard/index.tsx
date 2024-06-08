import { Card, CardContent, CardTitle } from "@/components/ui/Card";

export default function Dashboard() {
  return (
    <Card size={"large"}>
      <CardContent>
        <div className="grid grid-cols-4 items-center gap-10">
          <Card>
            <CardContent>
              <CardTitle size={"lg"}>Card Content</CardTitle>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
