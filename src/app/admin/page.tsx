
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function AdminDashboard() {
  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the Admin Dashboard</CardTitle>
            <CardDescription>
              This is the central hub for managing your service estimator application.
              From here, you can oversee and configure vehicle data, service schedules,
              and pricing information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Future features will be added here, such as:</p>
            <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                <li>Vehicle Management</li>
                <li>Service & Parts Data Editor</li>
                <li>Labor Charge Adjustments</li>
                <li>User Analytics</li>
            </ul>
          </CardContent>
        </Card>
    </div>
  )
}
