import { SessionProgress } from "@/components/session-progress"

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#424242]">Your Progress</h1>
      <SessionProgress />
    </div>
  )
}

