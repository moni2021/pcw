
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { vehicles } from "@/lib/data"


export default function AdminDashboard() {
  return (
    <div className="space-y-6">
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
                <li>Service & Parts Data Editor</li>
                <li>Labor Charge Adjustments</li>
                <li>User Analytics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Management</CardTitle>
            <CardDescription>
              A list of all vehicles currently configured in the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Fuel Types</TableHead>
                  <TableHead>Production Years</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.model}>
                    <TableCell className="font-medium">{vehicle.model}</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.brand === 'Nexa' ? 'default' : 'secondary'}>
                        {vehicle.brand}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vehicle.fuelTypes.map(fuel => <Badge key={fuel} variant="outline">{fuel}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.productionYears.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  )
}
