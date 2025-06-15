import { subDays, addSeconds } from 'date-fns'
import prisma from '../lib/prisma'


const tags = ['work', 'study', 'gym', 'break']
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0C987']

async function main() {
  for (let i = 0; i < 100; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    const randomStartHour = Math.floor(Math.random() * 12) + 6 // between 6 AM and 6 PM
    const randomStartMin = Math.floor(Math.random() * 60)
    const durationSec = Math.floor(Math.random() * (3 * 3600 - 900)) + 900 // between 15min to 3h

    const startTime = new Date()
    startTime.setHours(randomStartHour, randomStartMin, 0, 0)
    const adjustedStart = subDays(startTime, daysAgo)
    const endTime = addSeconds(adjustedStart, durationSec)

    const tagIndex = Math.floor(Math.random() * tags.length)

    await prisma.session.create({
      data: {
        startTime: adjustedStart,
        endTime: endTime,
        durationSec: durationSec,
        tag: tags[tagIndex],
        color: colors[tagIndex],
      }
    })
  }

  console.log('✅ Inserted 100 dummy sessions.')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
