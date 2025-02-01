import { Apple, PlayIcon as PlayStore } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppDownload() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ladda ner vår app</h2>
        <p className="text-xl text-gray-600 mb-12">Få tillgång till Lägenhetbyte24 var du än är</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            <Apple className="mr-2 h-6 w-6" />
            Ladda ner för iOS
          </Button>
          <Button size="lg" className="bg-green-600 text-white hover:bg-green-700">
            <PlayStore className="mr-2 h-6 w-6" />
            Ladda ner för Android
          </Button>
        </div>
      </div>
    </section>
  )
}

