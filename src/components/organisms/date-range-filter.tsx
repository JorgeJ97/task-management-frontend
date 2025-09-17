import * as React from "react"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/atoms/button"
import { Calendar } from "@/components/atoms/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover"
import { cn } from "@/lib/utils"
import { parseDateSafe } from "@/utils/date-utils" 

interface DateRangeFilterProps {
  title: string
  fromDate?: Date | null
  toDate?: Date | null
  onFromDateChange: (date: Date | undefined) => void
  onToDateChange: (date: Date | undefined) => void
  onClear: () => void
}

export function DateRangeFilter({ 
  title, 
  fromDate, 
  toDate, 
  onFromDateChange, 
  onToDateChange, 
  onClear 
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Parsear fechas seguras
  const parsedFromDate = fromDate ? parseDateSafe(fromDate) : undefined
  const parsedToDate = toDate ? parseDateSafe(toDate) : undefined

  // Crear objeto de rango de fechas compatible con react-day-picker
  const dateRange = parsedFromDate || parsedToDate 
    ? { 
        from: parsedFromDate || undefined, 
        to: parsedToDate || undefined 
      }
    : undefined

  const handleDateRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range) {
      onFromDateChange(range.from || undefined)
      onToDateChange(range.to || undefined)
    } else {
      onFromDateChange(undefined)
      onToDateChange(undefined)
    }
  }

  const handleClear = () => {
    onClear()
    setIsOpen(false)
  }

  const handleApply = () => {
    setIsOpen(false)
  }

  const hasSelection = parsedFromDate || parsedToDate

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-dashed whitespace-nowrap relative",
            hasSelection && "border-solid bg-accent"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {hasSelection ? (
            <span className="text-xs">
              {parsedFromDate ? format(parsedFromDate, "dd/MM/yy", { locale: es }) : "Desde"} - 
              {parsedToDate ? format(parsedToDate, "dd/MM/yy", { locale: es }) : "Hasta"}
            </span>
          ) : (
            title
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from || new Date()}
              selected={dateRange}
              onSelect={handleDateRangeSelect}
              numberOfMonths={1}
              className="rounded-lg border shadow-sm"
            />
          </div>

          <div className="flex space-x-2 pt-2">
            {hasSelection && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleClear}
              >
                <X className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            )}
            <Button
              size="sm"
              className={hasSelection ? "flex-1" : "w-full"}
              onClick={handleApply}
            >
              {hasSelection ? "Aplicar" : "Cerrar"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}