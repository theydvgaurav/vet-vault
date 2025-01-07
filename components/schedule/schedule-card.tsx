import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Schedule } from "@/lib/types";

interface ScheduleCardProps {
    schedule: Schedule
}

const eventTypeMap: { [key: string]: string } = {
    deworming: "Deworming",
    rabiesInjection: "Rabies Injection",
    nineInOneInjection: "9 in One Injection"
};

export function ScheduleCard({ schedule }: ScheduleCardProps) {
    return (
        <Card className="border-blue-500 bg-blue-100 backdrop-blur-sm hover:bg-slate-900/50 transition-colors text-black">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{schedule.petName}</h3>
                </div>
            </CardHeader>
            <CardContent>
                <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Owner:</dt>
                        <dd>{schedule.ownerName}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Mobile Number:</dt>
                        <dd>{schedule.mobileNumber}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Event:</dt>
                        <dd>{eventTypeMap[schedule.eventType]}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}
