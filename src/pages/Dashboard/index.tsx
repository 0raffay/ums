import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { userSelector } from "@/api/User";
import { useSelector } from "react-redux";

export default function Dashboard() {

  const {data: usersData} = useSelector(userSelector());

  return (
    <Card size={"large"}>
      <CardContent>
        <div className="grid grid-cols-4 items-center gap-10">
          <Card size={'large'}>
            <CardContent className="text-center">
              <CardTitle size={"sm"}>Card Content</CardTitle>
              <p>{usersData?.users?.length}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
