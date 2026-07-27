import Papa from "papaparse"
import { z } from "zod"

export const csvRowSchema = z.object({
  content: z.string().min(1),
  channel: z.string().min(1),
  customerLabel: z.string().optional(),
  createdAt: z.string().optional()
})

export type CsvRow = z.infer<typeof csvRowSchema>

export async function parseCsvString(csvString: string): Promise<{ valid: CsvRow[], invalid: number }> {
  return new Promise((resolve, reject) => {
    
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const valid: CsvRow[] = []
        let invalid = 0

        for (const row of results.data) {
          const parsed = csvRowSchema.safeParse(row)
          if (parsed.success) {
            valid.push(parsed.data)
          } else {
            invalid++
          }
        }
        
        resolve({ valid, invalid })
      },
      error: (error: unknown) => {
        reject(error)
      }
    })
  })
}
