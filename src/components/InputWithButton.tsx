import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input placeholder="Tell me about yourself..." />
      <Button type="submit" variant="outline">
        
      </Button>
    </div>
  )
}
