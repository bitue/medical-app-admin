import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PatientCardProps {
  name: string
  email: string
  medicationCount: number
  operationCount: number
}

export default function PatientCard({
  name = "John Doe",
  email = "john.doe@example.com",
  medicationCount = 3,
  operationCount = 2,
}: PatientCardProps) {
  // Get initials for the avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarFallback className="bg-primary/5 text-primary">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold leading-none tracking-tight">{name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col items-center rounded-lg bg-primary/5 p-3">
            <span className="text-xl font-bold text-primary">{medicationCount}</span>
            <span className="text-xs text-muted-foreground">Medications</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-primary/5 p-3">
            <span className="text-xl font-bold text-primary">{operationCount}</span>
            <span className="text-xs text-muted-foreground">Operations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

