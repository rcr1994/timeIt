import { Router } from 'express';
import prisma from '../../../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
    const days = parseInt(req.query.days as string) || 7;

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days + 1); // inclusive of today

    const sessions = await prisma.session.findMany({
        where: { startTime: { gte: sinceDate } },
        orderBy: { startTime: 'asc' },
    });

    // Group by date
    const grouped: Record<string, any> = {};
    for (const session of sessions) {
        const dateKey = session.startTime.toISOString().split('T')[0];
        if (!grouped[dateKey]) grouped[dateKey] = { date: dateKey, totalSec: 0, sessions: [] };

        grouped[dateKey].totalSec += session.durationSec;
        grouped[dateKey].sessions.push({
            durationSec: session.durationSec,
            startTime: session.startTime,
            endTime: session.endTime,
            tag: session.tag,
            color: session.color,
        });
    }

    const result = Object.values(grouped).map((day: any) => ({
        date: day.date,
        totalHours: Math.round((day.totalSec / 3600) * 100) / 100,
        sessions: day.sessions,
    }));

    // print the result for debugging, print sessions for each day
    
    console.log('Summary result:', result);
    result.forEach((day: any) => {
        console.log(`Date: ${day.date}`);
        console.log(`Total Hours: ${day.totalHours}`);
        console.log('Sessions:', day.sessions);
    });

    res.json(result);
});

export default router;
